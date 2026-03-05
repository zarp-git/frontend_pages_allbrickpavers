import type {
  GalleryItem,
  GalleryCategoryTab,
  GalleryCategory,
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
// Helpers
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

const PATIO_TITLES = [
  "Elegant Patio Transformation",
  "Contemporary Patio Design",
  "Modern Outdoor Living Space",
  "Classic Brick Patio Installation",
  "Premium Patio with Custom Layout",
  "Spacious Backyard Patio",
  "Multi-Level Patio Design",
  "Herringbone Pattern Patio",
  "Intimate Patio Space",
  "Curved Patio Edge Detail",
  "Outdoor Entertaining Patio",
  "Full Patio Renovation",
];

const DRIVEWAY_TITLES = [
  "Wide Paver Driveway",
  "Modern Driveway Installation",
  "Herringbone Driveway Pattern",
  "Custom Driveway Design",
  "Three-Car Driveway",
  "Classic Entryway Upgrade",
  "Cobblestone Driveway",
];

const POOL_DECK_TITLES = [
  "Pool Deck Renovation",
  "Travertine Pool Surround",
  "Modern Pool Deck Design",
  "Resort-Style Pool Area",
  "Elegant Pool Deck Pavers",
  "Cool-Touch Pool Deck",
  "Curved Pool Deck Layout",
];

const FIREPIT_TITLES = [
  "Custom Fire Pit Area",
  "Round Fire Pit with Seating",
  "Backyard Fire Pit Lounge",
  "Paver Fire Pit Design",
  "Rustic Fire Pit Circle",
  "Modern Gas Fire Pit",
];

// ---------------------------------------------------------------------------
// Builder — maps an entire image array into GalleryItem[]
// ---------------------------------------------------------------------------

function buildItems(
  images: readonly string[],
  category: Exclude<GalleryCategory, "all">,
  titles: string[],
): GalleryItem[] {
  return images.map((src, i) => ({
    id: `${category}-${String(i + 1).padStart(2, "0")}`,
    title: titles[i % titles.length],
    src,
    category,
    location: city(i),
    ...(i === 0 && { featured: true }),
  }));
}

// ---------------------------------------------------------------------------
// Gallery items — SSOT (auto-mapped from service-images)
// ---------------------------------------------------------------------------

export const GALLERY_ITEMS: GalleryItem[] = [
  ...buildItems(PATIO_IMAGES, "patios", PATIO_TITLES),
  ...buildItems(DRIVEWAY_IMAGES, "driveways", DRIVEWAY_TITLES),
  ...buildItems(POOL_DECK_IMAGES, "pool-decks", POOL_DECK_TITLES),
  ...buildItems(FIREPIT_IMAGES, "fire-pits", FIREPIT_TITLES),
];

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const GALLERY_SEO = {
  metaTitle: "Project Gallery | AllBrick Pavers — Central Florida Paver Work",
  metaDescription:
    "Browse our gallery of completed paver projects across Central Florida. Patios, driveways, pool decks, fire pits, and walkways — see the AllBrick Pavers difference.",
} as const;
