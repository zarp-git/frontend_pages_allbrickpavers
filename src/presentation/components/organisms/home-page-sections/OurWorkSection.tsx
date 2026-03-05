"use client";

import React from "react";
import Image from "next/image";
import { VideoPlayer } from "@/presentation/components/molecules/common/VideoPlayer";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

// ---------------------------------------------------------------------------
// Team photos from /public/images/about-us
// ---------------------------------------------------------------------------
const TEAM_PHOTOS = [
  {
    src: "/images/about-us/second-image-book (1).jpeg",
    alt: "Team working on paver installation",
  },
  {
    src: "/images/about-us/second-image-book (2).jpeg",
    alt: "Brick paver craftsmanship",
  },
  {
    src: "/images/about-us/second-image-book (3).jpeg",
    alt: "Precision paver alignment",
  },
  {
    src: "/images/about-us/second-image-book (4).jpeg",
    alt: "Outdoor paver project in progress",
  },
  {
    src: "/images/about-us/second-image-book (5).jpeg",
    alt: "Team collaboration on site",
  },
  {
    src: "/images/about-us/second-image-book (6).jpeg",
    alt: "Paver cutting and finishing",
  },
  {
    src: "/images/about-us/second-image-book (7).jpeg",
    alt: "Quality inspection on site",
  },
  {
    src: "/images/about-us/second-image-book (8).jpeg",
    alt: "Professional paver laying",
  },
  {
    src: "/images/about-us/second-image-book (9).jpeg",
    alt: "Detailed paver work",
  },
  {
    src: "/images/about-us/second-image-book (10).jpeg",
    alt: "Completed paver project",
  },
];

// ---------------------------------------------------------------------------
// Marquee sub-component — single row, all photos
// ---------------------------------------------------------------------------
function PhotoMarquee({ photos }: { photos: typeof TEAM_PHOTOS }) {
  // Duplicate once for seamless loop
  const duplicated = [...photos, ...photos];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-white to-transparent" />

      <div
        className="flex gap-4 sm:gap-5 w-max animate-marquee-left"
        style={{ animationDuration: "50s" }}
      >
        {duplicated.map((photo, idx) => (
          <div
            key={`${photo.src}-${idx}`}
            className="relative h-36 sm:h-44 md:h-56 rounded-xl overflow-hidden shrink-0 group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={400}
              sizes="(max-width: 640px) 192px, (max-width: 768px) 240px, 288px"
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function OurWorkSection() {
  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white overflow-hidden">
      {/* ── Top block: Text + Video side-by-side on desktop ── */}
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 sm:gap-10 lg:gap-14">
          {/* Left — Text content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[#A52024] font-rubik font-semibold text-sm sm:text-base tracking-widest uppercase mb-3">
              Our Team at Work
            </span>
            <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-rubik font-semibold text-gray-900 leading-tight">
              Craftsmanship You Can Trust
            </h2>
            <p className="max-w-xl mx-auto lg:mx-0 mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-rubik">
              Every project is a testament to our dedication, precision, and
              passion. See our crew transforming outdoor spaces across Central
              Florida — one brick at a time.
            </p>
            <div className="mt-6">
              <CtaButton label="CALL US NOW" />
            </div>
          </div>

          {/* Right — Video Player (4:5 portrait) */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-[320px] xl:w-[360px] shrink-0">
            <VideoPlayer
              src="/videos/allbrickpavers_about_us.mp4"
              autoPlay={false}
              loop
              muted
              controls
              className="w-full rounded-2xl shadow-lg aspect-4/5!"
            />
          </div>
        </div>
      </div>

      {/* ── Bottom block: Single marquee row (full-bleed) with edge fades ── */}
      <div className="mt-10 sm:mt-12 md:mt-16">
        <PhotoMarquee photos={TEAM_PHOTOS} />
      </div>
    </section>
  );
}
