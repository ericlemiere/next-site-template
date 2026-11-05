"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { backgroundToTailwind } from "@/utils/constants/colors";
import { cleanString } from "@/utils/helpers/string-helpers";

export const ImageHotspot = ({ data = {}, loading }) => {
  const {
    selectedLayout,
    hotspotImage,
    anchorTagLink,
    sectionStyles = {},
  } = data;
  const { backgroundColor, overlayColor, topSpacing, bottomSpacing } =
    sectionStyles;

  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isFullBleedImage = selectedLayout === 1;
  const borderRadiusString = isFullBleedImage
    ? ""
    : "overflow-hidden rounded-image";
  const hasOverlay = overlayColor && overlayColor !== "transparent";
  const overlayColorString = hasOverlay
    ? backgroundToTailwind[overlayColor]
    : "";

  const hotspots = hotspotImage?.hotspots || [];
  const hotspotBackgroundColor =
    backgroundToTailwind[cleanString(hotspotImage?.backgroundColor)] ||
    "bg-white";

  const handleToggle = (index) => {
    setActiveHotspot(activeHotspot === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(index);
    } else if (e.key === "Escape" && activeHotspot === index) {
      setActiveHotspot(null);
    }
  };

  // Close hotspot when clicking outside or on the image
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close if clicking outside the container
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveHotspot(null);
        return;
      }

      // Close if clicking inside container but not on a hotspot button or popup
      const isHotspotButton = event.target.closest("button[aria-expanded]");
      const isHotspotPopup = event.target.closest('[role="tooltip"]');

      if (!isHotspotButton && !isHotspotPopup) {
        setActiveHotspot(null);
      }
    };

    if (activeHotspot !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeHotspot]);

  // Early return must come after all hooks so live edits that remove and
  // re-add the image don't change the hook order between renders
  if (!hotspotImage?.image) return null;

  const renderHotspots = hotspots.map((hotspot, index) => {
    const { x, y, details = "", _key } = hotspot;
    const isActive = activeHotspot === index;

    // Determine if hotspot is on the left or right side
    const isOnLeftSide = x < 50;

    return (
      <div
        key={_key || index}
        className={`absolute ${isActive ? "z-60" : "z-10"}`}
        style={{
          top: `${y}%`,
          left: `${x}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Hotspot Button */}
        <button
          onClick={() => handleToggle(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`${hotspotBackgroundColor} w-clamp-18 h-clamp-18 rounded-full shadow-xl hover:scale-120 transition-transform duration-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer relative z-60`}
          aria-label={`Hotspot ${index + 1}: ${details || "View details"}`}
          aria-expanded={isActive}
          aria-controls={`hotspot-popup-${index}`}
        >
          <span className="text-white text-xs font-bold sr-only">
            {index + 1}
          </span>
        </button>

        {/* Desktop Popup */}
        {isActive && !isMobile && (
          <>
            {/* Connecting Line */}
            <div
              className="absolute bg-white transition-all linear z-70"
              style={{
                bottom: "42%",
                [isOnLeftSide ? "left" : "right"]: "50%",
                width: "40px",
                height: "2px",
                transformOrigin: isOnLeftSide ? "bottom left" : "bottom right",
                animation: "slideIn 100ms ease-out forwards",
              }}
            />

            {/* Popup Card */}
            <div
              id={`hotspot-popup-${index}`}
              role="tooltip"
              className={`absolute bottom-full w-max max-w-xs overflow-y-auto 
              rounded-sm bg-white shadow-xl p-4 z-80 opacity-0 translate-y-1/2 border-2 border-white
              ${isOnLeftSide ? "left-1/2 ml-10" : "right-1/2 mr-10"}`}
              style={{
                animation: "fadeSlideIn 100ms linear 100ms forwards",
              }}
            >
              {/* Popup Content */}
              <p className="text-body2 text-black whitespace-normal">
                {details}
              </p>
            </div>
          </>
        )}
      </div>
    );
  });

  // Mobile Modal Portal
  const mobileModal =
    activeHotspot !== null &&
    isMobile &&
    typeof window !== "undefined" &&
    createPortal(
      <div
        className="fixed inset-0 z-1000 flex items-center justify-center bg-black/90 animate-fadeIn"
        onClick={() => setActiveHotspot(null)}
      >
        <button
          onClick={() => setActiveHotspot(null)}
          className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 pb-1 text-black hover:text-gray-700 text-2xl flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>
        <div
          className="bg-white  w-9/10 max-h-[80vh] overflow-y-auto px-4 py-3 shadow-2xl animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-body1 text-black whitespace-normal">
            {hotspots[activeHotspot]?.details}
          </p>
        </div>
      </div>,
      document.body
    );

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      mobileWidth={isFullBleedImage ? "w-full" : null}
      desktopWidth={isFullBleedImage ? "lg:w-full" : null}
    >
      <ScrollAnimation type="fade-in" duration={1} threshold={0.1}>
        <div ref={containerRef} className="relative w-full">
          {hasOverlay && (
            <div
              className={`hero-overlay w-full h-full absolute top-0 left-0 z-1 ${overlayColorString} opacity-60 ${borderRadiusString}`}
            />
          )}
          <Image
            image={hotspotImage.image}
            loading={loading}
            sizes={isFullBleedImage ? "100vw" : "90vw"}
            className={isFullBleedImage ? "" : "rounded-image"}
          />
          {renderHotspots}
        </div>
        {mobileModal}
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
