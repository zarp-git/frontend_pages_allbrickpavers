"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  RiArrowRightLine,
  RiLoader4Line,
  RiPhoneLine,
  RiMailLine,
  RiCheckLine,
} from "@remixicon/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/presentation/components/atoms/ui/dialog";
import { useLeadModal } from "@/hooks/use-lead-modal";

// --------------------------------------------------------------------------
// Schema
// --------------------------------------------------------------------------
const leadFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    preference: z.enum(["phone", "email"]),
    email: z.string().optional(),
    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.preference === "email" &&
      (!data.email || !z.string().email().safeParse(data.email).success)
    ) {
      ctx.addIssue({
        path: ["email"],
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address",
      });
    }
    if (data.preference === "phone" && (!data.phone || data.phone.length < 7)) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
      });
    }
  });

type LeadFormValues = z.infer<typeof leadFormSchema>;

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------
export const LeadCollectModal = () => {
  const { isOpen, closeModal } = useLeadModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
    defaultValues: { fullName: "", email: "", phone: "", preference: "phone" },
  });

  const preference = watch("preference");

  const handleClose = useCallback(() => {
    closeModal();
    // Reset after animation finishes
    setTimeout(() => {
      reset();
      setIsSuccess(false);
    }, 300);
  }, [closeModal, reset]);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success state
    setIsSuccess(true);
    setIsSubmitting(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="w-full max-w-[848px] p-5 pb-6 rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-200 border-none bg-white gap-0 overflow-hidden shadow-2xl"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">
          Book Your Free Consultation
        </DialogTitle>

        <div className="flex flex-col-reverse md:flex-row items-stretch justify-start w-full gap-8 md:gap-12">
          {/* Left Form / Success Area */}
          <div className="flex-1 flex flex-col justify-start md:justify-center items-start gap-8 min-w-[280px]">
            {/* Logo */}
            <div className="w-40 h-14 relative shrink-0">
              <Image
                src="/images/svg/logo.svg"
                alt="AllBrick Pavers Logo"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>

            {/* Heading */}
            <h2 className="text-black text-2xl md:text-3xl font-medium font-hanken leading-7 tracking-wide uppercase">
              {isSuccess ? "REQUEST RECEIVED" : "BOOK YOUR FREE CONSULTATION"}
            </h2>

            {isSuccess ? (
              /* ------ Success State ------ */
              <div className="w-full flex-1 flex flex-col justify-start items-start gap-6 py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <RiCheckLine className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-800 text-lg font-medium font-rubik">
                    Thank you for reaching out!
                  </p>
                  <p className="text-gray-600 text-sm font-rubik leading-6 max-w-[320px]">
                    Our team will contact you shortly via{" "}
                    {preference === "phone" ? "a phone call" : "e-mail"} to
                    schedule your free consultation. Looking forward to working
                    together!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-4 h-12 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white rounded-lg inline-flex justify-center items-center gap-4 text-base font-medium font-rubik uppercase w-full md:w-auto"
                >
                  Return to site
                  <RiArrowRightLine className="size-5" />
                </button>
              </div>
            ) : (
              /* ------ Form State ------ */
              <form
                onSubmit={onSubmit}
                className="w-full flex flex-col justify-start items-start gap-4"
                noValidate
              >
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  {/* Name Input */}
                  <div className="w-full flex flex-col gap-1">
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Your name"
                      disabled={isSubmitting}
                      className={`w-full h-12 px-3 py-2 bg-white rounded-md border text-sm font-medium font-rubik placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-colors ${errors.fullName ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs font-rubik mt-1">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Preference Label */}
                  <div className="text-gray-600 text-sm font-normal font-rubik leading-5 mt-2">
                    How do you prefer contact?
                  </div>

                  {/* Preference Toggle */}
                  <div className="w-full inline-flex justify-start items-start gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setValue("preference", "phone");
                        clearErrors(["email", "phone"]);
                      }}
                      className={`flex-1 h-12 px-3 py-2 rounded-md border flex justify-center items-center gap-2.5 transition-all outline-none ${
                        preference === "phone"
                          ? "bg-zinc-800 border-zinc-800 text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <RiPhoneLine
                        className={`size-4 opacity-80 ${preference === "phone" ? "text-white" : "text-gray-500"}`}
                      />
                      <span className="text-sm font-medium font-rubik leading-5 whitespace-nowrap">
                        By phone call
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setValue("preference", "email");
                        clearErrors(["email", "phone"]);
                      }}
                      className={`flex-1 h-12 px-3 py-2 rounded-md border flex justify-center items-center gap-2.5 transition-all outline-none ${
                        preference === "email"
                          ? "bg-zinc-800 border-zinc-800 text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <RiMailLine
                        className={`size-4 opacity-80 ${preference === "email" ? "text-white" : "text-gray-500"}`}
                      />
                      <span className="text-sm font-medium font-rubik leading-5 whitespace-nowrap">
                        By e-mail
                      </span>
                    </button>
                  </div>

                  {/* Dynamic Contact Input */}
                  <div className="w-full flex flex-col gap-1 mt-1">
                    {preference === "phone" ? (
                      <>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="(000) 000-0000"
                          disabled={isSubmitting}
                          className={`w-full h-12 px-3 py-2 bg-white rounded-md border text-sm font-medium font-rubik placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-colors ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-xs font-rubik mt-1">
                            {errors.phone.message}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="Your email address"
                          disabled={isSubmitting}
                          className={`w-full h-12 px-3 py-2 bg-white rounded-md border text-sm font-medium font-rubik placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-colors ${errors.email ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs font-rubik mt-1">
                            {errors.email.message}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 self-stretch h-12 px-8 py-4 bg-red-800 hover:bg-red-900 transition-colors text-white border-0 shadow-sm rounded-lg inline-flex justify-center items-center gap-4 w-full outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <RiLoader4Line className="size-5 animate-spin" />
                  ) : (
                    <>
                      <span className="text-center text-base font-medium font-rubik uppercase">
                        CONTACT US NOW
                      </span>
                      <RiArrowRightLine className="size-5" />
                    </>
                  )}
                </button>

                <div className="text-gray-500 text-xs font-normal font-rubik leading-4 mt-2">
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    onClick={handleClose}
                    className="underline hover:text-gray-800 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </form>
            )}
          </div>

          {/* Right Area: Progress & Mockup */}
          <div className="flex-1 w-full bg-white rounded-sm inline-flex flex-col justify-start items-start gap-6 overflow-hidden min-w-[300px]">
            {/* Header with Progress Steps and Close Button */}
            <div className="w-full inline-flex justify-between items-center">
              {/* Progress Bar */}
              <div className="flex justify-start items-center gap-3">
                <div className="w-24 md:w-28 flex flex-col justify-start items-start gap-1">
                  <span
                    className={`text-sm font-normal font-rubik leading-5 ${!isSuccess ? "text-black font-medium" : "text-gray-400"}`}
                  >
                    CONTACT INFO
                  </span>
                  <div
                    className={`self-stretch h-1.5 rounded-[10px] transition-colors ${!isSuccess ? "bg-zinc-800" : "bg-green-500"}`}
                  />
                </div>
                <div className="w-24 md:w-28 flex flex-col justify-start items-start gap-1">
                  <span
                    className={`text-sm font-normal font-rubik leading-5 ${isSuccess ? "text-black font-medium" : "text-gray-400"}`}
                  >
                    SUCCESS
                  </span>
                  <div
                    className={`self-stretch h-1.5 rounded-[10px] transition-colors ${isSuccess ? "bg-green-500" : "bg-gray-200"}`}
                  />
                </div>
              </div>

            
            </div>

            {/* Mockup Image */}
            <div className="w-full flex-1 relative rounded-[10px] overflow-hidden min-h-[260px] md:min-h-[380px]">
              <Image
                src="/images/sections-images/cta-section-placing-a-paver.jpg"
                alt="Professional paver installation in progress"
                fill
                sizes="(max-width: 768px) 100vw, 418px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
