import type { INavItem } from "@/types/header";

/**
 * Navigation Items - Single Source of Truth (SSOT)
 * 
 * This constant defines all navigation items used across the application.
 * Used by both desktop Navigation and MobileMenu components.
 */
export const NAV_ITEMS: INavItem[] = [
  { title: "Company", href: "/company" },
  { title: "Locations", href: "/locations", hasDropdown: true },
  { title: "Services", href: "/services", hasDropdown: true },
  { title: "Gallery", href: "/gallery" },
  { title: "Learning Center", href: "/learning-center" },
  { title: "Tools", href: "/tools", hasDropdown: true },
];
