"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { RiPhoneLine } from "@remixicon/react";

import { Button } from "@/presentation/components/ui/button";
import StarRating from "@/presentation/components/ui/StarRating";

// --- Mock Data ---
const FEEDBACKS = [
  {
    id: 1,
    name: "Doug Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    daysAgo: "13 Days Ago",
    rating: 5,
    text: "I’m Extremely Happy With The Work Allbrick Pavers Did At My Home. They Re-Leveled The Travertine Pavers Around My Pool And Added A Brand-New Walkway, And Everything Turned Out Absolutely Beautiful. The Crew Was Professional, Skilled, And Clearly Knew Exactly What They Were Doing.",
  },
  {
    id: 2,
    name: "57iglesias",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg", // Placeholder or generic avatar
    daysAgo: "13 Days Ago",
    rating: 5,
    text: "I Reached Out To Allbrick For An Expansion Of My Pavers. They Were Very Professional From The First Call Throughout The Entire Process. They Were On Time, Work In A Clean And Orderly Manner. The Team Works Extremely Well Together.",
  },
  {
    id: 3,
    name: "Audania Taylor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    daysAgo: "15 Days Ago",
    rating: 5,
    text: "Look At This! LOOK AT THIS!!! Is This Not Gorgeous! Rael And His Davenport Team Meticulously Planned, Communicated, And Completed My Back Lanai In Excellent Time. He Worked With Other Contractors For A Seamless Installation.",
  },
  {
    id: 4,
    name: "Liz Pratt",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    daysAgo: "20 Days Ago",
    rating: 5,
    text: "We Shopped Around For Months For The Best Paver Company To Redo Our Patio In Providence, Davenport, FL. Through Our Search We Found Many Scammers And Lazy Companies That Don't Give You The Time Of Day. Not Allbrick!",
  },
  {
    id: 5,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    daysAgo: "22 Days Ago",
    rating: 4.5,
    text: "Fantastic service from start to finish. The team was punctual and the end result exceeded our expectations. Highly recommend for anyone looking for quality paving work.",
  },
];

export default function FeedbackSection() {
  const [swiperRef, setSwiperRef] = useState<any>(null);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="h2 text-foreground mb-4">
          What Costumers Are Talking About Is
        </h2>
      </div>

      {/* 
        Container Logic:
        - "container mx-auto" defines the max width.
        - "sumindo tudo o que sair desse container" -> overflow-hidden on the container.
        - Slider takes 100% of this container.
      */}
      <div className="container mx-auto relative overflow-hidden">
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            // Responsive breakpoints to show partial slides
            slidesPerView={1.2}
            loop={true}
            speed={4000} // continuous flow speed
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 3.5,
              },
            }}
            className="ease-linear!"
            // Swiper's continuous autoplay usually requires 'linear' timing function in global css or custom class,
            // but standard autoplay with delay 0 approximates it.
            // We'll let standard autoplay handle the "girando" Feel.
            onSwiper={setSwiperRef}
          >
            {FEEDBACKS.map((feedback) => (
              <SwiperSlide key={feedback.id} className="h-auto">
                <div className="bg-white border border-[#ececec] rounded-2xl p-6 h-full flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Header: Avatar, Name, Google Logo, Days Ago */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={feedback.avatar}
                          alt={feedback.name}
                          className="w-[52px] h-[52px] rounded-full object-cover"
                        />
                        {/* Google Logo Badge - absolute positioned on avatar as per common design patterns for reviews, or usually Next to it. 
                                Design Screenshot shows Google logo small next to name or overlapping avatar?
                                Screenshot shows: Avatar on left. Name and "13 Days Ago" in text column. 
                                AND a Google G logo at the bottom right of the AVATAR circle.
                            */}
                        <img
                          src="/images/google-logo.png"
                          alt="Google"
                          className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <h4 className="text-base font-bold text-gray-900 font-rubik leading-tight">
                          {feedback.name}
                        </h4>
                        <span className="text-xs text-gray-400 font-rubik">
                          {feedback.daysAgo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <StarRating rating={feedback.rating} />

                  {/* Text */}
                  <p className="text-gray-600 font-rubik text-sm leading-relaxed text-left line-clamp-6">
                    {feedback.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="container mx-auto px-4 mt-12 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="brick"
          size="lg"
          className="h-[52px] px-8 text-base font-medium uppercase min-w-[200px] flex items-center justify-center gap-2"
        >
          CONTACT US NOW <RiPhoneLine className="size-5" />
        </Button>
        <Button
          variant="brick-outline"
          size="lg"
          className="h-[52px] px-8 text-base font-medium uppercase min-w-[200px]"
        >
          SEE MORE
        </Button>
      </div>
    </section>
  );
}
