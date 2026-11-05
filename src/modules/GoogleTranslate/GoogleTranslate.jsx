"use client";
import { useEffect } from "react";

// ==============================================================
//
//                  *** IMPORTANT NOTE ***
// This will cause an error in development, but not in production
//
// ==============================================================

export const GoogleTranslate = ({ languages }) => {
  const languagesString = languages?.join(",") || "";
  useEffect(() => {
    // Only run if not already loaded
    if (window.google?.translate) return;

    // Define init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en," + languagesString,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Add script if it doesn't exist
    if (!document.querySelector('script[src*="translate_a/element"]')) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      aria-label="Google Translate widget"
      className="fixed bottom-5 right-5 z-100
        [&_img]:hidden
        [&_.goog-te-gadget-simple]:rounded-button
        [&_.goog-te-gadget-simple]:p-clamp-10!
        [&_.goog-te-gadget-simple]:border-2!
        [&_.goog-te-gadget-simple]:border-primary!
        [&_.goog-te-gadget-simple_a]:w-fit
        [&_.goog-te-gadget-simple_a]:flex
        [&_.goog-te-gadget-simple_a]:flex-row
        [&_.goog-te-gadget-simple_a]:items-center
        [&_.goog-te-gadget-simple_a]:justify-center
        [&_.goog-te-gadget-simple_a]:text-center
        [&_.goog-te-gadget-simple_a]:gap-clamp-10"
    />
  );
};
