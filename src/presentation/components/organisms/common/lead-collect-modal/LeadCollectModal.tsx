"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RiArrowRightLine, RiLoader4Line } from "@remixicon/react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/presentation/components/atoms/ui/dialog"
import { Button } from "@/presentation/components/atoms/ui/button"
import { useLeadModal } from "@/hooks/use-lead-modal"
import { submitContactForm } from "@/presentation/actions/contact-lead.action"
import { toast } from "sonner"

// --------------------------------------------------------------------------
// Schema
// --------------------------------------------------------------------------
const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),
})

type LeadFormValues = z.infer<typeof leadFormSchema>

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------
export const LeadCollectModal = () => {
  const { isOpen, closeModal } = useLeadModal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", phone: "" },
  })

  const handleClose = useCallback(() => {
    closeModal()
    // Reset after animation finishes
    setTimeout(() => {
      reset()
      setIsSuccess(false)
    }, 300)
  }, [closeModal, reset])

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        type: "FREE_CONSULTATION",
      })

      if (result.success) {
        setIsSuccess(true)
        toast.success("Thank you! We'll be in touch soon.")
      } else {
        if ("validationErrors" in result) {
          toast.error("Please check the form fields and try again.")
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      }
    } catch {
      toast.error("Connection error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-212 p-0 rounded-3xl border border-gray-200 bg-white overflow-hidden gap-0"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Book Your Free Consultation</DialogTitle>

        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {/* Left Image */}
          <div className="hidden lg:block lg:w-104.5 shrink-0 relative rounded-l-3xl overflow-hidden">
            <Image
              src="/images/sections-images/cta-section-placing-a-paver.jpg"
              alt="Professional paver installation in progress"
              fill
              sizes="418px"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col justify-center items-start gap-6 p-5 lg:p-8">
            {/* Logo */}
            <div className="w-40 h-14 relative">
              <Image
                src="/images/svg/logo.svg"
                alt="AllBrick Pavers Logo"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>

            {/* Heading */}
            <h2 className="text-black text-2xl lg:text-3xl font-medium font-hanken leading-8 tracking-wide uppercase">
              Book Your Free Consultation
            </h2>

            {isSuccess ? (
              /* ------ Success State ------ */
              <div className="w-full flex flex-col items-center gap-4 py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-800 text-lg font-medium font-rubik text-center">
                  Thank you for reaching out!
                </p>
                <p className="text-gray-500 text-sm font-rubik text-center max-w-xs">
                  Our team will contact you shortly to schedule your free
                  consultation.
                </p>
                <Button
                  variant="brick"
                  size="lg"
                  onClick={handleClose}
                  className="mt-2 h-12 px-8 py-4 rounded-lg w-full text-base font-medium font-rubik uppercase"
                >
                  Close
                </Button>
              </div>
            ) : (
              /* ------ Form State ------ */
              <form
                onSubmit={onSubmit}
                className="w-full flex flex-col gap-4"
                noValidate
              >
                <div className="flex flex-col gap-3">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Your name"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.fullName}
                      className="h-12 px-3 py-2 bg-background rounded-md border border-input text-sm font-medium font-rubik placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    />
                    {errors.fullName && (
                      <span
                        role="alert"
                        className="text-destructive text-xs font-rubik"
                      >
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Your best e-mail"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      className="h-12 px-3 py-2 bg-background rounded-md border border-input text-sm font-medium font-rubik placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    />
                    {errors.email && (
                      <span
                        role="alert"
                        className="text-destructive text-xs font-rubik"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="(000) 000-0000"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      className="h-12 px-3 py-2 bg-background rounded-md border border-input text-sm font-medium font-rubik placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    />
                    {errors.phone && (
                      <span
                        role="alert"
                        className="text-destructive text-xs font-rubik"
                      >
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="brick"
                  size="lg"
                  disabled={isSubmitting || !isValid}
                  className="h-12 px-8 py-4 rounded-lg w-full text-base font-medium font-rubik uppercase gap-4"
                >
                  {isSubmitting ? (
                    <>
                      <RiLoader4Line className="size-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Contact Us Now
                      <RiArrowRightLine className="size-5" />
                    </>
                  )}
                </Button>

                {/* Privacy Disclaimer */}
                <p className="text-neutral-600 text-sm font-normal font-rubik leading-5">
                  By continuing with &quot;Contact Us Now&quot; you agree with
                  our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
