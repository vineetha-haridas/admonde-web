import { NextRequest, NextResponse } from "next/server";
import { saveFile } from "@/lib/storage";

const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Only PDF or DOC files allowed" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "CV must be under 10MB" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await saveFile(buffer, file.name, "cvs");

  return NextResponse.json({ url });
}
