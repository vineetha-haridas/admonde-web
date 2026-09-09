import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function GET() {
  const count = await prisma.adminUser.count();
  return NextResponse.json({ needed: count === 0 });
}

// POST /api/admin/setup — creates the first admin user if none exists.
// Gated behind ADMIN_SETUP_TOKEN so this can't be triggered by anyone who
// simply finds the login page before an admin account has been created.
export async function POST(req: NextRequest) {
  try {
    const count = await prisma.adminUser.count();
    if (count > 0) {
      return NextResponse.json({ error: "Admin user already exists" }, { status: 409 });
    }

    const configuredToken = process.env.ADMIN_SETUP_TOKEN;
    if (!configuredToken) {
      return NextResponse.json(
        { error: "Setup is not configured. Set ADMIN_SETUP_TOKEN in the environment first." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { token, email } = body as { token?: string; email?: string };
    if (token !== configuredToken) {
      return NextResponse.json({ error: "Invalid setup token" }, { status: 401 });
    }
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    // Random per-install password — never a hardcoded default — shown once in
    // this response only. Change it via Settings right after signing in.
    const password = randomBytes(9).toString("base64url");

    const user = await prisma.adminUser.create({
      data: {
        name: "Admin",
        email,
        passwordHash: hashPassword(password),
      },
    });

    return NextResponse.json({
      ok: true,
      email: user.email,
      password,
    });
  } catch {
    return NextResponse.json({ error: "Setup failed" }, { status: 500 });
  }
}
