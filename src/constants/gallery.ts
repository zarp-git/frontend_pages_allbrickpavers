import type {
  GalleryItem,
  GalleryCategoryTab,
} from "@/types/gallery.type";
import {
  PATIO_IMAGES,
  DRIVEWAY_IMAGES,
  POOL_DECK_IMAGES,
  FIREPIT_IMAGES,
} from "./service-images";

// ---------------------------------------------------------------------------
// Category filter tabs
// ---------------------------------------------------------------------------

export const GALLERY_CATEGORIES: GalleryCategoryTab[] = [
  { label: "All Projects", value: "all" },
  { label: "Patios", value: "patios" },
  { label: "Driveways", value: "driveways" },
  { label: "Pool Decks", value: "pool-decks" },
  { label: "Fire Pits", value: "fire-pits" },
];

// ---------------------------------------------------------------------------
// Gallery items — SSOT
// ---------------------------------------------------------------------------

const FL_CITIES = [
  "Winter Haven, FL",
  "Lakeland, FL",
  "Auburndale, FL",
  "Haines City, FL",
  "Davenport, FL",
  "Horizon West, FL",
];

function city(i: number) {
  return FL_CITIES[i % FL_CITIES.length];
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Patios ──────────────────────────────────────────────────────────────
  { id: "patio-01", title: "Elegant Patio Transformation", src: PATIO_IMAGES[0], category: "patios", location: city(0), featured: true },
  { id: "patio-02", title: "Contemporary Patio Design", src: PATIO_IMAGES[2], category: "patios", location: city(1) },
  { id: "patio-03", title: "Modern Outdoor Living Space", src: PATIO_IMAGES[4], category: "patios", location: city(2) },
  { id: "patio-04", title: "Classic Brick Patio Installation", src: PATIO_IMAGES[6], category: "patios", location: city(3) },
  { id: "patio-05", title: "Premium Patio with Custom Layout", src: PATIO_IMAGES[8], category: "patios", location: city(4), featured: true },
  { id: "patio-06", title: "Spacious Backyard Patio", src: PATIO_IMAGES[10], category: "patios", location: city(5) },
  { id: "patio-07", title: "Multi-Level Patio Design", src: PATIO_IMAGES[12], category: "patios", location: city(0) },
  { id: "patio-08", title: "Herringbone Pattern Patio", src: PATIO_IMAGES[14], category: "patios", location: city(1), featured: true },
  { id: "patio-09", title: "Intimate Patio Space", src: PATIO_IMAGES[16], category: "patios", location: city(2) },
  { id: "patio-10", title: "Curved Patio Edge Detail", src: PATIO_IMAGES[18], category: "patios", location: city(3) },
  { id: "patio-11", title: "Outdoor Entertaining Patio", src: PATIO_IMAGES[20], category: "patios", location: city(4) },
  { id: "patio-12", title: "Full Patio Renovation", src: PATIO_IMAGES[22], category: "patios", location: city(5) },

  // ── Driveways ───────────────────────────────────────────────────────────
  { id: "driveway-01", title: "Wide Paver Driveway", src: DRIVEWAY_IMAGES[0], category: "driveways", location: city(1), featured: true },
  { id: "driveway-02", title: "Modern Driveway Installation", src: DRIVEWAY_IMAGES[2], category: "driveways", location: city(4) },
  { id: "driveway-03", title: "Herringbone Driveway Pattern", src: DRIVEWAY_IMAGES[4], category: "driveways", location: city(0) },
  { id: "driveway-04", title: "Custom Driveway Design", src: DRIVEWAY_IMAGES[6], category: "driveways", location: city(3) },
  { id: "driveway-05", title: "Three-Car Driveway", src: DRIVEWAY_IMAGES[8], category: "driveways", location: city(2) },

  // ── Pool Decks ──────────────────────────────────────────────────────────
  { id: "pool-deck-01", title: "Pool Deck Renovation", src: POOL_DECK_IMAGES[0], category: "pool-decks", location: city(0), featured: true },
  { id: "pool-deck-02", title: "Travertine Pool Surround", src: POOL_DECK_IMAGES[2], category: "pool-decks", location: city(1) },
  { id: "pool-deck-03", title: "Modern Pool Deck Design", src: POOL_DECK_IMAGES[4], category: "pool-decks", location: city(4) },
  { id: "pool-deck-04", title: "Resort-Style Pool Area", src: POOL_DECK_IMAGES[6], category: "pool-decks", location: city(5) },
  { id: "pool-deck-05", title: "Elegant Pool Deck Pavers", src: POOL_DECK_IMAGES[8], category: "pool-decks", location: city(3) },

  // ── Fire Pits ──────────────────────────────────────────────────────────
  { id: "firepit-01", title: "Custom Fire Pit Area", src: FIREPIT_IMAGES[0], category: "fire-pits", location: city(5), featured: true },
  { id: "firepit-02", title: "Round Fire Pit with Seating", src: FIREPIT_IMAGES[1], category: "fire-pits", location: city(2) },
  { id: "firepit-03", title: "Backyard Fire Pit Lounge", src: FIREPIT_IMAGES[3], category: "fire-pits", location: city(0) },
  { id: "firepit-04", title: "Paver Fire Pit Design", src: FIREPIT_IMAGES[5], category: "fire-pits", location: city(4) },
];

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const GALLERY_SEO = {
  metaTitle: "Project Gallery | AllBrick Pavers — Central Florida Paver Work",
  metaDescription:
    "Browse our gallery of completed paver projects across Central Florida. Patios, driveways, pool decks, fire pits, and walkways — see the AllBrick Pavers difference.",
} as const;
