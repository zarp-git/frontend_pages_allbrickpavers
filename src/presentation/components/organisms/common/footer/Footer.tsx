"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiMapPinLine,
  RiTimeLine,
  RiPhoneLine,
  RiStarLine,
} from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CurrentYear from "@/presentation/components/atoms/CurrentYear";
import {
  FOOTER_COMPANY_INFO,
  FOOTER_LOCATIONS,
  FOOTER_COMPANY_LINKS,
  FOOTER_SERVICES,
  FOOTER_LEGAL_LINKS,
} from "@/constants/footer";
import { SOCIAL_LINKS } from "@/constants";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";

export type FooterVariant = "default" | "simplified";

interface FooterProps {
  variant?: FooterVariant;
  navLinks?: { label: string; href: string }[];
}

const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=99+6th+St+SW+Ste+109,+Winter+Haven+FL+33880&t=&z=14&ie=UTF8&iwloc=&output=embed";

export default function Footer({ variant = "default" }: FooterProps) {
  if (variant === "simplified") {
    return (
      <footer className="w-full bg-black border-t border-gray-900">
        <div className="container mx-auto px-6 md:px-28 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm md:text-base font-normal font-rubik leading-5">
            AllBrick Pavers &copy; Copyright <CurrentYear /> - All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.zarpstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <span className="text-gray-500 text-sm md:text-base font-normal font-rubik underline leading-5">
                Developed and Maintained by
              </span>

              <Image
                src="/images/brands/zarp-logomark.svg"
                alt="Zarp Studio"
                width={83}
                height={25}
                className="h-6 w-auto"
              />
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full">
      {/* ── Main Footer Section ── */}
      <div className="bg-white px-6 md:px-14 lg:px-28 py-10 lg:py-16 flex flex-col items-center gap-8 lg:gap-12">
        <div className="w-full max-w-[1216px] flex flex-col items-center gap-8">
          {/* ── Top Card (bordered) ── */}
          <div className="w-full rounded-[10px] border border-secondary overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column · Business Info */}
              <div className="flex-1 px-8 lg:px-14 py-10 lg:py-16 border-b lg:border-b-0 lg:border-r border-secondary">
                <div className="flex flex-col gap-6">
                  <CompanyLogo size="xl" />

                  <p className="text-gray-700 text-base font-normal font-rubik leading-6">
                    {FOOTER_COMPANY_INFO.tagline}
                  </p>

                  <address
                    className="flex flex-col gap-3 not-italic"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <div className="flex items-center gap-2.5">
                      <RiMapPinLine
                        className="w-5 h-5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-gray-700 text-lg font-bold font-hanken uppercase leading-4 tracking-tight">
                        {FOOTER_COMPANY_INFO.address.label}
                      </span>
                    </div>
                    <p
                      className="text-gray-700 text-sm font-normal font-rubik leading-5"
                      itemProp="streetAddress"
                    >
                      {FOOTER_COMPANY_INFO.address.street}
                    </p>
                  </address>
                </div>
              </div>

              {/* Right Column · Contact & Map */}
              <div className="flex-1 px-8 lg:px-14 py-10 lg:py-16 flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12">
                {/* Contact Us */}
                <div className="flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-bold font-hanken uppercase leading-4 tracking-tight">
                      CONTACT US NOW
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>

                  <div className="w-56 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <RiTimeLine className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-gray-700 text-xs font-rubik">
                        <span className="font-medium">FROM MON TO SAT</span>
                        <span className="font-bold"> : </span>
                        <span className="font-normal">9AM - 5PM</span>
                      </p>
                    </div>

                    <Link
                      href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}
                      className="text-neutral-600 text-2xl font-semibold font-rubik leading-5 hover:text-primary transition-colors"
                    >
                      {FOOTER_COMPANY_INFO.contact.phoneDisplay}
                    </Link>
                  </div>

                  <Button
                    variant="brick"
                    size="lg"
                    className="w-full h-10 px-5 py-4 rounded-lg flex justify-between items-center"
                    asChild
                  >
                    <Link href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}>
                      <span className="uppercase">CALL US NOW</span>
                      <RiPhoneLine className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                {/* Serving Central Florida · Map */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-800 text-lg font-bold font-hanken uppercase leading-4 tracking-tight">
                      Serving Central Florida
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>

                  <iframe
                    src={GOOGLE_MAPS_EMBED_URL}
                    className="w-full md:w-72 h-44 rounded-[10px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AllBrick Pavers location on Google Maps"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Section · Navigation Links ── */}
          <div className="w-full px-0 lg:px-14 flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
            {/* Link Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
              {/* Company */}
              <FooterLinkColumn title="COMPANY" links={FOOTER_COMPANY_LINKS} />

              {/* Locations */}
              <FooterLinkColumn title="LOCATIONS" links={FOOTER_LOCATIONS} />

              {/* Services */}
              <FooterLinkColumn title="SERVICES" links={FOOTER_SERVICES} />

              {/* Legal */}
              <FooterLinkColumn title="LEGAL" links={FOOTER_LEGAL_LINKS} />
            </div>

            {/* Find Us On */}
            <div className="w-full lg:w-60 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-gray-800 text-lg font-bold font-hanken uppercase leading-4 tracking-tight">
                  FIND US ON
                </h3>
                <div className="w-10 h-0.5 bg-primary rounded-lg" />
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-6">
                <Link
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="transition-transform hover:scale-110"
                >
                  <Image
                    src="/images/brands/instagram-icon.svg"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
                <Link
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="transition-transform hover:scale-110"
                >
                  <Image
                    src="/images/brands/facebook-icon.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </Link>
                <Link
                  href={SOCIAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Find us on Google Maps"
                  className="transition-transform hover:scale-110"
                >
                  <Image
                    src="/images/brands/google-maps-icon.svg"
                    alt="Google Maps"
                    width={28}
                    height={40}
                    className="w-7 h-10"
                  />
                </Link>
              </div>

              {/* Leave a Review */}
              <Button
                variant="default"
                size="lg"
                className="w-full h-10 px-5 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-start items-center gap-4"
                asChild
              >
                <Link
                  href={SOCIAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="uppercase text-white text-base font-medium font-rubik">
                    LEAVE US A REVIEW
                  </span>
                  <RiStarLine className="w-5 h-5 text-white" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="w-full px-6 md:px-14 lg:px-28 py-6 lg:py-8 bg-black border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm md:text-base font-normal font-rubik leading-5">
          AllBrick Pavers &copy; Copyright <CurrentYear /> - All Rights
          Reserved.
        </p>
        <div className="flex-1 flex justify-end items-center gap-4">
          <span className="text-gray-500 text-sm md:text-base font-normal font-rubik underline leading-5">
            Developed and Maintained by
          </span>
          <Link
            href="https://www.zarpstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/brands/zarp-logomark.svg"
              alt="Zarp Studio"
              width={83}
              height={25}
              className="h-6 w-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ── Reusable footer link column ── */
interface FooterLinkColumnProps {
  title: string;
  links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}

function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-800 text-lg font-bold font-hanken uppercase leading-4 tracking-tight">
          {title}
        </h3>
        <div className="w-10 h-0.5 bg-primary rounded-lg" />
      </div>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
