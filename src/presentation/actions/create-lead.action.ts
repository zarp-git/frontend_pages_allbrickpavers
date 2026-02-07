'use server'

import {
  leadService,
  type ILeadService,
} from '@/server/services'
import type {
  CreateLeadData,
  LeadSubmissionData,
  LeadRecord,
  CreateLeadResult,
} from '@/types/lead.type'

export type { CreateLeadData, LeadSubmissionData }

/**
 * Create or return a lead record (contact registration) separately
 */
export async function createLeadRecord(
  data: { name: string; email?: string; phoneNumber?: string },
  deps: { service: ILeadService } = { service: leadService }
): Promise<Pick<LeadRecord, 'id' | 'name' | 'email' | 'phoneNumber'>> {
  const { name, email, phoneNumber } = data

  if (email) {
    const existing = await deps.service.findByEmail(email)
    if (existing) {
      return {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        phoneNumber: existing.phoneNumber,
      }
    }
  }

  const created = await deps.service.create({
    name,
    email: email || '',
    phoneNumber: phoneNumber || '',
  })

  return {
    id: created.id,
    name: created.name,
    email: created.email,
    phoneNumber: created.phoneNumber,
  }
}

/**
 * Create a submission record linked to a lead
 */
export async function createLeadSubmission(
  submission: LeadSubmissionData,
  deps: { service: ILeadService } = { service: leadService }
) {
  return deps.service.createSubmission(submission)
}

/**
 * Main action to create lead with submission
 */
export async function createLeadAction(
  leadData: CreateLeadData,
  deps: { service: ILeadService } = { service: leadService }
): Promise<CreateLeadResult> {
  return deps.service.createLead(leadData)
}