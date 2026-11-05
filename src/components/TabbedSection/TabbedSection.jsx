"use client";
import { useState, useEffect, useRef } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { TextBlock } from "@/modules/TextBlock/TextBlock";
import { Image } from "@/modules/Image/Image";
import { Text } from "@/modules/Text/Text";
import { COLOR, backgroundToTailwind } from "@/utils/constants/colors";
import { TabbedSectionMobile } from "./TabbedSectionMobile";

export const TabbedSection = ({ data }) => {
  const { anchorTagLink, sectionStyles = {}, _key, tabSections } = data;
  const { backgroundColor, topSpacing, bottomSpacing, titleTextColor } =
    sectionStyles;
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [contentHeight, setContentHeight] = useState("auto");
  const tabPanelRefs = useRef([]);

  // Detect mobile after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set initial height on mount
  useEffect(() => {
    const activePanel = tabPanelRefs.current[0];
    if (activePanel) {
      setContentHeight(activePanel.scrollHeight);
    }
  }, []);

  // Update height when active tab changes
  useEffect(() => {
    const activePanel = tabPanelRefs.current[activeTab];
    if (activePanel) {
      const height = activePanel.scrollHeight;
      setContentHeight(height);
    }
  }, [activeTab]);

  // Update height on window resize
  useEffect(() => {
    const handleResize = () => {
      const activePanel = tabPanelRefs.current[activeTab];
      if (activePanel) {
        setContentHeight(activePanel.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  // Early return must come after all hooks so live edits that empty and
  // refill the tabs don't change the hook order between renders
  if (!tabSections || tabSections.length === 0) return null;

  const renderTabHeadings = tabSections?.map((item, index) => {
    const tabWidth =
      tabSections.length === 2
        ? "md:w-1/2"
        : tabSections.length === 3
          ? "md:w-1/3"
          : tabSections.length === 4
            ? "md:w-1/4"
            : "w-full";

    const isActive = activeTab === index;

    return (
      <button
        key={index}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${index}`}
        id={`tab-${index}`}
        tabIndex={isActive ? 0 : -1}
        className={`${tabWidth}  shrink-0 flex items-center justify-center py-4 h-full cursor-pointer px-4 first:pl-0 snap-start group`}
        onClick={() => setActiveTab(index)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            const nextTab = (index + 1) % tabSections.length;
            setActiveTab(nextTab);
            document.getElementById(`tab-${nextTab}`)?.focus();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prevTab =
              (index - 1 + tabSections.length) % tabSections.length;
            setActiveTab(prevTab);
            document.getElementById(`tab-${prevTab}`)?.focus();
          } else if (e.key === "Home") {
            e.preventDefault();
            setActiveTab(0);
            document.getElementById(`tab-0`)?.focus();
          } else if (e.key === "End") {
            e.preventDefault();
            const lastTab = tabSections.length - 1;
            setActiveTab(lastTab);
            document.getElementById(`tab-${lastTab}`)?.focus();
          }
        }}
      >
        <Text
          size="heading3"
          color={isActive ? titleTextColor : COLOR.GRAY}
          className={`w-full transition-colors duration-300 ease-in-out md:text-center group-hover:text-primary`}
        >
          {item.title}
        </Text>
      </button>
    );
  });

  const renderTabSections = tabSections?.map((item, index) => {
    const hasImage = !!item.image.image;
    const hasText = !!item.subtitle || !!item.body;
    const isActive = activeTab === index;

    return (
      <div
        key={index}
        ref={(el) => (tabPanelRefs.current[index] = el)}
        role="tabpanel"
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        hidden={!isActive}
        tabIndex={0}
        className={"w-19/20 m-auto" + (isActive ? "" : " hidden")}
      >
        <div className="flex flex-col md:flex-row gap-y-10 gap-x-clamp-80 items-center">
          {hasImage && (
            <ScrollAnimation
              retrigger={true}
              type="fade-up"
              duration={0.4}
              className={`h-full rounded-image overflow-hidden ${hasText ? "md:w-13/20" : "w-full"}`}
            >
              <Image
                image={item.image}
                className="w-full h-auto"
                alt={item.subtitle || item.title || "Tab section image"}
              />
            </ScrollAnimation>
          )}
          {hasText && (
            <ScrollAnimation
              retrigger={true}
              type="fade-up"
              threshold={0.1}
              delay={0.2}
              duration={0.4}
              className={`${hasImage ? "md:w-7/20" : "w-full"}`}
            >
              <TextBlock
                subtitle={item.subtitle}
                body={item.body}
                sectionStyles={{
                  ...sectionStyles,
                  subtitleTextSize: "heading3",
                }}
              />
            </ScrollAnimation>
          )}
        </div>
      </div>
    );
  });

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      id={anchorTagLink}
      searchKey={_key}
    >
      {/* Mobile Accordion Layout */}
      {isMounted && isMobile ? (
        <TabbedSectionMobile
          tabSections={tabSections}
          sectionStyles={sectionStyles}
          titleTextColor={titleTextColor}
        />
      ) : (
        /* Desktop Tabs Layout */
        <>
          <ScrollAnimation className="relative mb-8 md:mb-clamp-100">
            <div
              role="tablist"
              aria-label="Content tabs"
              className="w-full h-full flex justify-between items-center relative"
            >
              {renderTabHeadings}
            </div>

            <div
              className="absolute bottom-0 left-0 w-full h-1.5 bg-gray pointer-events-none"
              aria-hidden="true"
            >
              <div
                className={`h-full transition-all duration-300 ease-in-out ${
                  titleTextColor
                    ? backgroundToTailwind[titleTextColor] || "bg-gray"
                    : "bg-gray"
                }`}
                style={{
                  width: `${100 / (tabSections?.length || 1)}%`,
                  transform: `translateX(${activeTab * 100}%)`,
                }}
              />
            </div>
          </ScrollAnimation>

          <div
            className="relative overflow-hidden transition-all duration-500 ease-in-out"
            style={{ height: contentHeight }}
          >
            {renderTabSections}
          </div>
        </>
      )}
    </DefaultWrapper>
  );
};
