"use client";
import { useEffect, useRef, useState } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { Text } from "@/modules/Text";
import { SanityButton } from "@/modules/SanityButton";
import { Image } from "@/modules/Image";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import {
  clampSize,
  justifyHelper,
  textAlignHelper,
} from "@/utils/helpers/style-helpers";
import { cleanString } from "@/utils/helpers/string-helpers";

export const HeroImage = ({ data, loading }) => {
  const {
    image,
    title,
    selectedLayout: layout,
    addParallaxEffect,
    button,
    sectionStyles = {},
    anchorTagLink,
    _key,
  } = data;
  const {
    overlayColor,
    titleTextColor,
    titleTextSize,
    textAlignment,
    titleHeadingTag,
    topSpacing,
    bottomSpacing,
  } = sectionStyles;

  const isFullHeight = layout === 1;
  const isCondensedHeight = layout === 2;
  const fullHeight = 770;
  const condensedHeight = 651;
  const bannerHeight = 400;

  const heroHeight = isFullHeight
    ? clampSize(fullHeight)
    : isCondensedHeight
      ? clampSize(condensedHeight)
      : clampSize(bannerHeight);

  const aspectRatio = isFullHeight
    ? 1440 / fullHeight
    : isCondensedHeight
      ? 1440 / condensedHeight
      : 1440 / bannerHeight;

  const hasOverlay = overlayColor && overlayColor !== "transparent";
  const textAlignString = textAlignHelper(textAlignment);
  const justifyString = justifyHelper(textAlignment);

  // Alignment for the 90% width container
  const containerAlignString =
    textAlignment === "center"
      ? "mx-auto"
      : textAlignment === "right"
        ? "ml-auto"
        : "";

  const containerRef = useRef(null);
  const [isPinned, setIsPinned] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [initialPinTop, setInitialPinTop] = useState(0);

  useEffect(() => {
    // Prevent initial jump by waiting for layout to settle
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !addParallaxEffect) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Calculate the element's position relative to the document
      const elementTop = rect.top + scrollY;
      const elementBottom = elementTop + rect.height;

      // Pin when the element reaches the top of the viewport
      if (scrollY >= elementTop && scrollY < elementBottom) {
        if (!isPinned) {
          // Store the initial top position when pinning starts
          setInitialPinTop(rect.top);
        }
        setIsPinned(true);

        // Calculate how much the user has scrolled past the element's start
        const scrollPastElement = scrollY - elementTop;

        // Slow scroll: move image up at 30% of scroll speed (adjust 0.3 for faster/slower)
        const slowScrollOffset = initialPinTop - scrollPastElement * 0.3;

        setTopOffset(slowScrollOffset);
      } else if (scrollY < elementTop) {
        // Before reaching the element
        setIsPinned(false);
        setTopOffset(0);
        setInitialPinTop(0);
      } else {
        // After scrolling past the element completely
        setIsPinned(false);
        setTopOffset(0);
        setInitialPinTop(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady, addParallaxEffect]);

  return (
    <DefaultWrapper
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      id={anchorTagLink}
      searchKey={_key}
      mobileWidth="w-full"
      desktopWidth="lg:w-full"
    >
      <ScrollAnimation type="fade-in" duration={0.6} threshold={0.1}>
        <div
          ref={containerRef}
          className="hero-pin-container relative flex items-center justify-center"
          style={{
            minHeight: heroHeight,
          }}
        >
          {/* Background that pins when scrolling into view */}
          <div
            className={`hero-pin-background bg-white overflow-hidden left-0 w-full z-0 motion-reduce:absolute ${
              addParallaxEffect && isPinned ? "fixed" : "absolute h-full"
            }`}
            style={{
              top: addParallaxEffect && isPinned ? `${topOffset}px` : "0",
              height: addParallaxEffect && isPinned ? heroHeight : undefined,
              minHeight: addParallaxEffect && isPinned ? heroHeight : "100%",
            }}
          >
            {image && (
              <div className="hero-image-wrapper w-full h-full relative">
                <Image
                  image={image}
                  loading={loading}
                  aspectRatio={aspectRatio}
                  sizes="100vw"
                />
              </div>
            )}
            {hasOverlay && (
              <div
                className="hero-overlay w-full h-full absolute top-0 left-0 z-1"
                style={{
                  backgroundImage: `linear-gradient(to ${textAlignment === "center" ? "top" : textAlignment === "right" ? "left" : "right"}, ${cleanString(overlayColor)}, transparent)`,
                }}
              />
            )}
          </div>

          {/* Content centered in the hero */}
          <div className="hero-pin-content relative z-1 w-full py-clamp-60">
            <DefaultWrapper topSpacing={"none"} bottomSpacing={"none"}>
              <ScrollAnimation
                type="fade-in"
                duration={0.8}
                delay={0.2}
                className={`hero-content-inner w-full lg:w-9/10 ${containerAlignString} flex flex-col ${justifyString} items-center z-2 relative`}
              >
                {title && (
                  <Text
                    tag={titleHeadingTag}
                    size={titleTextSize}
                    color={titleTextColor}
                    className={`w-full ${textAlignString}`}
                  >
                    {title}
                  </Text>
                )}
                {button?.text && (
                  <div
                    className={`hero-button-wrapper w-full flex ${justifyString} mt-clamp-40`}
                  >
                    <SanityButton data={button} />
                  </div>
                )}
              </ScrollAnimation>
            </DefaultWrapper>
          </div>
        </div>
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
