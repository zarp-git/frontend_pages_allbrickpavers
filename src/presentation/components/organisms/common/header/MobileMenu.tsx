"use client";

import { useState } from "react";
import {
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiPhoneLine,
} from "@remixicon/react";
import Link from "next/link";
import { Button } from "@/presentation/components/atoms/ui/button";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/common/constants";

interface MobileMenuProps {
  navItems?: INavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const items = navItems || NAV_ITEMS;

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
      >
        <RiMenuLine className="size-8" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-6 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <span className="font-hanken text-xl font-bold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:bg-accent rounded-md"
            >
              <RiCloseLine className="size-8" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.title}
                className="border-b border-border/40 pb-4 last:border-0"
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-lg font-medium font-rubik"
                >
                  {item.title}
                  {item.hasDropdown && (
                    <RiArrowDownSLine className="size-5 text-muted-foreground" />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-auto pt-8">
            <Button
              variant="brick-outline"
              size="lg"
              className="w-full text-base font-bold"
              onClick={() => setIsOpen(false)}
            >
              BOOK A FREE CONSULTATION
            </Button>
            <Button
              variant="brick"
              size="lg"
              className="w-full text-base font-bold flex items-center justify-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              CONTACT US <RiPhoneLine className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
