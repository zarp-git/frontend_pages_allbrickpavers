/**
 * Lead Repository Implementation
 * ================================
 * Prisma-based implementation of the Lead repository.
 * Handles all database operations for leads and submissions.
 */

import prisma, { type PrismaClientSingleton } from "@/lib/prisma"
import type { ILeadRepository } from "@/server/repositories/lead.repository.interface"
import type {
  LeadRecord,
  LeadSubmissionRecord,
  LeadSubmissionData,
  LeadSubmissionType,
} from "@/types/lead.type"

export class LeadRepository implements ILeadRepository {
  constructor(private readonly db: PrismaClientSingleton = prisma) {}

  async findByEmail(email: string): Promise<LeadRecord | null> {
    const lead = await this.db.lead.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!lead) return null

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      country: lead.country,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }
  }

  async create(data: {
    name: string
    email: string
    phoneNumber?: string
    country?: string
  }): Promise<LeadRecord> {
    const lead = await this.db.lead.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber?.trim() || null,
        country: data.country || null,
      },
    })

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      country: lead.country,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }
  }

  async createSubmission(submission: LeadSubmissionData): Promise<LeadSubmissionRecord> {
    const record = await this.db.leadSubmission.create({
      data: {
        leadId: submission.leadId,
        type: submission.type as LeadSubmissionType,
        success: submission.success,
        data: submission.data || {},
        metadata: submission.metadata || {},
        ipAddress: submission.ipAddress || null,
        route: submission.route || null,
        userAgent: submission.userAgent || null,
        origin: submission.origin || null,
      },
    })

    return {
      id: record.id,
      leadId: record.leadId,
      type: record.type as LeadSubmissionType,
      success: record.success,
      createdAt: record.createdAt,
    }
  }
}

// Default instance
export const leadRepository = new LeadRepository()
