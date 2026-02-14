import React from "react";
import Image from "next/image";
import { Button } from "@/presentation/components/atoms/ui/button";
import { RiPhoneLine } from "@remixicon/react";

export const InstallationTrustSection = () => {
  return (
    <section id="installation-trust" className="py-20 bg-white">
      <div className="section-container flex flex-col items-center gap-12">
        <h2 className="text-foreground text-3xl font-black font-hanken uppercase leading-7 tracking-wide text-center">
          installation you can trust
        </h2>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-12">
          {/* Image */}
          <div className="relative w-full lg:w-[618px] h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/sections-images/installation-trust-section-pavers-layers.png"
              alt="Professional installation layers"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-start items-start gap-7">
            <div className="flex flex-col justify-start items-start gap-4">
              <h3 className="text-foreground text-xl font-bold font-hanken uppercase leading-tight tracking-tight">
                Built to Handle the Pressure
              </h3>
              <div className="text-muted-foreground text-base font-normal font-rubik leading-6">
                <p>
                  Unlike crackable concrete, interlocking paving stones are
                  designed to last for decades.
                </p>
                <br />
                <p>
                  Pavers can handle up to 8,000 PSI (compared to 4,000 PSI for
                  concrete) to ensure cars, trucks, and RVs won&apos;t ruin your
                  investment.
                </p>
              </div>
            </div>

            <Button
              variant="brick"
              size="lg"
              className="h-12 px-8 py-4 rounded-lg inline-flex justify-start items-center gap-4 text-base font-medium font-rubik uppercase"
            >
              contact us now
              <RiPhoneLine className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
