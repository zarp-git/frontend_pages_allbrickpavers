"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMapPinLine, RiTimeLine, RiPhoneLine } from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CurrentYear from "@/presentation/components/atoms/CurrentYear";
import {
  FOOTER_COMPANY_INFO,
  FOOTER_LOCATIONS,
  FOOTER_COMPANY_LINKS,
  FOOTER_SERVICES,
  FOOTER_LEGAL_LINKS,
} from "@/constants/footer";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";

export type FooterVariant = "default" | "simplified";

interface FooterProps {
  variant?: FooterVariant;
  navLinks?: { label: string; href: string }[];
}

export default function Footer({ variant = "default" }: FooterProps) {
  if (variant === "simplified") {
    return (
      <footer className="w-full bg-black/50 border-t border-gray-900">
        <div className="container mx-auto px-28 py-8 flex justify-between items-center">
          <p className="text-gray-400 text-base font-normal font-rubik leading-5">
            AllBrick Pavers © Copyright <CurrentYear /> - All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-base font-normal font-rubik underline leading-5">
              Developed and Maintained by
            </span>
            <div className="flex items-center gap-1">
              <span className="text-stone-100 text-2xl font-semibold font-['Familjen_Grotesk']">
                Zarp
              </span>
              <div className="w-1 pt-[3.20px] flex flex-col gap-px">
                <div className="w-1 h-0.5 bg-stone-100" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full">
      {/* Main Footer Section */}
      <div className="bg-white px-28 py-16 flex flex-col justify-center items-center gap-12">
        <div className="w-full flex flex-col justify-start items-center gap-8">
          {/* Top Section with Business Info and Contact */}
          <div className="w-full rounded-[10px] border border-secondary flex justify-start items-start gap-12 overflow-hidden">
            {/* Left Column - Business Info */}
            <div className="flex-1 h-80 px-14 py-16 border-r border-secondary flex justify-start items-start gap-12">
              <div className="flex-1 flex flex-col justify-start items-start gap-6">
                {/* Company Logo */}
                <CompanyLogo size="xl" />

                {/* Tagline */}
                <p className="text-gray-700 text-base font-normal font-rubik leading-6">
                  {FOOTER_COMPANY_INFO.tagline}
                </p>

                {/* Address */}
                {/* Address */}
                <address
                  className="w-full flex flex-col justify-start items-start gap-3 not-italic"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <div className="w-full flex justify-start items-center gap-2.5">
                    <RiMapPinLine
                      className="w-5 h-5 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-gray-700 text-base font-medium font-rubik">
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

            {/* Right Column - Contact & Locations */}
            <div className="w-[681px] px-14 py-16 flex justify-between items-center">
              {/* Contact Us */}
              <div className="h-56 flex flex-col justify-between items-start">
                <div className="flex flex-col justify-start items-start gap-8">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                      CONTACT US NOW
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>

                  <div className="w-56 flex flex-col justify-center items-start gap-2.5">
                    <div className="w-full flex justify-start items-center gap-2.5">
                      <RiTimeLine className="w-5 h-5 text-primary" />
                      <p className="text-gray-700 text-xs font-rubik">
                        <span className="font-medium">FROM MON TO SAT</span>
                        <span className="font-bold"> : </span>
                        <span className="font-normal">9AM - 5PM</span>
                      </p>
                    </div>

                    <Link
                      href={`tel:${FOOTER_COMPANY_INFO.contact.phone}`}
                      className="text-neutral-600 text-2xl font-semibold font-['Poppins'] leading-5 hover:text-primary transition-colors"
                    >
                      {FOOTER_COMPANY_INFO.contact.phoneDisplay}
                    </Link>
                  </div>
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

              {/* Serving Central Florida */}
              <div className="max-w-[550px] flex flex-col justify-start items-start gap-6">
                <div className="flex flex-col justify-start items-start gap-2">
                  <h3 className="text-gray-800 text-xl font-medium font-rubik uppercase leading-7">
                    Serving central florida
                  </h3>
                  <div className="w-10 h-0.5 bg-primary rounded-lg" />
                </div>

                <div className="flex justify-start items-start gap-8">
                  <div className="flex flex-col gap-0">
                    {FOOTER_LOCATIONS.slice(0, 3).map((location) => (
                      <Link
                        key={location.href}
                        href={location.href}
                        className="text-gray-600 text-base font-medium font-['Poppins'] underline leading-8 hover:text-primary transition-colors"
                      >
                        {location.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-0">
                    {FOOTER_LOCATIONS.slice(3).map((location) => (
                      <Link
                        key={location.href}
                        href={location.href}
                        className="text-gray-600 text-base font-medium font-['Poppins'] underline leading-8 hover:text-primary transition-colors"
                      >
                        {location.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <Button
                  variant="brick-outline"
                  size="default"
                  className="h-10 px-4 py-3 rounded-lg"
                  asChild
                >
                  <Link href="/contact">
                    <span className="uppercase text-sm">
                      book a free consultation
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Navigation Links */}
          <div className="w-[1216px] px-14 flex justify-center items-center gap-20">
            <div className="flex-1 flex justify-between items-center">
              {/* Links Group */}
              <div className="flex justify-start items-start gap-16">
                {/* Company Column */}
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                      COMPANY
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>
                  {FOOTER_COMPANY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Locations Column */}
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                      LOCATIONS
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>
                  {FOOTER_LOCATIONS.slice(0, 3).map((location) => (
                    <Link
                      key={location.href}
                      href={location.href}
                      className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors"
                    >
                      {location.label}
                    </Link>
                  ))}
                </div>

                {/* Services Column */}
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                      SERVICES
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>
                  {FOOTER_SERVICES.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>

                {/* Legal Column */}
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                      LEGAL
                    </h3>
                    <div className="w-10 h-0.5 bg-primary rounded-lg" />
                  </div>
                  {FOOTER_LEGAL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 text-base font-normal font-rubik hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Follow Us Column */}
              <div className="w-60 flex flex-col justify-start items-start gap-4">
                <div className="flex flex-col justify-center items-start gap-2">
                  <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
                    FOLLOW US
                  </h3>
                  <div className="w-10 h-0.5 bg-primary rounded-lg" />
                </div>
                <div className="flex flex-col justify-start items-center gap-4">
                  <Image
                    src="/badge-certification.png"
                    alt="Certification Badge"
                    width={179}
                    height={65}
                    className="w-44 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* Zarp Footer */}
      <div className="w-full px-28 py-8 bg-black/50 border-t border-gray-900 flex justify-between items-center">
        <p className="text-gray-400 text-base font-normal font-rubik leading-5">
          AllBrick Pavers © Copyright <CurrentYear /> - All Rights Reserved.
        </p>
        <div className="flex-1 flex justify-end items-center gap-4">
          <span className="text-gray-500 text-base font-normal font-rubik underline leading-5">
            Developed and Maintained by
          </span>
          <div className="w-20 h-6 flex justify-center items-start">
            <div className="w-20 h-6 flex justify-start items-center gap-1">
              <span className="text-stone-100 text-2xl font-semibold font-['Familjen_Grotesk']">
                Zarp
              </span>
            </div>
            <div className="w-1 pt-[3.20px] flex flex-col justify-start items-start gap-px">
              <div className="w-1 h-0.5 bg-stone-100" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
