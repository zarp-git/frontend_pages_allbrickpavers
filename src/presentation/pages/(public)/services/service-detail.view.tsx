"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/presentation/components/atoms/ui/button";
import AccordionItem from "@/presentation/components/atoms/ui/accordion-item";
import {
  RiPhoneLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightLine,
  RiTeamLine,
} from "@remixicon/react";
import { SERVICES_DATA, SERVICE_SIDEBAR_INFO } from "@/constants/services";
import { FOOTER_COMPANY_INFO } from "@/constants/footer";
import type {
  ServiceData,
  ServiceFeature,
  ServiceStat,
} from "@/types/service.type";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface ServiceDetailViewProps {
  service: ServiceData;
}

// ===========================================================================
// Root view
// ===========================================================================
export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <main>
      <ServiceHero service={service} />
      <ServiceContentSection service={service} />
      <ServiceFeaturesCarousel features={service.features} />
      <ServiceStatsAndFaqs service={service} />
    </main>
  );
}

// ===========================================================================
// 1 — Hero Banner
// ===========================================================================
function ServiceHero({ service }: { service: ServiceData }) {
  return (
    <section
      id="service-hero"
      className="relative min-h-[420px] lg:min-h-[480px] flex flex-col justify-end overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={service.heroImage}
        alt={service.title}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-radial-[at_76%_27%] from-black/10 to-black/80" />

      {/* Content */}
      <div className="relative z-10 section-container py-16 lg:py-24">
        <p className="text-gray-300 text-sm md:text-base font-rubik uppercase tracking-[3px] mb-2">
          {service.heroSubtitle}
        </p>

        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-hanken uppercase leading-tight">
          {service.title}
        </h1>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mt-4 text-sm"
        >
          <Link
            href="/"
            className="text-neutral-400 hover:text-white transition-colors font-rubik"
          >
            AllBrick Pavers
          </Link>
          <RiArrowRightLine className="size-4 text-secondary" />
          <Link
            href="/#paver-services"
            className="text-neutral-400 hover:text-white transition-colors font-rubik"
          >
            Services
          </Link>
          <RiArrowRightLine className="size-4 text-secondary" />
          <span className="text-white font-rubik">
            {service.breadcrumbLabel}
          </span>
        </nav>
      </div>
    </section>
  );
}

// ===========================================================================
// 2 — Content Section (two-column: gallery + text | sidebar)
// ===========================================================================
function ServiceContentSection({ service }: { service: ServiceData }) {
  return (
    <section id="service-content" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* ── Left column: Gallery + Text ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <ServiceGallery
            images={service.galleryImages}
            title={service.title}
          />
          <ServiceTextContent service={service} />
        </div>

        {/* ── Right column: Sidebar ── */}
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-8">
          <ServiceNavSidebar currentSlug={service.slug} />
          <WhoWeAreCard />
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 2a — Image Gallery (carousel)
// ===========================================================================
function ServiceGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)),
    [images.length],
  );

  const next = useCallback(
    () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)),
    [images.length],
  );

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden group">
      {/* Current image */}
      <Image
        src={images[current]}
        alt={`${title} gallery image ${current + 1}`}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-opacity duration-500"
      />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          >
            <RiArrowLeftSLine className="size-6 text-gray-700" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          >
            <RiArrowRightSLine className="size-6 text-gray-700" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={cn(
                  "size-2.5 rounded-full transition-all duration-300",
                  idx === current
                    ? "bg-white scale-110 shadow-sm"
                    : "bg-white/50 hover:bg-white/75",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ===========================================================================
// 2b — Text content
// ===========================================================================
function ServiceTextContent({ service }: { service: ServiceData }) {
  return (
    <article className="flex flex-col gap-4">
      <h2 className="text-gray-800 text-xl md:text-2xl font-bold font-hanken leading-8">
        {service.content.heading}
      </h2>
      {service.content.paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-gray-700 text-base font-normal font-rubik leading-7"
        >
          {p}
        </p>
      ))}
    </article>
  );
}

// ===========================================================================
// 2c — Service Navigation Sidebar
// ===========================================================================
function ServiceNavSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="flex flex-col gap-3" aria-label="Services navigation">
      {SERVICES_DATA.map((s) => {
        const isActive = s.slug === currentSlug;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className={cn(
              "w-full px-4 py-3.5 rounded-lg text-center text-base font-semibold font-rubik uppercase tracking-[2px] transition-all duration-200",
              isActive
                ? "bg-primary text-white shadow-md"
                : "bg-transparent border border-secondary text-secondary hover:bg-secondary/5",
            )}
          >
            {s.title}
          </Link>
        );
      })}

      {/* Contact US button */}
      <Link
        href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}
        className="w-full px-4 py-3.5 bg-secondary rounded-lg text-center text-white text-base font-semibold font-rubik uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors"
      >
        <RiPhoneLine className="size-4" />
        Contact Us
      </Link>
    </nav>
  );
}

// ===========================================================================
// 2d — Who We Are card
// ===========================================================================
function WhoWeAreCard() {
  return (
    <div className="p-6 bg-primary rounded-lg flex flex-col items-center gap-4 text-center">
      <div className="size-16 rounded-full bg-white/10 flex items-center justify-center">
        <RiTeamLine className="size-8 text-white" />
      </div>

      <h3 className="text-white text-xl font-semibold font-hanken uppercase">
        {SERVICE_SIDEBAR_INFO.title}
      </h3>

      <p className="text-neutral-100 text-base font-normal font-rubik leading-7">
        {SERVICE_SIDEBAR_INFO.description}
      </p>
    </div>
  );
}

// ===========================================================================
// 3 — Features Carousel
// ===========================================================================
function ServiceFeaturesCarousel({ features }: { features: ServiceFeature[] }) {
  return (
    <section id="service-features" className="py-10 lg:py-14 bg-gray-50">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: ServiceFeature }) {
  return (
    <div className="bg-neutral-100 rounded-lg py-6 px-5 flex flex-col items-center text-center gap-2 transition-shadow duration-300 hover:shadow-md">
      <h3 className="text-gray-900 text-lg font-semibold font-hanken uppercase leading-5">
        {feature.title}
      </h3>
      <p className="text-gray-700 text-sm font-rubik leading-6">
        <span className="font-bold">{feature.subtitle}</span>
        <br />
        {feature.description}
      </p>
    </div>
  );
}

// ===========================================================================
// 4 — Stats + Image + FAQ Section
// ===========================================================================
function ServiceStatsAndFaqs({ service }: { service: ServiceData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="service-faqs" className="py-14 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* ── Left: Image + Stats ── */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-8 items-center lg:items-start shrink-0">
            {/* Gallery feature image */}
            <div className="relative w-64 h-96 rounded-xl overflow-hidden shrink-0">
              <Image
                src={service.galleryImages[0] || service.heroImage}
                alt={`${service.title} showcase`}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-6 items-center">
              {service.stats.map((stat) => (
                <StatCircle key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* ── Right: FAQ ── */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl lg:text-3xl font-semibold font-hanken text-gray-800 uppercase mb-6">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                variant="brick"
                size="lg"
                className="h-12 px-8 py-4 rounded-lg flex items-center gap-4"
                asChild
              >
                <Link href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}>
                  <span className="uppercase text-base font-medium">
                    get a free quote
                  </span>
                  <RiPhoneLine className="size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// Stat circle
// ===========================================================================
function StatCircle({ stat }: { stat: ServiceStat }) {
  const percentage = parseInt(stat.value, 10);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Circular progress */}
      <div className="relative size-28">
        <svg className="size-28 -rotate-90" viewBox="0 0 120 120">
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
          />
        </svg>
        {/* Value label */}
        <span className="absolute inset-0 flex items-center justify-center text-gray-800 text-2xl font-semibold font-rubik">
          {stat.value}
        </span>
      </div>
      <span className="text-gray-900 text-sm font-bold font-hanken uppercase text-center">
        {stat.label}
      </span>
    </div>
  );
}
