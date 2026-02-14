"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RiArrowDownSLine } from "@remixicon/react";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
  navItems?: INavItem[];
}

export default function Navigation({ className, navItems }: NavigationProps) {
  const items = navItems || NAV_ITEMS;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  const handleToggle = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <nav ref={navRef} className={cn("flex items-center gap-1", className)}>
      {items.map((item) => (
        <div key={item.title} className="relative">
          {item.hasDropdown && item.dropdownItems ? (
            <>
              {/* Dropdown Trigger */}
              <button
                onClick={() => handleToggle(item.title)}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium font-rubik transition-colors",
                  activeDropdown === item.title
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-gray-50",
                )}
              >
                {item.title}
                <RiArrowDownSLine
                  className={cn(
                    "size-4 transition-transform duration-200",
                    activeDropdown === item.title && "rotate-180",
                  )}
                />
              </button>

              {/* Dropdown Panel */}
              {activeDropdown === item.title && (
                <div className="absolute top-full left-0 mt-2 min-w-[220px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.dropdownItems.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center px-4 py-2.5 text-sm font-rubik text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Regular Link */
            <Link
              href={item.href}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium font-rubik text-foreground hover:text-primary hover:bg-gray-50 transition-colors"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
