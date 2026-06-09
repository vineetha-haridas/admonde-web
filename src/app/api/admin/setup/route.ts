import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function GET() {
  const count = await prisma.adminUser.count();
  return NextResponse.json({ needed: count === 0 });
}

// POST /api/admin/setup — creates the first admin user if none exists
export async function POST() {
  try {
    const count = await prisma.adminUser.count();
    if (count > 0) {
      return NextResponse.json({ error: "Admin user already exists" }, { status: 409 });
    }

    const user = await prisma.adminUser.create({
      data: {
        name: "Admin",
        email: "admin@admonde.com",
        passwordHash: hashPassword("Admin@2026"),
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Admin user created",
      email: user.email,
      defaultPassword: "Admin@2026",
    });
  } catch {
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
