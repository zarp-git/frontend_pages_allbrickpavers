import Link from "next/link";
import { RiArrowDownSLine } from "@remixicon/react";

const navItems = [
  { label: "Company", href: "/company" },
  { label: "Locations", href: "/locations", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Learning Center", href: "/learning-center" },
  { label: "Tools", href: "/tools", hasDropdown: true },
];

export default function Navigation({ className }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {navItems.map((item) => (
        <div key={item.label} className="relative group flex items-center gap-1 cursor-pointer">
          <Link
            href={item.href}
            className="text-foreground font-rubik text-base font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            {item.label}
            {item.hasDropdown && (
              <RiArrowDownSLine className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
}
