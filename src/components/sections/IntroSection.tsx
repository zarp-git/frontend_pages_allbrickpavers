import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

export default function IntroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

          {/* Left Column: Image */}
          <div className="w-full md:w-auto shrink-0 relative flex justify-center md:block">
            <div className="relative rounded-[20px] overflow-hidden w-full max-w-[532px] h-[388px] shadow-lg">
              <img
                src={'/images/introImage.png'}
                alt="Paver installation example"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:flex-1 flex flex-col gap-7 max-w-lg">
            <h2 className="text-3xl md:text-[32px] font-medium text-foreground leading-tight">
              Do any of these sound familiar?
            </h2>

            <ul className="flex flex-col gap-4 text-muted-foreground font-rubik text-base list-disc pl-5">
              <li>
                <span className="leading-relaxed">Fear the work will be uneven or sink within months.</span>
              </li>
              <li>
                <span className="leading-relaxed">Price that skyrockets mid-project or endless "extra" charges.</span>
              </li>
              <li>
                <span className="leading-relaxed">Contractor who disappears, delays, or abandons the job halfway.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="brick" size="lg" className="px-8 h-[52px] text-base flex items-center justify-center">
                CONTACT US NOW <Phone className="ml-2 size-6" />
              </Button>
              <Button variant="brick-outline" size="lg" className="px-8 h-[52px] text-base">
                GALLERY
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
