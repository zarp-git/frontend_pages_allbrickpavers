"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Company", href: "/company" },
  { label: "Locations", href: "/locations", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Learning Center", href: "/learning-center" },
  { label: "Tools", href: "/tools", hasDropdown: true },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-foreground hover:bg-accent rounded-md transition-colors"
      >
        <Menu className="size-8" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm p-6 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <span className="font-clash text-xl font-bold">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:bg-accent rounded-md"
            >
              <X className="size-8" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-border/40 pb-4 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-lg font-medium font-rubik"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="size-5 text-muted-foreground" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-auto pt-8">
            <Button variant="brick-outline" size="lg" className="w-full text-base font-bold" onClick={() => setIsOpen(false)}>
              BOOK A FREE CONSULTATION
            </Button>
            <Button variant="brick" size="lg" className="w-full text-base font-bold flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
              CONTACT US <Phone className="size-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
