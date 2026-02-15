"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/presentation/components/atoms/ui/button";
import { RiPhoneLine } from "@remixicon/react";
import { useLeadModal } from "@/hooks/use-lead-modal";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CtaSection() {
  const { openModal } = useLeadModal();

  return (
    <section id="cta" className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="section-container">
        {/* ── Card wrapper (relative for the absolute image) ── */}
        <div className="relative">
          {/* ── Dark card with texture ── */}
          <div
            className="relative rounded-[20px] px-8 md:px-16 py-16 md:py-20 flex flex-col justify-center items-start gap-8 overflow-hidden border border-zinc-500/20"
            style={{
              boxShadow:
                "0px 4px 9px 0px rgba(0,0,0,0.05), 0px 17px 17px 0px rgba(0,0,0,0.04), 0px 37px 22px 0px rgba(0,0,0,0.03), 0px 67px 27px 0px rgba(0,0,0,0.01)",
            }}
          >
            {/* Background texture layer */}
            <Image
              src="/images/pavers-pattern-texture.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
              aria-hidden="true"
              priority={false}
            />

       

            {/* ── Text content ── */}
            <div className="relative z-10 max-w-xl lg:max-w-[677px]">
              <h2 className="text-white text-2xl md:text-3xl font-semibold font-rubik leading-tight md:leading-10">
                Want to evaluate a project? <br className="hidden md:block" />
                <span className="font-normal">
                  Contact one of our tenants
                  <br />
                  for a free consultation
                </span>
              </h2>
            </div>

            {/* ── CTA Button ── */}
            <Button
              variant="brick-outline"
              size="lg"
              onClick={openModal}
              className="relative z-10 h-12 px-8 py-4 rounded-lg border-2 border-white bg-transparent text-white hover:bg-white/10 inline-flex justify-start items-center gap-4 text-base font-medium font-rubik uppercase"
            >
              book a free consultation
              <RiPhoneLine className="size-5" />
            </Button>
          </div>

          {/* ── Absolute image (right side) ── */}
          <div className="hidden lg:block absolute right-6 xl:right-12 -top-8 bottom-0 w-80 xl:w-96">
            <div className="relative h-108 w-full">
              <Image
                src="/images/sections-images/cta-section-placing-a-paver.jpg"
                alt="Placing a paver brick during installation"
                fill
                sizes="(max-width: 1024px) 0px, 384px"
                className="object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
