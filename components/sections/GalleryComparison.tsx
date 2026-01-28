import React from "react";
import { ComparisonSlider } from "@/components/ui/comparison-slider";

// Placeholder images - replacing with locally cached assets from previous steps or generic ones
const BEFORE_IMAGE = "http://localhost:3845/assets/3de3888eebb7dee7f13602b7fa7e64371fda41e9.png"; // Using one of the paver images
const AFTER_IMAGE = "http://localhost:3845/assets/03915d2bf5185f4b3af91c9b4a3b29c55ad4473f.png"; // Using another paver image

export default function GalleryComparison() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium font-clash text-foreground mb-4">
            See the Difference
          </h2>
          <p className="text-muted-foreground font-rubik max-w-2xl mx-auto">
            Transform your outdoor space with our premium paving solutions. Slide to compare the before and after.
          </p>
        </div>

        <div className="max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
          <ComparisonSlider
            beforeImage={BEFORE_IMAGE}
            afterImage={AFTER_IMAGE}
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      </div>
    </section>
  );
}
