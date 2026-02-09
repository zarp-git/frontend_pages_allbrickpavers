import React from "react";
import { Button } from "@/presentation/components/atoms/ui/button";
import CompanyLogo from "@/presentation/components/atoms/CompanyLogo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import type {
  INavItem,
  IActionButtons,
  ILanguageOptions,
  HeaderVariant,
} from "@/types/header";

interface HeaderProps {
  navItems?: INavItem[];
  actionButtons?: IActionButtons;
  languageOptions?: ILanguageOptions;
  variant?: HeaderVariant;
}

export default function Header({
  navItems,
  actionButtons,
  languageOptions,
  variant,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-[#fbf8f8]/80 backdrop-blur-md">
      <div className="container mx-auto py-4 h-[90px] flex items-center justify-between">
        {/* Left Side: Logo & Nav */}
        <div className="flex items-center 2xl:gap-10">
          <CompanyLogo />
          <div className="hidden lg:block h-8 w-px bg-border/40 mx-2" />
          <Navigation className="hidden lg:flex" navItems={navItems} />
        </div>

        {/* Right Side: Buttons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-4">
            <Button
              variant="brick-outline"
              className="px-6 h-[44px] font-rubik text-sm font-bold uppercase tracking-wide border-2"
            >
              Book a Free Consultation
            </Button>
            <Button
              variant="brick"
              className="px-6 h-[44px] font-rubik text-sm font-bold uppercase tracking-wide"
            >
              Contact Us
            </Button>
          </div>

          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
