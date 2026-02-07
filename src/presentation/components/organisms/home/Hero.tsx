"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ComparisonSlider } from "@/presentation/components/ui/comparison-slider";
import { Button } from "@/presentation/components/ui/button";
import {
  RiArrowDownLine,
  RiPhoneLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    before: "/images/hero/before1.png",
    after: "/images/hero/after1.png",
    label: "Patio Pavers",
    id: 1,
  },
  {
    before: "/images/hero/before1.png",
    after: "/images/hero/after1.png",
    label: "Pool Deck",
    id: 2,
  },
  {
    before: "/images/hero/before1.png",
    after: "/images/hero/after1.png",
    label: "Driveways",
    id: 3,
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlay]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Pause autoplay on interaction
  const pauseAutoPlay = () => setIsAutoPlay(false);
  const resumeAutoPlay = () => setIsAutoPlay(true);

  // Helper to get visual position relative to active index (-1, 0, 1)
  const getSlideStyles = (index: number) => {
    const total = SLIDES.length;
    // Calculate distance accounting for wrap-around
    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) offset -= total;

    // We only really care about -1 (Left), 0 (Center), and 1 (Right)
    const isCenter = offset === 0;
    const isLeft = offset === -1 || offset === total - 1;
    const isRight = offset === 1 || offset === -(total - 1);

    if (isCenter) {
      return {
        zIndex: 20,
        opacity: 1,
        // Active size: 100% of the parent (which is max-w-[534px])
        width: "100%",
        height: "100%",
        transform: "translateX(0)",
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
      };
    } else if (isLeft) {
      return {
        zIndex: 10,
        opacity: 0.6,
        // Target: 295px width, 228px height, but flexible for mobile
        width: "295px",
        maxWidth: "55vw", // Responsive constraint
        height: "228px",
        maxHeight: "45vw", // Proportional height constraint
        top: "50%",
        left: "50%",
        transform: "translate(-135%, -50%)",
        filter: "blur(1px)",
        pointerEvents: "none" as const,
      };
    } else {
      // Right
      return {
        zIndex: 10,
        opacity: 0.6,
        width: "295px",
        maxWidth: "55vw",
        height: "228px",
        maxHeight: "45vw",
        top: "50%",
        left: "50%",
        transform: "translate(35%, -50%)",
        filter: "blur(1px)",
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <section className="relative w-full pt-10 pb-20 overflow-hidden bg-hero-radial">
      {/* Background radial gradient simulation - Removed inline style in favor of class */}

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-[0px]">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start gap-6 relative z-30">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
            <span className="bg-[#dcfce7] text-[#064e3b] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              News
            </span>
            <span className="text-gray-600 text-xs font-medium pr-2">
              OUR WEBSITE WITH A FRESH NEW LOOK
            </span>
          </div>

          {/* Heading */}
          <h1 className="h1 text-gray-900 text-left">
            The Best Specialists for{" "}
            <span className="text-primary block">PAVERS INSTALLATION</span>
            in <span className="text-gray-900">HAINES CITY</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 font-rubik text-base md:text-lg leading-relaxed max-w-[480px]">
            Transforming ordinary outdoor spaces into stunning landscapes that
            last a lifetime. Serving Central Florida homeowners since 2008.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="brick"
              size="lg"
              className="h-14 px-8 text-base font-bold tracking-wide flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              CONTACT US NOW <RiPhoneLine className="size-5" />
            </Button>
          </div>
        </div>

        {/* 3D Card Carousel Area */}
        <div
          className="flex-1 w-full max-w-[800px] h-[450px] relative flex items-center justify-center perspective-1000"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation Buttons (Outside the transform flow) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:-left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 md:hover:-translate-x-1 active:scale-95 transition-all cursor-pointer text-foreground border border-gray-100"
            aria-label="Previous slide"
          >
            <RiArrowLeftSLine className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:-right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 md:hover:translate-x-1 active:scale-95 transition-all cursor-pointer text-foreground border border-gray-100"
            aria-label="Next slide"
          >
            <RiArrowRightSLine className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-[534px] h-[400px] flex items-center justify-center">
            {SLIDES.map((slide, index) => {
              const style = getSlideStyles(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={slide.id}
                  className={cn(
                    "absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out origin-center",
                    // Mobile optimization: Side cards hidden or smaller on very small screens?
                    // We handle sizing via style prop, but we can add classes for responsiveness if needed.
                  )}
                  style={style}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl bg-white transition-all duration-500",
                      isActive
                        ? "border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                        : "border-0 opacity-50 contrast-75 brightness-90 grayscale-[0.3]",
                    )}
                  >
                    <ComparisonSlider
                      beforeImage={slide.before}
                      afterImage={slide.after}
                      beforeLabel="Existing"
                      afterLabel="New Pavers"
                      className="w-full h-full"
                      initialPosition={50}
                      // Disable interaction on non-active slides
                      {...(!isActive && {
                        className: "pointer-events-none w-full h-full",
                      })}
                    />

                    {/* Floating Label - Only on active */}
                    <div
                      className={cn(
                        "absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-500",
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4",
                      )}
                    >
                      <div className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-6 py-2.5 rounded-full shadow-lg uppercase tracking-wider border border-white/50">
                        {slide.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-400 font-rubik text-sm">Scroll over</span>
        <RiArrowDownLine className="text-gray-400 size-5" />
      </div>
    </section>
  );
}
