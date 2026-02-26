"use client";

import React from "react";
import Image from "next/image";
import { VideoPlayer } from "@/presentation/components/molecules/common/VideoPlayer";

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

// Split photos into two rows for the marquee
const ROW_1 = TEAM_PHOTOS.slice(0, 5);
const ROW_2 = TEAM_PHOTOS.slice(5, 10);

// ---------------------------------------------------------------------------
// Marquee Row sub-component
// ---------------------------------------------------------------------------
function MarqueeRow({
  photos,
  direction = "left",
  speed = 30,
}: {
  photos: typeof TEAM_PHOTOS;
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate for seamless loop
  const duplicated = [...photos, ...photos];

  return (
    <div className="relative overflow-hidden w-full group/marquee">
      <div
        className={`flex gap-3 sm:gap-4 w-max ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated.map((photo, idx) => (
          <div
            key={`${photo.src}-${idx}`}
            className="relative w-36 h-28 sm:w-44 sm:h-32 md:w-52 md:h-36 rounded-xl overflow-hidden shrink-0 group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Subtle overlay on hover */}
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
      <div className="section-container">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <span className="inline-block text-[#A52024] font-rubik font-semibold text-sm sm:text-base tracking-widest uppercase mb-3">
            Our Team at Work
          </span>
          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-rubik font-semibold text-gray-900 leading-tight">
            Craftsmanship You Can Trust
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-rubik">
            Every project is a testament to our dedication, precision, and
            passion. See our crew transforming outdoor spaces across Central
            Florida — one brick at a time.
          </p>
        </div>

        {/* Content: Photos Grid (left) + Video (right) */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Marquee Photo Grid */}
          <div className="lg:flex-1 flex flex-col gap-3 sm:gap-4 justify-center min-w-0">
            <MarqueeRow photos={ROW_1} direction="left" speed={35} />
            <MarqueeRow photos={ROW_2} direction="right" speed={40} />
          </div>

          {/* Right: Video Player (9:16 portrait) */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex items-center justify-center">
            <VideoPlayer
              src="/videos/allbrickpavers_about_us.mp4"
              autoPlay={false}
              loop
              muted
              controls
              className="w-full max-h-[500px] lg:max-h-none rounded-2xl shadow-lg aspect-9/16!"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
