/**
 * Lead Repository Implementation
 * ================================
 * Prisma-based implementation of the Lead repository.
 * Handles all database operations for leads and submissions.
 */

import prisma from '@/common/lib/prisma'
import type { ILeadRepository } from './lead.repository.interface'
import type {
  LeadRecord,
  LeadSubmissionRecord,
  LeadSubmissionData,
  LeadSubmissionType,
} from '@/types/lead.type'

type PrismaClientSingleton = typeof prisma

export class LeadRepository implements ILeadRepository {
  constructor(private readonly db: PrismaClientSingleton = prisma) {}

  async findByEmail(email: string): Promise<LeadRecord | null> {
    const lead = await this.db.lead.findFirst({
      where: { email: email.toLowerCase().trim() },
    })

    if (!lead) return null

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    }
  }

  async create(data: {
    name: string
    email: string
    phoneNumber?: string
  }): Promise<LeadRecord> {
    const lead = await this.db.lead.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber?.trim() || null,
      },
    })

    return {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
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
        city: submission.city || null,
        country: submission.country || null,
        ipAddress: submission.ipAddress || null,
        route: submission.route || null,
        userAgent: submission.userAgent || null,
        origin: submission.origin ?? 6,
        originFont: submission.originFont || null,
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
