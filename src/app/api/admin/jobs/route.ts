import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!await getAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobs = await prisma.jobOpening.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  if (!await getAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const job = await prisma.jobOpening.create({ data: body });
  return NextResponse.json(job, { status: 201 });
}
