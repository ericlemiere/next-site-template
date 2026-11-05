"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RichText } from "@/modules/RichText";
import { textAlignHelper } from "@/utils/helpers/style-helpers";
import type { PopUp as PopUpType } from "../../sanity.types";

type PopUpProps = {
  data?: PopUpType;
};

export const PopUp = ({ data }: PopUpProps) => {
  const { body, delayTime, sectionStyles } = data || {};
  const textAlignment = sectionStyles?.textAlignment;
  const textAlignString = textAlignHelper(textAlignment || "");

  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const delay = delayTime || 0;
          setTimeout(() => {
            setIsOpen(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, delayTime, body]);

  // Early return must come after all hooks so live edits that empty and
  // refill the body don't change the hook order between renders
  if (!body) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Invisible trigger element */}
      <div ref={triggerRef} className="h-px w-full" />

      {/* Portal for the popup */}
      {isMounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          >
            <div
              className="relative max-w-clamp-600 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl p-8 m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close popup"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className={`${textAlignString}`}>
                <RichText
                  data={body}
                  textAlignment={textAlignment}
                  color=""
                  tag="div"
                  id=""
                  className=""
                  imageSizes={null}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
