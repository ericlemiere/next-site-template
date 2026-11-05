"use client";
import { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Text } from "@/modules/Text";
import { RichText } from "@/modules/RichText";
import { COLOR, backgroundToTailwind } from "@/utils/constants/colors";
import { defaultMobileWidth } from "@/utils/constants/spacing";
import { textAlignHelper } from "@/utils/helpers/style-helpers";
import { GrDownload, GrClose } from "react-icons/gr";

export const VideoMux = ({ data = {} }) => {
  const {
    video,
    title,
    subtitle,
    anchorTagLink,
    selectedLayout,
    restrictHeight,
    sectionStyles,
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

  const textAlignString = textAlignHelper(textAlignment);
  const overlayColorString =
    backgroundToTailwind[overlayColor] || "bg-transparent";

  const [mp4Ready, setMp4Ready] = useState(false);
  const [downloadOptionsOpen, setDownloadOptionsOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoTitle = video?.asset?.filename || title || "Sphere-MD-Video";
  const titleFormatted = videoTitle.replace(/\s+/g, "-").toLowerCase();
  const playbackId = video?.asset?.playbackId;
  const staticRenditions = video?.asset?.staticRenditions;

  const hideControls = data?.muxOptions?.hideControls || false;
  const downloadable = data?.muxOptions?.downloadable || false;
  const autoPlay = data?.muxOptions?.autoplay || false;
  const loop = data?.muxOptions?.loop || false;

  const isFullScreen = selectedLayout === 1;
  const heightRestricted = restrictHeight === 1;
  const hasTextOverlay = autoPlay && (title || subtitle);

  useEffect(() => {
    if (staticRenditions?.status === "ready") {
      setMp4Ready(true);
    } else {
      setMp4Ready(false);
    }
  }, [staticRenditions?.status]);

  const figureClasses = getFigureClasses(
    isFullScreen,
    heightRestricted,
    hasTextOverlay,
  );
  const textContainerClasses = getTextContainerClasses(textAlignString);

  return (
    <DefaultWrapper
      id={anchorTagLink}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      mobileWidth={isFullScreen ? "w-full" : null}
      desktopWidth={isFullScreen ? "lg:w-full" : null}
      backgroundColor={backgroundColor}
      searchKey={_key}
    >
      {/* Text Content - Only show overlay when autoplay is true */}
      {hasTextOverlay && (
        <ScrollAnimation stagger={0.1} className={textContainerClasses}>
          {title && (
            <Text
              color={titleTextColor}
              size={titleTextSize}
              tag={titleHeadingTag}
              className={`w-full ${textAlignString}`}
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
                className={`w-full ${textAlignString}`}
              />
            </div>
          )}
        </ScrollAnimation>
      )}

      {/* Video Player */}
      {playbackId && (
        <ScrollAnimation>
          <figure className={figureClasses}>
            {/* Thumbnail background - shows before video loads */}
            {video?.asset?.thumbTime !== undefined && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
                style={{
                  backgroundImage: `url(https://image.mux.com/${playbackId}/thumbnail.jpg?time=${video.asset.thumbTime})`,
                }}
              />
            )}

            {/* Loading spinner */}
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div
                  className={`w-16 h-16 border-4 border-gray border-t-transparent rounded-full animate-spin`}
                />
              </div>
            )}

            <div
              className={`absolute top-0 w-full h-full ${overlayColorString} transition-opacity duration-500 pointer-events-none z-40 ${
                isPlaying && !autoPlay ? "opacity-0" : "opacity-80"
              }`}
            />
            {title && <figcaption className="sr-only">{title}</figcaption>}
            <MuxPlayer
              playbackId={playbackId}
              title={videoTitle}
              metadata={title ? { video_title: title } : undefined}
              autoplay={autoPlay ? "muted" : false}
              loop={loop}
              accentColor={COLOR.PRIMARY}
              primaryColor={COLOR.WHITE}
              secondaryColor={COLOR.BLACK}
              thumbnailTime={video?.asset?.thumbTime}
              onLoadedData={() => setVideoLoaded(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: "opacity 0.6s ease-in",
              }}
              className={`aspect-video [--seek-backward-button:none]
                [--controls-backdrop-color:color-mix(in_srgb,var(--color-primary)_30%,transparent)] 
                ${hideControls ? "[--controls:none]" : ""}`}
            />
          </figure>
        </ScrollAnimation>
      )}

      {/* Download Options - Only show for non-fullscreen layout */}
      {!isFullScreen && downloadable && mp4Ready && (
        <DownloadOptions
          playbackId={playbackId}
          staticRenditions={staticRenditions}
          titleFormatted={titleFormatted}
          subtitleTextColor={subtitleTextColor}
          downloadOptionsOpen={downloadOptionsOpen}
          setDownloadOptionsOpen={setDownloadOptionsOpen}
        />
      )}
    </DefaultWrapper>
  );
};

// Helper function to get figure classes based on layout
function getFigureClasses(isFullScreen, heightRestricted, hasTextOverlay) {
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
      [&_mux-player]:w-[160vh]! [&_mux-player]:h-[70vh]! [&_mux-player]:min-h-[450px]! [&_mux-player]:max-h-[600px]! 
      [&_mux-player]:block [&_mux-player]:absolute [&_mux-player]:top-0 [&_mux-player]:left-1/2! 
      [&_mux-player]:-translate-x-1/2
      md:[&_mux-player]:w-[300vw]! md:[&_mux-player]:h-[168.75vw]!
      md:[&_mux-player]:min-w-[177.78vh]! md:[&_mux-player]:min-h-[100vh]!
      md:[&_mux-player]:left-1/2! md:[&_mux-player]:top-1/2! md:[&_mux-player]:-translate-y-1/2 md:[&_mux-player]:-translate-x-1/2
      2xl:[&_mux-player]:min-h-[150vh]! 2xl:[&_mux-player]:min-w-[266.67vh]!`;
  }

  // Contained layout with text overlay - height-based on mobile, aspect-ratio on desktop
  if (!isFullScreen) {
    return `${baseClasses} h-[70vh] min-h-[450px] overflow-hidden relative block m-0
      [&_mux-player]:w-[160vh]! [&_mux-player]:h-[70vh]! [&_mux-player]:min-h-[450px]! [&_mux-player]:block 
      [&_mux-player]:absolute [&_mux-player]:top-0 [&_mux-player]:left-1/2! 
      [&_mux-player]:-translate-x-1/2
      md:aspect-video md:h-auto
      md:[&_mux-player]:w-full! md:[&_mux-player]:h-full! 
      md:[&_mux-player]:left-0! md:[&_mux-player]:translate-x-0 md:[&_mux-player]:relative`;
  }

  // Full screen with height restricted
  if (heightRestricted) {
    return `${baseClasses} min-w-full h-[70vh] min-h-[450px] max-h-[600px] overflow-hidden relative block m-0
      [&_mux-player]:w-[160vh]! [&_mux-player]:h-[70vh]! [&_mux-player]:min-h-[450px]! [&_mux-player]:max-h-[600px]! 
      [&_mux-player]:block [&_mux-player]:absolute [&_mux-player]:top-0 [&_mux-player]:left-1/2! 
      [&_mux-player]:-translate-x-1/2
      md:[&_mux-player]:w-[300vw]! md:[&_mux-player]:h-[168.75vw]!
      md:[&_mux-player]:min-w-[177.78vh]! md:[&_mux-player]:min-h-[100vh]!
      md:[&_mux-player]:left-1/2! md:[&_mux-player]:top-1/2! md:[&_mux-player]:-translate-y-1/2 md:[&_mux-player]:-translate-x-1/2
      2xl:[&_mux-player]:min-h-[150vh]! 2xl:[&_mux-player]:min-w-[266.67vh]!`;
  }

  // Full screen without height restriction
  return `${baseClasses} min-w-full h-[70vh] min-h-[450px] overflow-hidden relative block m-0
    [&_mux-player]:w-[160vh]! [&_mux-player]:h-[70vh]! [&_mux-player]:min-h-[450px]! [&_mux-player]:block 
    [&_mux-player]:absolute [&_mux-player]:top-0 [&_mux-player]:left-1/2! 
    [&_mux-player]:-translate-x-1/2
    md:aspect-video md:w-screen md:h-[56.25vw]
    md:[&_mux-player]:w-full! md:[&_mux-player]:h-full! 
    md:[&_mux-player]:left-0! md:[&_mux-player]:translate-x-0`;
}

// Helper function to get text container classes - always absolute when shown
function getTextContainerClasses(textAlignString) {
  return `absolute m-auto z-50 top-0 left-0 right-0 bottom-0 h-full flex flex-col justify-center gap-clamp-30 ${textAlignString} ${defaultMobileWidth} lg:w-4/5 max-w-[1536px]`;
}

// Download Options Component
function DownloadOptions({
  playbackId,
  staticRenditions,
  titleFormatted,
  subtitleTextColor,
  downloadOptionsOpen,
  setDownloadOptionsOpen,
}) {
  const highQuality = staticRenditions?.files?.find((f) =>
    f.name.toLowerCase().includes("high"),
  );
  const mediumQuality = staticRenditions?.files?.find((f) =>
    f.name.toLowerCase().includes("medium"),
  );
  const lowQuality = staticRenditions?.files?.find((f) =>
    f.name.toLowerCase().includes("low"),
  );

  const calculateFileSizeMB = (filesize) => {
    if (!filesize) return "0.00";
    try {
      const cleanSize = String(filesize).replace(/\D/g, "");
      const sizeInMB = (parseInt(cleanSize, 10) / (1024 * 1024)).toFixed(2);
      return isNaN(sizeInMB) ? "0.00" : sizeInMB;
    } catch (error) {
      console.error("Error calculating file size:", error);
      return "0.00";
    }
  };

  return (
    <div className="relative w-fit flex flex-col">
      <ScrollAnimation>
        <button
          className="inline cursor-pointer group"
          onClick={() => setDownloadOptionsOpen(!downloadOptionsOpen)}
          aria-expanded={downloadOptionsOpen}
          aria-label={
            downloadOptionsOpen
              ? "Close download options"
              : "Open download options"
          }
        >
          <Text
            size="body2"
            color={subtitleTextColor}
            className="flex gap-clamp-10 items-center underline decoration-1 underline-offset-2 decoration-inherit group-hover:decoration-2 group-hover:underline-offset-4 transition-all duration-100"
          >
            {downloadOptionsOpen ? (
              <>
                <GrClose aria-hidden="true" /> Close Download Options
              </>
            ) : (
              <>
                <GrDownload aria-hidden="true" /> Download Video
              </>
            )}
          </Text>
        </button>
      </ScrollAnimation>

      <div
        className={`absolute bottom-full w-fit flex flex-col overflow-hidden
          transition-all duration-300 z-40
          [&_a]:p-clamp-10 [&_a]:text-decoration-none [&_a]:whitespace-nowrap
          [&_a]:border-t [&_a]:border-l [&_a]:border-r
          [&_a]:border-black [&_a]:bg-white [&_a]:hover:bg-gray
          ${downloadOptionsOpen ? "max-h-clamp-160" : "max-h-0"}`}
      >
        {highQuality && highQuality.filesize && (
          <a
            href={`https://stream.mux.com/${playbackId}/high.mp4?download=${titleFormatted || "video"}-high`}
            download
          >
            <Text size="body2">
              High Quality (1080p - {calculateFileSizeMB(highQuality.filesize)}
              MB)
            </Text>
          </a>
        )}

        {mediumQuality && mediumQuality.filesize && (
          <a
            href={`https://stream.mux.com/${playbackId}/medium.mp4?download=${titleFormatted || "video"}-medium`}
            download
          >
            <Text size="body2">
              Medium Quality (480p -{" "}
              {calculateFileSizeMB(mediumQuality.filesize)}MB)
            </Text>
          </a>
        )}

        {lowQuality && lowQuality.filesize && (
          <a
            href={`https://stream.mux.com/${playbackId}/low.mp4?download=${titleFormatted || "video"}-low`}
            download
          >
            <Text size="body2">
              Low Quality (270p - {calculateFileSizeMB(lowQuality.filesize)}MB)
            </Text>
          </a>
        )}
      </div>
    </div>
  );
}
