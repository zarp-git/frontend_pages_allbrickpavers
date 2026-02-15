"use server"

/**
 * Contact Lead Action
 * =====================
 * Server action for contact form submission.
 * Presentation layer entry point that delegates to the application layer.
 *
 * Responsibilities:
 * - Extract request metadata from headers
 * - Delegate to pipe for validation/transformation
 * - Delegate to service for business logic
 */

import { headers } from "next/headers"
import { leadService, type ILeadService } from "@/server/services/lead"
import { contactFormPipe, type ContactFormPipeInput } from "@/server/application/lead"
import type { ContactFormInputDto } from "@/server/application/lead/dtos/contact-form.dto"
import type { CreateLeadData, CreateLeadResult } from "@/types/lead.type"

/**
 * Re-export ContactFormInputDto as ContactFormInput for backward compatibility
 */
export type ContactFormInput = ContactFormInputDto

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string
  message: string
}

/**
 * Action result type with validation errors
 */
export type ContactFormResult =
  | CreateLeadResult
  | { success: false; validationErrors: ValidationError[] }

/**
 * Submit contact form action
 * Main entry point for form submission from the client
 */
export async function submitContactForm(
  input: ContactFormInput,
  service: ILeadService = leadService
): Promise<ContactFormResult> {
  // Extract request metadata from headers
  const headersList = await headers()
  const metadata = {
    ipAddress:
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      undefined,
    userAgent: headersList.get("user-agent") || undefined,
    route: headersList.get("referer") || undefined,
  }

  // Execute pipe: validate + transform
  const pipeResult = contactFormPipe.execute({
    formData: input,
    metadata,
  })

  // Handle validation errors
  if (!pipeResult.success) {
    return {
      success: false,
      validationErrors: pipeResult.errors.map((err) => ({
        field: err.field,
        message: err.message,
      })),
    }
  }

  // Delegate to service with transformed data
  return service.createLead(pipeResult.data)
}
