"use client";
import { useState, useEffect, useRef } from "react";
import { Text } from "@/modules/Text";
import { RichText } from "@/modules/RichText";

export const CookiePopUp = ({ data }) => {
  const body = data?.body;
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const firstButtonRef = useRef(null);
  const dialogRef = useRef(null);

  // =======================================================================
  // FOR TESTING PURPOSES ONLY
  // =======================================================================
  // If you want to see the cookie pop up again, uncomment the line below
  // to remove the cookie from local storage, then refresh the page.

  // if (typeof window !== 'undefined') localStorage.removeItem('cookieConsent')

  // =======================================================================
  // COOKIE CONSENT STATE MANAGEMENT
  // =======================================================================
  const [cookieConsent, setCookieConsent] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cookie consent from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cookieConsent");

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCookieConsent(parsed);
          setShouldRender(false); // Don't render if consent already given
        } catch (e) {
          console.error("Failed to parse cookie consent:", e);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save consent preferences to localStorage
  useEffect(() => {
    if (cookieConsent && isInitialized) {
      localStorage.setItem("cookieConsent", JSON.stringify(cookieConsent));
      applyCookieConsent(cookieConsent);
    }
  }, [cookieConsent, isInitialized]);

  // =======================================================================
  // COOKIE MANAGEMENT FUNCTIONS
  // =======================================================================
  const applyCookieConsent = (consent) => {
    if (typeof window === "undefined") return;

    if (consent.analytics) {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
  };

  const enableGoogleAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const disableGoogleAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      timestamp: Date.now(),
    };
    setCookieConsent(consentData);
    setPopUpIsOpen(false);
    // Remove from DOM after animation completes (500ms matches transition duration)
    setTimeout(() => setShouldRender(false), 500);
  };

  // Handle accepting only essential cookies
  const handleEssentialOnly = () => {
    const consentData = {
      essential: true,
      analytics: false,
      timestamp: Date.now(),
    };
    setCookieConsent(consentData);
    setPopUpIsOpen(false);
    // Remove from DOM after animation completes (500ms matches transition duration)
    setTimeout(() => setShouldRender(false), 500);
  };

  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && popUpIsOpen) {
        handleEssentialOnly();
      }
    };

    const handleTab = (event) => {
      if (!popUpIsOpen || event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    if (popUpIsOpen) {
      firstButtonRef.current?.focus();
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);

      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.textContent =
        "Cookie consent banner appeared. Please make your selection.";
      document.body.appendChild(announcement);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      };
    }
  }, [popUpIsOpen]);

  // =======================================================================
  // WAIT UNTIL PAGE LOADS FOR COOKIE POP UP TO APPEAR
  // =======================================================================
  useEffect(() => {
    if (!isInitialized) return;

    const onPageLoad = () => {
      if (!cookieConsent) {
        setPopUpIsOpen(true);
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [cookieConsent, isInitialized]);

  // Early return if shouldn't render
  if (!shouldRender) return null;

  const bottomString = popUpIsOpen ? "bottom-[30px]" : "-bottom-[120%]";

  // =======================================================================
  // RETURN COMPONENT
  // =======================================================================
  return (
    <div
      ref={dialogRef}
      className={`fixed w-4/5 md:w-2/5 max-w-5xl rounded-card z-50 bg-white right-[10%] md:right-5 p-clamp-50 transition-all duration-500 shadow-2xl ${bottomString}`}
      role={popUpIsOpen ? "dialog" : undefined}
      aria-modal={popUpIsOpen ? "true" : undefined}
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
      id="cookie_pop_up"
    >
      <div
        id="cookie-container"
        className="h-full w-full flex flex-col relative gap-clamp-40"
      >
        <div className="flex flex-col">
          <RichText data={body} id="cookie-description" tag="p" />
        </div>
        {popUpIsOpen && (
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-clamp-20">
            <button
              ref={firstButtonRef}
              onClick={handleEssentialOnly}
              aria-label="Accept only essential cookies"
              className="w-full md:w-1/2 rounded-button bg-transparent hover:bg-primary transition-all duration-150 cursor-pointer p-clamp-12 border-primary border-2"
            >
              <Text>Only Essential</Text>
            </button>

            <button
              onClick={handleAcceptAll}
              aria-label="Accept all cookies"
              className="w-full md:w-1/2 rounded-button bg-transparent hover:bg-primary transition-all duration-150 cursor-pointer p-clamp-12 border-primary border-2"
            >
              <Text>Accept All</Text>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
