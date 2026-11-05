"use client";
import { useState, useEffect, useRef } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { RichText } from "@/modules/RichText";
import { SanityButton } from "@/modules/SanityButton";
import { Text } from "@/modules/Text";
import { Image } from "@/modules/Image";

import { justifyHelper, textAlignHelper } from "@/utils/helpers/style-helpers";
import { backgroundToTailwind } from "@/utils/constants/colors";
import { defaultMobileWidth } from "@/utils/constants/spacing";

export const VideoVimeo = ({ data = {} }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const iframeRef = useRef(null);

  const {
    vimeoId,
    title,
    subtitle,
    selectedLayout,
    restrictHeight,
    button,
    videoThumbnail,
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const {
    backgroundColor,
    overlayColor,
    textAlignment,
    titleTextColor,
    titleTextSize,
    titleHeadingTag,
    subtitleTextColor,
    subtitleTextSize,
    topSpacing,
    bottomSpacing,
  } = sectionStyles;
  const justifyString = justifyHelper(textAlignment);
  const textAlignString = textAlignHelper(textAlignment);
  const overlayColorString =
    backgroundToTailwind[overlayColor] || "bg-transparent";
  const heightRestricted = restrictHeight === 1;
  const isFullScreen = selectedLayout === 1;
  const hasTextOverlay = title || subtitle;

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Wait for fade animation before showing video
    setTimeout(() => {
      setShowVideo(true);
    }, 500);
  };

  // Handle video loading with a timeout fallback (only for full screen autoplay)
  useEffect(() => {
    if (!vimeoId || !isFullScreen) return;

    // Set a timeout to show video after 2 seconds even if we don't detect load
    const fallbackTimer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 2000);

    // Listen for iframe load
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        // Give it a small delay after iframe loads for video to buffer
        setTimeout(() => {
          setIsVideoLoaded(true);
        }, 500);
      };

      iframe.addEventListener("load", handleLoad);

      return () => {
        clearTimeout(fallbackTimer);
        iframe.removeEventListener("load", handleLoad);
      };
    }

    return () => clearTimeout(fallbackTimer);
  }, [vimeoId, isFullScreen]);

  const getFigureClasses = () => {
    const baseClasses = isFullScreen
      ? "mux_video_containter relative w-full overflow-hidden m-auto"
      : "mux_video_containter relative w-full rounded-card overflow-hidden m-auto";

    // If no text overlay and no height restriction, use aspect ratio
    if (!hasTextOverlay && !heightRestricted) {
      return `${baseClasses} aspect-video`;
    }

    // If no text overlay but height is restricted (fullscreen only)
    if (!hasTextOverlay && heightRestricted && isFullScreen) {
      return `${baseClasses} min-w-full h-[70vh] min-h-[450px] max-h-[600px] overflow-hidden relative block m-0
        [&_iframe]:w-[160vh]! [&_iframe]:h-[70vh]! [&_iframe]:min-h-[450px]! [&_iframe]:max-h-[600px]! 
        [&_iframe]:block [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-1/2! 
        [&_iframe]:-translate-x-1/2
        md:[&_iframe]:w-[300vw]! md:[&_iframe]:h-[168.75vw]!
        md:[&_iframe]:min-w-[177.78vh]! md:[&_iframe]:min-h-[100vh]!
        md:[&_iframe]:left-1/2! md:[&_iframe]:top-1/2! md:[&_iframe]:-translate-y-1/2 md:[&_iframe]:-translate-x-1/2
        2xl:[&_iframe]:min-h-[150vh]! 2xl:[&_iframe]:min-w-[266.67vh]!`;
    }

    // Contained layout with text overlay - height-based on mobile, aspect-ratio on desktop
    if (!isFullScreen) {
      return `${baseClasses} h-[70vh] min-h-[450px] overflow-hidden relative block m-0
        [&_iframe]:w-[160vh]! [&_iframe]:h-[70vh]! [&_iframe]:min-h-[450px]! [&_iframe]:block 
        [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-1/2! 
        [&_iframe]:-translate-x-1/2
        md:aspect-video md:h-auto
        md:[&_iframe]:w-full! md:[&_iframe]:h-full! 
        md:[&_iframe]:left-0! md:[&_iframe]:translate-x-0 md:[&_iframe]:relative`;
    }

    // Full screen with height restricted
    if (heightRestricted) {
      return `${baseClasses} min-w-full h-[70vh] min-h-[450px] max-h-[600px] overflow-hidden relative block m-0
        [&_iframe]:w-[160vh]! [&_iframe]:h-[70vh]! [&_iframe]:min-h-[450px]! [&_iframe]:max-h-[600px]! 
        [&_iframe]:block [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-1/2! 
        [&_iframe]:-translate-x-1/2
        md:[&_iframe]:w-[300vw]! md:[&_iframe]:h-[168.75vw]!
        md:[&_iframe]:min-w-[177.78vh]! md:[&_iframe]:min-h-[100vh]!
        md:[&_iframe]:left-1/2! md:[&_iframe]:top-1/2! md:[&_iframe]:-translate-y-1/2 md:[&_iframe]:-translate-x-1/2
        2xl:[&_iframe]:min-h-[150vh]! 2xl:[&_iframe]:min-w-[266.67vh]!`;
    }

    // Full screen without height restriction
    return `${baseClasses} min-w-full h-[70vh] min-h-[450px] overflow-hidden relative block m-0
      [&_iframe]:w-[160vh]! [&_iframe]:h-[70vh]! [&_iframe]:min-h-[450px]! [&_iframe]:block 
      [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-1/2! 
      [&_iframe]:-translate-x-1/2
      md:aspect-video md:w-screen md:h-[56.25vw]
      md:[&_iframe]:w-full! md:[&_iframe]:h-full! 
      md:[&_iframe]:left-0! md:[&_iframe]:translate-x-0`;
  };

  const figureClasses = getFigureClasses();

  // Render click-to-play version for non-fullscreen
  if (!isFullScreen) {
    return (
      <DefaultWrapper
        id={anchorTagLink}
        backgroundColor={backgroundColor}
        topSpacing={topSpacing}
        bottomSpacing={bottomSpacing}
        searchKey={_key}
      >
        {vimeoId && (
          <ScrollAnimation type="fade-in" duration={1}>
            <figure
              className={`${figureClasses} bg-black cursor-pointer m-0 group`}
              onClick={handlePlayVideo}
            >
              {title && <figcaption className="sr-only">{title}</figcaption>}

              {/* Thumbnail Layer */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div
                  className={`absolute top-0 w-full h-full ${overlayColorString} opacity-80 hover:opacity-90 transition duration-300 z-40`}
                />

                <button
                  type="button"
                  className="z-50 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-22.5 h-22.5 rounded-full flex items-center justify-center
                      transition-all duration-300 group-hover:scale-110 cursor-pointer
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Play video"
                >
                  <svg
                    width="90"
                    height="90"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="45" cy="45" r="45" fill="#000000" />
                    <g transform="translate(28, 27) scale(2.4)">
                      <path
                        d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
                        fill="#FFFFFF"
                      />
                    </g>
                  </svg>
                </button>

                {videoThumbnail && (
                  <Image image={videoThumbnail} aspectRatio={16 / 9} />
                )}
              </div>

              {/* Video Layer */}
              {showVideo && (
                <div className="absolute inset-0">
                  <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&controls=1&quality=auto`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title || "Vimeo video player"}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </figure>
          </ScrollAnimation>
        )}
      </DefaultWrapper>
    );
  }

  // Render full-screen autoplay version
  return (
    <DefaultWrapper
      id={anchorTagLink}
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      mobileWidth={isFullScreen ? "w-full" : null}
      desktopWidth={isFullScreen ? "lg:w-full" : null}
      searchKey={_key}
    >
      {vimeoId && (
        <>
          <figure className={figureClasses}>
            {title && <figcaption className="sr-only">{title}</figcaption>}

            <div
              className={`absolute top-0 w-full h-full ${overlayColorString} opacity-80 z-40`}
            />

            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1&controls=0&quality=auto`}
              className={`w-full h-full transition-opacity duration-1000 ease-out ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
              allow="autoplay"
              title={title || "Video"}
            />
          </figure>
          {hasTextOverlay && (
            <ScrollAnimation
              stagger={0.1}
              className={`absolute m-auto flex flex-col z-50 top-0 left-0 right-0 bottom-0 h-full
                justify-center ${textAlignString} ${defaultMobileWidth} lg:w-4/5 max-w-384 gap-clamp-30`}
            >
              {title && (
                <Text
                  color={titleTextColor}
                  size={titleTextSize}
                  tag={titleHeadingTag}
                  className="w-full"
                >
                  {title}
                </Text>
              )}
              {subtitle && (
                <div>
                  <RichText
                    data={subtitle}
                    size={subtitleTextSize}
                    color={subtitleTextColor}
                    tag="p"
                  />
                </div>
              )}
              {button?.text && (
                <div className={`flex w-full mt-clamp-10 ${justifyString}`}>
                  <SanityButton data={button} />
                </div>
              )}
            </ScrollAnimation>
          )}
        </>
      )}
    </DefaultWrapper>
  );
};
