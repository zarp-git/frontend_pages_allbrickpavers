"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  RiPhoneLine,
  RiArrowRightUpLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

import { Button } from "@/presentation/components/atoms/ui/button";
import StarRating from "@/presentation/components/atoms/ui/StarRating";
import { SOCIAL_LINKS, CONTACT, REVIEWS } from "@/constants";
import type { Review } from "@/constants";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DEFAULT_AVATAR = "/images/avatars/default-avatar-profile-picture.svg";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function FeedbackSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      className="relative py-10 sm:py-14 lg:py-20 bg-white overflow-hidden"
    >
      {/* ── Heading ── */}
      <div className="section-container text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-gray-800 text-2xl md:text-3xl font-black font-hanken uppercase leading-tight tracking-wide">
          What Customers Are Talking About Our Service
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div className="section-container relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          loop
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 24 },
            768: { slidesPerView: 2.3, spaceBetween: 28 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
            1280: { slidesPerView: 3.8, spaceBetween: 32 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="overflow-visible!"
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id} className="h-auto!">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── Navigation Arrows ── */}
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all -ml-4 lg:-ml-6 hidden sm:flex"
        >
          <RiArrowLeftLine className="size-6 text-gray-700" />
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all -mr-4 lg:-mr-6 hidden sm:flex"
        >
          <RiArrowRightLine className="size-6 text-gray-700" />
        </button>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="section-container mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Button
          asChild
          variant="brick"
          size="lg"
          className="h-12 px-8 text-base font-medium rounded-lg"
        >
          <Link href={`${CONTACT.phoneHref}`}>
            Contact Us Now
            <RiPhoneLine className="size-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="brick-outline"
          size="lg"
          className="h-12 px-8 text-base font-medium rounded-lg"
        >
          <Link
            href={SOCIAL_LINKS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read All Reviews
            <RiArrowRightUpLine className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ReviewCard sub-component
// ---------------------------------------------------------------------------
const WORD_LIMIT = 40;

function ReviewCard({ review }: { review: Review }) {
  const hasImages = review.images.length > 0;
  const hasMultipleImages = review.images.length > 1;

  const words = review.text.split(/\s+/);
  const isLong = words.length > WORD_LIMIT;
  const truncated = words.slice(0, WORD_LIMIT).join(" ");

  const [expanded, setExpanded] = useState(false);

  return (
    <article className="w-full h-[480px] p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-start items-start gap-2.5 sm:gap-3">
      {/* ── Project Image(s) with Service Chip ── */}
      {hasImages && (
        <div className="relative self-stretch shrink-0 h-32 sm:h-40 lg:h-48 rounded-md border border-gray-200 overflow-hidden">
          {hasMultipleImages ? (
            <ImageCarousel images={review.images} serviceTag={review.serviceTag} />
          ) : (
            <>
              <Image
                src={review.images[0]}
                alt={`${review.serviceTag} project by AllBrick Pavers`}
                fill
                sizes="320px"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-stone-50/90 backdrop-blur-sm rounded-full border border-gray-200 text-gray-700 text-xs font-medium font-rubik">
                {review.serviceTag}
              </span>
            </>
          )}
        </div>
      )}

      {/* ── Service tag (shown inline when no images) ── */}
      {!hasImages && (
        <span className="shrink-0 px-3 py-1.5 bg-stone-50 rounded-full border border-gray-200 text-gray-700 text-xs font-medium font-rubik">
          {review.serviceTag}
        </span>
      )}

      {/* ── Reviewer Info ── */}
      <div className="self-stretch shrink-0 flex flex-col gap-3.5">
        <div className="self-stretch relative flex items-center gap-4">
          {/* Avatar with Google badge */}
          <div className="relative shrink-0">
            <Image
              src={DEFAULT_AVATAR}
              alt={review.name}
              width={48}
              height={48}
              className="size-12 rounded-full object-cover bg-gray-200"
            />
            <div className="absolute -bottom-0.5 -right-0.5 size-6 p-[5px] bg-white rounded-full border border-neutral-100 flex items-center justify-center">
              <Image
                src="/images/svg/google-icon.svg"
                alt="Google"
                width={16}
                height={17}
                className="size-4"
              />
            </div>
          </div>

          {/* Name & date */}
          <div className="flex-1 flex flex-col gap-[5px]">
            <span className="text-black text-base font-normal font-rubik capitalize leading-4">
              {review.name}
            </span>
            <span className="text-gray-400 text-sm font-normal font-rubik capitalize leading-4">
              {review.daysAgo}
            </span>
          </div>
        </div>

        {/* Stars */}
        <StarRating rating={review.rating} size={20} />
      </div>

      {/* ── Review Text ── */}
      <div className="self-stretch flex-1 min-h-0 overflow-y-auto">
        <p className="text-neutral-600 text-base font-normal font-rubik leading-6">
          {isLong && !expanded ? (
            <>
              {truncated}...{" "}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-primary font-medium hover:underline"
              >
                read more
              </button>
            </>
          ) : (
            review.text
          )}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// ImageCarousel — mini Swiper with bullet pagination inside a ReviewCard
// ---------------------------------------------------------------------------
function ImageCarousel({
  images,
  serviceTag,
}: {
  images: string[];
  serviceTag: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        nested
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={500}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={src} className="relative h-full">
            <Image
              src={src}
              alt={`${serviceTag} project by AllBrick Pavers - photo ${idx + 1}`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Service tag chip */}
      <span className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-stone-50/90 backdrop-blur-sm rounded-full border border-gray-200 text-gray-700 text-xs font-medium font-rubik">
        {serviceTag}
      </span>

      {/* Custom bullet indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-4 h-1.5 bg-white"
                : "size-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}
