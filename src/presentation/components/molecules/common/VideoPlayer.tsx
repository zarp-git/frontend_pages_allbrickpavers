"use client";

import { useState, useRef, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const VideoPlayerComponent = ({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  onPlay,
  onPause,
  onEnded,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showMutedIndicator, setShowMutedIndicator] = useState(
    muted && !autoPlay,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowMutedIndicator(false);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onPlay, onPause, onEnded]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as unknown as Record<string, Element>)
          .webkitFullscreenElement ||
        (document as unknown as Record<string, Element>).mozFullScreenElement ||
        (document as unknown as Record<string, Element>).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  const handleVideoClick = async () => {
    const video = videoRef.current;
    if (!video || isLoading) return;

    try {
      setIsLoading(true);

      if (isMuted) {
        video.muted = false;
        setIsMuted(false);
        setShowMutedIndicator(false);

        if (video.paused) {
          await video.play();
        }
      } else {
        if (video.paused) {
          await video.play();
        } else {
          video.pause();
        }
      }
    } catch (error) {
      console.warn("Error playing video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-2xl overflow-hidden bg-black group",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full cursor-pointer"
        style={{
          objectFit: isFullscreen ? "contain" : "cover",
        }}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        controls={controls && !showMutedIndicator}
        playsInline
        disablePictureInPicture
        onClick={handleVideoClick}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {(showMutedIndicator || !isPlaying) && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={handleVideoClick}
            disabled={isLoading}
            className="flex flex-col items-center gap-2 px-6 py-4 bg-black/60 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-black/70 hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Play icon */}
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-white text-sm font-medium font-rubik">
              {isMuted ? "Click to play with sound" : "Click to play"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export const VideoPlayer = memo(VideoPlayerComponent);
