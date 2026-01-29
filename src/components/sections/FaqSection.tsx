"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import AccordionItem from "@/components/ui/accordion-item";
import Image from "next/image";

const FAQS = [
  {
    question: "What payment options do you accept?",
    answer: "We accept all major credit cards, checks, and offer financing options to help make your project affordable."
  },
  {
    question: "How long does a typical paver installation take?",
    answer: "Project duration varies by size and complexity. A standard driveway or patio typically takes 3-5 days from demolition to completion."
  },
  {
    question: "Do you offer a warranty on your work?",
    answer: "Yes! We offer a comprehensive 7-year warranty on workmanship and installation defects to ensure your peace of mind."
  },
  {
    question: "How long do pavers last?",
    answer: "High-quality brick pavers can last 25-50 years or more with proper maintenance, making them a durable long-term investment."
  },
  {
    question: "What's the difference between pavers and concrete?",
    answer: "Pavers are stronger, more flexible (resistant to cracking), and easier to repair than poured concrete. They also offer more design versatility."
  },
  {
    question: "Is the installation process messy?",
    answer: "We strive to keep our job sites clean. While excavation creates some dust and debris, we clean up daily and ensure your property remains tidy."
  },
  {
    question: "Do I need to live in Central Florida to hire you?",
    answer: "We primarily serve Central Florida, including Haines City, Davenport, Winter Haven, and surrounding areas. Contact us to check your specific location."
  },
  {
    question: "What if I'm not sure what style I want?",
    answer: "Our design team can provide consultation, samples, and 3D renderings to help you visualize different styles and choose the perfect look for your home."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="container mx-auto px-4 md:px-8">

        {/* Main Layout: Left Scroll, Right Sticky */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 relative">

          {/* Left Column: FAQ Items (Scrolls) */}
          <div className="flex-1 w-full lg:w-[60%]">
            <h2 className="text-[28px] md:text-[36px] font-clash font-semibold text-gray-900 mb-8 uppercase leading-tight">
              FREQUENTLY ASKED QUESTIONS (FAQ)
            </h2>
            <div className="flex flex-col">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Content (Warranty & CTA) */}
          <div className="w-full lg:w-[35%] relative">
            <div className="lg:sticky lg:top-32 flex flex-col items-start gap-6">


              <div className="hidden lg:block absolute -top-20 left-0 w-full mb-10">
                {/* This is tricky with flex-col-reverse. 
                       Better to have a standard Header row if width permits, 
                       but with Sticky side, structure usually:
                       <Container>
                         <StickySide />
                         <MainContent />
                       </Container>
                       I'll stick to the Row layout.
                   */}
              </div>

              {/* Sticky Side Content */}
              <div className="hidden lg:flex flex-col items-center text-center">
                {/* Warranty Badge Placeholder - Circle with 7 */}
                <div className="w-48 h-48 rounded-full flex items-center justify-center relative mb-6">
                  <Image
                    src='/images/FAQ/warranty-badge.png'
                    alt="Warranty Badge"
                    width={180}
                    height={180}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#A52024] font-clash mb-4">
                  7-YEARS WARRANTY
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-rubik max-w-[280px]">
                  When you choose AllBrick Pavers, you're protected. Our comprehensive 7-year warranty covers workmanship and installation defects—giving you complete peace of mind.
                </p>

                <Button variant="brick" className="w-full h-12 text-sm font-bold uppercase tracking-wide">
                  Contact Us Now <Phone className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Warranty Block (Shown below questions or above? "flex-col-reverse" puts Left (Questions) at bottom?
              Wait, standard mobile flow: Title -> Questions -> Warranty?
              My Code: flex-col-reverse -> Right Col (Warranty) First in DOM? No.
              flex-col-reverse means Item 2 (Right) is Top, Item 1 (Left) is Bottom.
              So Mobile: Warranty Block -> Questions.
              Typically FAQs are: Title -> Questions -> Call to Action.
              Let's allow standard flex-col.
           */}
        </div>

        {/* Mobile View for Warranty (Below) - If I switch to standard flex-col */}
        {/* Mobile View for Warranty (Below) - If I switch to standard flex-col */}
        <div className="lg:hidden mt-12 flex flex-col items-center text-center px-4">
          <div className="w-40 h-40 mb-6">
            <Image
              src='/images/FAQ/warranty-badge.png'
              alt="Warranty Badge"
              width={160}
              height={160}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#A52024] font-clash mb-2">
            7-YEARS WARRANTY
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 font-rubik max-w-sm">
            Our comprehensive 7-year warranty gives you complete peace of mind.
          </p>
          <Button variant="brick" className="w-full max-w-[300px] h-12 text-sm font-bold uppercase tracking-wide">
            Contact Us Now <Phone className="ml-2 w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}
