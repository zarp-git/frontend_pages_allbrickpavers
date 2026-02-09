import Link from "next/link";
import { RiArrowDownSLine } from "@remixicon/react";
import type { INavItem } from "@/types/header";
import { NAV_ITEMS } from "@/constants";

interface NavigationProps {
  className?: string;
  navItems?: INavItem[];
}

export default function Navigation({ className, navItems }: NavigationProps) {
  const items = navItems || NAV_ITEMS;
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="relative group flex items-center gap-1 cursor-pointer"
        >
          <Link
            href={item.href}
            className="text-foreground font-rubik text-base font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            {item.title}
            {item.hasDropdown && (
              <RiArrowDownSLine className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
}
