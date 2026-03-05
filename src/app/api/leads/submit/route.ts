/**
 * Lead Submission API Route
 * ==========================
 * Local API route to handle lead submissions and forward to backend
 */

import { NextRequest, NextResponse } from "next/server"
import { leadApiService } from "@/server/services/lead/lead-api.service"
import type { SubmitPublicLeadDTO } from "@/types/lead.type"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Capture request metadata
    const userAgent = request.headers.get("user-agent") || undefined
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ipAddress = forwardedFor?.split(",")[0].trim() || undefined

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json(
        { message: "Name is required", error: "Bad Request" },
        { status: 400 }
      )
    }

    if (!body.email?.trim()) {
      return NextResponse.json(
        { message: "Email is required", error: "Bad Request" },
        { status: 400 }
      )
    }

    // Prepare DTO for API
    const dto: SubmitPublicLeadDTO = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      message: body.message?.trim(),
      source: body.source || "landing-page",
      data: body.data,
      ipAddress,
      userAgent,
    }

    // Submit to backend API
    const result = await leadApiService.submitLead(dto)

    if (result.success) {
      return NextResponse.json(
        { leadId: result.data?.leadId, message: "Lead submitted successfully" },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { message: result.error || "Failed to submit lead", error: "Internal Server Error" },
      { status: result.status || 500 }
    )
  } catch (error) {
    console.error("[API_LEADS_SUBMIT] Error:", error)
    return NextResponse.json(
      { message: "Internal server error", error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
