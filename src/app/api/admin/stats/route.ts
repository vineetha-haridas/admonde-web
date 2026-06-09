import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!await getAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalEnquiries,
    newEnquiries,
    totalApplications,
    newApplications,
    totalProjects,
    activeJobs,
    recentEnquiries,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { status: "new" } }),
    prisma.portfolioProject.count(),
    prisma.jobOpening.count({ where: { active: true } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, service: true, status: true, createdAt: true },
    }),
  ]);

  return NextResponse.json({
    totalEnquiries,
    newEnquiries,
    totalApplications,
    newApplications,
    totalProjects,
    activeJobs,
    recentEnquiries,
  });
}
