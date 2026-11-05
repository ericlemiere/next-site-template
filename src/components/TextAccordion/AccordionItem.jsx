"use client";
import { useState, useEffect, useRef } from "react";
import { RichText } from "@/modules/RichText";
import { Text } from "@/modules/Text";
import { backgroundToTailwind } from "@/utils/constants/colors";

export const AccordionItem = ({
  item,
  accordionTitleTextColor,
  accordionParagraphTextColor,
  firstItem = false,
}) => {
  const { title, body } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const panelId = `accordion-panel-${title?.replace(/\s+/g, "-")}`;
  const plusSignColor =
    backgroundToTailwind[accordionTitleTextColor] || "bg-black";

  // ===================================================================
  // MEASURE CONTENT HEIGHT
  // ===================================================================
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [body]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen((prev) => !prev);
      e.preventDefault();
    }
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      headerRef.current?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="w-full flex flex-col text-left">
      <div
        className={`w-full relative border-b border-gray ${firstItem ? " border-t" : ""}`}
      >
        <button
          ref={headerRef}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group w-full flex justify-between items-center cursor-pointer bg-transparent border-0 pt-clamp-24 pb-clamp-20 "
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
        >
          <Text
            tag="p"
            size="heading4"
            color={accordionTitleTextColor}
            className={`accordionTitle text-left
              underline underline-offset-0 decoration-1 decoration-transparent 
              ${!!body ? "group-hover:decoration-inherit group-hover:decoration-2 group-hover:underline-offset-4" : ""} 
              transition-all duration-200`}
          >
            {title}
          </Text>
          {body && (
            <div
              aria-hidden="true"
              className="border-0 relative flex flex-col items-center justify-center 
              w-clamp-24 h-clamp-24 bg-transparent opacity-60 transition-all
              group-hover:opacity-100 group-hover:scale-125"
            >
              <div
                className={`plusSign w-0.5 ${plusSignColor} transition-[height] duration-300 ease-in-out ${
                  isOpen ? "h-0" : "h-1/2"
                }`}
              />

              <div
                className={`plusSign h-0.5 ${plusSignColor} transition-[width] duration-300 ease-in-out ${
                  isOpen ? "w-[130%]" : "w-full"
                }`}
              />

              <div
                className={`plusSign w-0.5 ${plusSignColor} transition-[height] duration-300 ease-in-out ${
                  isOpen ? "h-0" : "h-1/2"
                }`}
              />
            </div>
          )}
        </button>
        <div
          id={panelId}
          className="overflow-hidden"
          role="region"
          aria-hidden={!isOpen}
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : 0,
            transition: `max-height 0.4s ease`,
          }}
        >
          <div ref={contentRef}>
            {body && (
              <>
                <RichText
                  data={body}
                  size="body1"
                  color={accordionParagraphTextColor}
                  tag="p"
                  disableScrollAnimation={true}
                />
                <br />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
