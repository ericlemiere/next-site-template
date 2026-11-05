"use client";
import { useState } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import { ScrollAnimation } from "@/modules/ScrollAnimation";
import { Image } from "@/modules/Image";
import { backgroundToTailwind } from "@/utils/constants/colors";

// Utility function to extract YouTube video ID from any URL format
const extractYouTubeId = (input) => {
  if (!input) return null;

  // If it's an iframe embed code, extract src first
  if (input.includes("<iframe")) {
    const srcMatch = input.match(/src=["']([^"']+)["']/);
    input = srcMatch ? srcMatch[1] : input;
  }

  // Try different YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export const VideoYouTube = ({ data = {} }) => {
  const {
    youtubeUrl,
    videoThumbnail,
    anchorTagLink,
    sectionStyles = {},
    _key,
  } = data;
  const { backgroundColor, overlayColor, topSpacing, bottomSpacing } =
    sectionStyles;
  const overlayColorString =
    backgroundToTailwind[overlayColor] || "bg-transparent";

  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const youtubeId = extractYouTubeId(youtubeUrl);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Wait for fade animation before showing video
    setTimeout(() => {
      setShowVideo(true);
    }, 500);
  };

  return (
    <DefaultWrapper
      id={anchorTagLink}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
      backgroundColor={backgroundColor}
      searchKey={_key}
    >
      <ScrollAnimation type="fade-in" duration={1}>
        <figure
          className="w-full bg-black overflow-hidden relative aspect-video rounded-card cursor-pointer m-0 group"
          onClick={handlePlayVideo}
        >
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
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title={"YouTube video player"}
              className="absolute inset-0"
            />
          )}
        </figure>
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
