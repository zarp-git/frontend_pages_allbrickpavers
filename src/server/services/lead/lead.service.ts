/**
 * Lead Service Implementation
 * =============================
 * Business logic for lead management.
 * Orchestrates repository operations and applies business rules.
 */

import type { ILeadService } from './lead.service.interface'
import type { ILeadRepository } from '@/server/repositories'
import { leadRepository } from '@/server/repositories'
import type {
  CreateLeadData,
  CreateLeadResult,
  LeadRecord,
  LeadSubmissionRecord,
  LeadSubmissionData,
} from '@/types/lead.type'

export class LeadService implements ILeadService {
  constructor(private readonly repository: ILeadRepository = leadRepository) {}

  async findByEmail(email: string): Promise<LeadRecord | null> {
    return this.repository.findByEmail(email)
  }

  async create(data: { name: string; email: string; phoneNumber: string }): Promise<LeadRecord> {
    return this.repository.create(data)
  }

  async createSubmission(submission: LeadSubmissionData): Promise<LeadSubmissionRecord> {
    return this.repository.createSubmission(submission)
  }

  async createLead(data: CreateLeadData): Promise<CreateLeadResult> {
    const startTime = Date.now()

    try {
      // Check if lead already exists
      let lead = await this.repository.findByEmail(data.email)

      // Create new lead if not exists
      if (!lead) {
        lead = await this.repository.create({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
        })
      }

      const processingTimeMs = Date.now() - startTime

      // Create submission record with form data
      const submission = await this.repository.createSubmission({
        leadId: lead.id,
        type: data.type,
        success: true,
        data: data.formData || {},
        metadata: { processingTimeMs },
        city: data.city,
        country: data.country,
        ipAddress: data.ipAddress,
        route: data.route,
        userAgent: data.userAgent,
        origin: data.origin,
        originFont: data.originFont,
      })

      return {
        success: true,
        leadId: lead.id,
        submissionId: submission.id,
      }
    } catch (error) {
      console.error('[LEAD_SERVICE] Error creating lead:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        leadData: {
          name: data.name,
          email: data.email,
          type: data.type,
        },
      })

      // Try to record failed submission if lead exists
      try {
        const existingLead = await this.repository.findByEmail(data.email)

        if (existingLead) {
          const processingTimeMs = Date.now() - startTime
          await this.repository.createSubmission({
            leadId: existingLead.id,
            type: data.type,
            success: false,
            data: data.formData || {},
            metadata: {
              processingTimeMs,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
            city: data.city,
            country: data.country,
            ipAddress: data.ipAddress,
            route: data.route,
            userAgent: data.userAgent,
            origin: data.origin,
            originFont: data.originFont,
          })
        }
      } catch (submissionError) {
        console.error('[LEAD_SERVICE] Failed to record submission error:', submissionError)
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save lead',
      }
    }
  }
}

// Default service instance
export const leadService = new LeadService()
