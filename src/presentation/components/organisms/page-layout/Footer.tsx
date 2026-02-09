import React from "react";
import { RiTimeLine, RiPhoneLine, RiInstagramLine } from "@remixicon/react";
import { Button } from "@/presentation/components/atoms/ui/button";
import { CompanyLogo } from "@/presentation/components/atoms/CompanyLogo";

// Assets from Figma  
const BADGE_IMAGE =
  "http://localhost:3845/assets/065a75cfd7a334e31b72b3c8dcc323472a445eba.png";

export default function Footer() {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          {/* Brand & Map Section */}
          <div className="flex flex-col sm:flex-row gap-8 lg:w-1/3">
            <div className="border border-secondary p-6 rounded-sm w-full sm:w-[500px] flex gap-4 relative">
              <div className="flex-1 flex flex-col gap-4 z-10">
                <CompanyLogo />
                <p className="text-muted-foreground text-sm leading-relaxed font-rubik max-w-[200px]">
                  Durable, Beautiful Concrete Pavers for Any Orlando Hardscape
                  Project
                </p>
              </div>
              {/* Map positioned visibly */}
              <div className="w-[180px] h-[120px] sm:w-[200px] sm:h-full shrink-0 overflow-hidden rounded-md border border-border">
                <GoogleMap />
              </div>
            </div>
          </div>

          {/* Links & Contact Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl text-foreground font-medium font-clash">
                  CONTACT US NOW
                </h3>
                <div className="h-[2px] w-10 bg-primary rounded-full" />
              </div>

              <div className="flex flex-col gap-4 font-rubik text-muted-foreground">
                <div className="flex gap-3 items-start">
                  <RiTimeLine className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium block">FROM MON TO SAT</span>
                    <span className="text-gray-500">9:00 AM - 6:00 PM</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <RiPhoneLine className="w-5 h-5 text-primary shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium block">PHONE NUMBER</span>
                    <a
                      href="tel:+14070000000"
                      className="hover:text-primary transition-colors"
                    >
                      (407) 000-0000
                    </a>
                  </div>
                </div>

                <Button variant="brick" className="w-full max-w-[200px]">
                  CALL US NOW
                </Button>
              </div>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl text-foreground font-medium font-clash">
                  LEGAL
                </h3>
                <div className="h-[2px] w-10 bg-primary rounded-full" />
              </div>
              <ul className="flex flex-col gap-2 font-rubik text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl text-foreground font-medium font-clash">
                  FOLLOW US
                </h3>
                <div className="h-[2px] w-10 bg-primary rounded-full" />
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#e1306c] transition-colors group"
              >
                <div className="p-2 border border-border rounded-md group-hover:border-[#e1306c] transition-colors">
                  <RiInstagramLine className="w-6 h-6" />
                </div>
                <span className="font-medium font-rubik">Instagram</span>
              </a>

              <div className="mt-4">
                <img
                  src={BADGE_IMAGE}
                  alt="ICPI Certified"
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 bg-black text-center font-rubik text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} AllBricks Pavers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
