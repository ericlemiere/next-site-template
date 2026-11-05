"use client";
import { useState, useEffect, useRef } from "react";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { Image } from "@/modules/Image/Image";
import { Text } from "@/modules/Text/Text";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { backgroundToTailwind } from "@/utils/constants/colors";
import { COLOR } from "@/utils/constants/colors";

export const TabbedSectionMobile = ({
  tabSections,
  sectionStyles,
  titleTextColor,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [contentHeights, setContentHeights] = useState([]);
  const accordionContentRefs = useRef([]);

  // Measure content heights after render
  useEffect(() => {
    const heights = accordionContentRefs.current.map(
      (ref) => ref?.scrollHeight || 0,
    );
    setContentHeights(heights);
  }, [tabSections]);

  // Recalculate heights when active tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const heights = accordionContentRefs.current.map(
        (ref) => ref?.scrollHeight || 0,
      );
      setContentHeights(heights);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const toggleAccordion = (index) => {
    setActiveTab(activeTab === index ? -1 : index);
  };

  const renderAccordionItems = tabSections?.map((item, index) => {
    const hasImage = !!item.image.image;
    const hasText = !!item.subtitle || !!item.body;
    const isOpen = activeTab === index;
    const plusSignColor = backgroundToTailwind[titleTextColor] || "bg-black";

    return (
      <div
        key={index}
        className={`w-full border-b border-gray ${index === 0 ? "border-t" : ""}`}
      >
        <button
          className="group w-full flex justify-between items-center cursor-pointer bg-transparent border-0 pt-clamp-24 pb-clamp-20"
          onClick={() => toggleAccordion(index)}
          aria-expanded={isOpen}
        >
          <Text
            tag="p"
            size="heading4"
            color={isOpen ? titleTextColor : COLOR.GRAY}
            className={`text-left
              underline underline-offset-0 decoration-1 decoration-transparent 
              group-hover:decoration-inherit group-hover:decoration-2 group-hover:underline-offset-4
              transition-all duration-200`}
          >
            {item.title}
          </Text>
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
        </button>
        <div
          ref={(el) => (accordionContentRefs.current[index] = el)}
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{
            maxHeight: isOpen ? `${contentHeights[index] || 2000}px` : "0px",
          }}
        >
          <div className="pb-clamp-24 flex flex-col gap-y-10">
            {hasImage && (
              <div className="h-full rounded-image overflow-hidden">
                <Image
                  image={item.image}
                  className="w-full h-auto"
                  alt={item.subtitle || item.title || "Tab section image"}
                />
              </div>
            )}
            {hasText && (
              <TextBlock
                subtitle={item.subtitle}
                body={item.body}
                sectionStyles={{
                  ...sectionStyles,
                  subtitleTextSize: "heading6",
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <ScrollAnimation stagger={0.2} className="flex flex-col w-full">
      {renderAccordionItems}
    </ScrollAnimation>
  );
};
