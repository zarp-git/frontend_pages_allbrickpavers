/**
 * Lead Types
 * ===========
 * Type definitions for Lead domain entities.
 * These types are used across the server layer for type safety.
 */

/**
 * Submission type enum values (matches Prisma schema)
 */
export type LeadSubmissionType = 'EBOOK_DOWNLOAD' | 'ENROLLMENT_ATTEMPT'

/**
 * JSON input value type for Prisma
 */
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

/**
 * Origin enum for lead sources
 */
export const EOriginLead = {
  seo_tool: 1,
  seo_archive: 2,
  email: 3,
  facebook_ads: 4,
  google_ads: 5,
  page: 6,
} as const

export type EOriginLeadType = typeof EOriginLead[keyof typeof EOriginLead]

/**
 * Data required to create a new lead with submission
 */
export interface CreateLeadData {
  // Lead info
  name: string
  email: string
  phoneNumber: string
  // Submission info
  type: LeadSubmissionType
  formData?: JsonValue
  metadata?: JsonValue
  // Location info
  city?: string
  country?: string
  // Tracking info
  ipAddress?: string
  route?: string
  userAgent?: string
  origin: EOriginLeadType
  originFont?: string
}

/**
 * Data for creating a submission linked to an existing lead
 */
export interface LeadSubmissionData {
  leadId: number
  type: LeadSubmissionType
  success: boolean
  data?: JsonValue
  metadata?: JsonValue
  city?: string
  country?: string
  ipAddress?: string
  route?: string
  userAgent?: string
  origin?: EOriginLeadType
  originFont?: string
}

/**
 * Lead record returned from database
 */
export interface LeadRecord {
  id: number
  name: string
  email: string | null
  phoneNumber: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Submission record returned from database
 */
export interface LeadSubmissionRecord {
  id: number
  leadId: number
  type: LeadSubmissionType
  success: boolean
  createdAt: Date
}

/**
 * Result of lead creation operation
 */
export type CreateLeadResult =
  | { success: true; leadId: number; submissionId: number }
  | { success: false; error: string }

// Legacy validation helpers (kept for backwards compatibility)
export function isValidLeadEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidBrazilianLeadPhone(phone: string): boolean {
  const brazilianPhoneRegex = /^(\+55|55)?[1-9][0-9]{1}[0-9]{8,9}$/
  return brazilianPhoneRegex.test(phone)
}
