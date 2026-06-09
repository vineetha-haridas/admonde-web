import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { saveFile, UploadFolder } from "@/lib/storage";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const rawFolder = formData.get("folder") as string | null;
  const VALID: UploadFolder[] = ["portfolio", "clients", "services", "hero"];
  const folder: UploadFolder = VALID.includes(rawFolder as UploadFolder) ? (rawFolder as UploadFolder) : "portfolio";

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Only JPEG, PNG, or WebP allowed" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Image must be under 8MB" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await saveFile(buffer, file.name, folder);

  return NextResponse.json({ url });
}
