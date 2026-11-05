"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { SearchResult } from "../../sanity/lib/search";
import { Text } from "@/modules/Text";

interface SearchResponse {
  results: SearchResult[];
  query: string;
  count: number;
}

export const Search = ({ isMobile }: { isMobile: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Track if component is mounted (for portal)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      // Small delay to allow animation to start
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isModalOpen]);

  // Handle modal open with animation
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Trigger animation after render
    requestAnimationFrame(() => {
      setIsAnimating(true);
    });
  };

  // Handle modal close with animation
  const handleCloseModal = () => {
    setIsAnimating(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsModalOpen(false);
      setQuery("");
      setResults([]);
    }, 300); // Match transition duration
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        const data: SearchResponse = await response.json();

        if (response.ok) {
          setResults(data.results);
        } else {
          console.error("Search error:", data);
          setResults([]);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Focus results container when results are loaded
  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [results]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current
          .closest('[role="dialog"]')
          ?.contains(e.target as Node)
      ) {
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog && !dialog.contains(e.target as Node)) {
          handleCloseModal();
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Stop scroll propagation on the results container
  useEffect(() => {
    const scrollContainer = resultsRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: true });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, [results]); // Re-attach when results change

  const handleResultClick = () => {
    handleCloseModal();
  };

  const getTypeLabel = (type: string, slug?: string): string => {
    switch (type) {
      case "homePage":
        return "Home Page";
      case "page":
        return slug ? `Page url: ${slug}` : "Page";
      case "blogPost":
        return slug ? `Blog url: ${slug}` : "Blog Post";
      case "event":
        return slug ? `Event url: ${slug}` : "Event";
      case "teamMember":
        return "Team Member";
      default:
        return type;
    }
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={handleOpenModal}
        className="p-2 group hover:bg-primary rounded-lg transition duration-300 cursor-pointer"
        aria-label="Open search"
      >
        <svg
          className={`transition-colors
            ${isMobile ? "text-primary w-clamp-30 h-clamp-30" : "w-clamp-24 h-clamp-24 transition duration-300 group-hover:text-white"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Modal Portal */}
      {isMounted &&
        isModalOpen &&
        createPortal(
          <div
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-start justify-center pt-clamp-200 px-4 transition-opacity duration-300 overscroll-contain ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Modal Content */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Search modal"
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[70vh] flex flex-col transition-all duration-300 mb-8 ${
                isAnimating
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 -translate-y-8"
              }`}
            >
              {/* Search Input */}
              <div className="p-4 border-b border-gray-200 shrink-0">
                <form
                  role="search"
                  onSubmit={(e) => e.preventDefault()}
                  className="relative"
                >
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search site"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </form>
              </div>

              {/* Search Results */}
              <div
                ref={resultsRef}
                tabIndex={0}
                className="focus:outline-none"
                style={{
                  height: "calc(70vh - 140px)",
                  overflow: "auto",
                }}
                role="region"
                aria-live="polite"
                aria-atomic="false"
              >
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">
                    Searching...
                  </div>
                ) : query.length < 2 ? (
                  <div className="p-8 text-center text-gray-500">
                    Type at least 2 characters to search
                  </div>
                ) : results.length > 0 ? (
                  <ul className="py-2 list-none!">
                    {results.map((result, i) => (
                      <li key={result._id + i}>
                        <Link
                          href={result.url}
                          onClick={handleResultClick}
                          className={`block px-6 py-4 hover:bg-lightgray transition-colors 
                              border-b border-red-500 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <Text size="heading4" className="mb-1" tag="p">
                                {result.title}
                              </Text>

                              {result.snippet && (
                                <Text
                                  size="body1"
                                  className="text-sm text-gray-600 line-clamp-2"
                                  tag="p"
                                >
                                  {result.snippet}
                                </Text>
                              )}

                              <Text size="body1" className="mt-2" tag="p">
                                {result.contextTitle}
                              </Text>

                              <span className="inline-flex items-center text-xs font-medium text-blue-700 shrink-0">
                                {getTypeLabel(result._type, result.slug)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>

              {/* Close button hint */}
              <div className="p-3 border-t border-gray-200 text-center text-sm text-gray-500 shrink-0">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded">ESC</kbd>{" "}
                to close
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
