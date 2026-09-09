import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!await getAuthFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: search ? { email: { contains: search, mode: "insensitive" } } : {},
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(subscribers);
}
