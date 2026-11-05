"use client";

import React, { useState, useRef, useEffect } from "react";
import { DefaultWrapper } from "@/modules/DefaultWrapper";
import {
  PlayIcon,
  PauseIcon,
  LoadingIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  ErrorIcon,
  DownloadIcon,
} from "./AudioPlayerIcons";
import { ScrollAnimation } from "@/modules/ScrollAnimation";

export const AudioPlayer = ({ data }) => {
  const { audioFile, title, allowDownload, sectionStyles = {} } = data;
  const { backgroundColor, topSpacing, bottomSpacing } = sectionStyles;

  const audioRef = useRef(null);
  const speedMenuRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buffered, setBuffered] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const audioUrl = audioFile?.asset?.url;
  const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    // Reset loading state
    setIsLoading(true);
    setError(null);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlayThrough = () => setIsLoading(false);
    const handleError = () => {
      setError("Failed to load audio file");
      setIsLoading(false);
    };
    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        setBuffered(bufferedEnd);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);
    audio.addEventListener("progress", handleProgress);

    // Force load the audio
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("progress", handleProgress);
    };
  }, [audioUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        speedMenuRef.current &&
        !speedMenuRef.current.contains(event.target)
      ) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handlePlaybackRateSelect = (rate) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedMenu(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration
    );
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = audioFile?.asset?.originalFilename || "podcast-episode.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bufferedPercentage = duration > 0 ? (buffered / duration) * 100 : 0;
  const playedPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioUrl) {
    return null;
  }

  if (error) {
    return (
      <DefaultWrapper
        backgroundColor={backgroundColor}
        topSpacing={topSpacing}
        bottomSpacing={bottomSpacing}
      >
        <div className="w-full max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 text-red-700">
            <ErrorIcon className="w-6 h-6 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      </DefaultWrapper>
    );
  }

  return (
    <DefaultWrapper
      backgroundColor={backgroundColor}
      topSpacing={topSpacing}
      bottomSpacing={bottomSpacing}
    >
      <ScrollAnimation>
        <figure className="w-full mx-auto bg-lightgray rounded-xl shadow-lg p-6 m-0">
          <audio ref={audioRef} src={audioUrl} preload="auto" />

          {/* Track info */}
          <div className="mb-4">
            <p className="text-heading3 font-semibold text-gray-900 truncate">
              {title || "(Untitled)"}
            </p>
          </div>

          {/* Progress bar with buffer indicator */}
          <div className="mb-4">
            <div className="relative h-2 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary-20 rounded-lg transition-all duration-300"
                style={{ width: `${bufferedPercentage}%` }}
              />
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-lg"
                style={{ width: `${playedPercentage}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                disabled={isLoading}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Audio progress"
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              />
            </div>
            <div className="flex justify-between text-body2 text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Play controls - always centered */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => skip(-15)}
                disabled={isLoading}
                className="p-2 cursor-pointer text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Skip back 15 seconds"
              >
                <div className="relative">
                  <SkipBackIcon className="w-clamp-30 h-clamp-30" />
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-body3">
                    15
                  </span>
                </div>
              </button>

              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="p-4 cursor-pointer bg-primary text-white rounded-full hover:scale-110 transition-all disabled:bg-gray disabled:cursor-not-allowed relative"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isLoading ? (
                  <LoadingIcon className="w-clamp-30 h-clamp-30 animate-spin" />
                ) : isPlaying ? (
                  <PauseIcon className="w-clamp-30 h-clamp-30" />
                ) : (
                  <PlayIcon className="w-clamp-30 h-clamp-30" />
                )}
              </button>

              <button
                onClick={() => skip(15)}
                disabled={isLoading}
                className="p-2 cursor-pointer text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Skip forward 15 seconds"
              >
                <div className="relative">
                  <SkipForwardIcon className="w-clamp-30 h-clamp-30" />
                  <span className="absolute top-full left-1/2 -translate-x-1/2 text-body3">
                    15
                  </span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 w-full justify-between">
              <div className="flex items-center gap-3">
                {/* Playback speed */}
                <div className="relative" ref={speedMenuRef}>
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-15 cursor-pointer"
                    aria-label={`Playback speed: ${playbackRate}x. Click to change.`}
                  >
                    {playbackRate}x
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-20 z-10">
                      {playbackRates.map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handlePlaybackRateSelect(rate)}
                          className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors cursor-pointer ${
                            rate === playbackRate
                              ? "text-primary font-medium bg-primary-10"
                              : "text-gray-700"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Download button */}
                {allowDownload && (
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Download episode"
                  >
                    <DownloadIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  <VolumeIcon
                    volume={volume}
                    isMuted={isMuted}
                    className="w-5 h-5"
                  />
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-clamp-120 h-clamp-8 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </figure>
      </ScrollAnimation>
    </DefaultWrapper>
  );
};
