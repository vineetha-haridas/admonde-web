import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Serves files written by saveFile()'s local-disk fallback (src/lib/storage.ts)
// via a normal dynamic route -- a live fs read on every request. This is the
// deliberate alternative to Next's public/ static-file serving, which caches
// the set of available files at server startup and never sees anything
// written after that (confirmed: a fresh upload 404'd until the app was
// restarted). Self-hosted/Docker deployments only -- Vercel uses Blob
// storage instead, so this route is never hit there.

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const UPLOADS_ROOT = path.join(process.cwd(), "uploads");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  const resolved = path.join(UPLOADS_ROOT, ...segments);
  // Defend against path traversal (e.g. ../../etc/passwd) escaping the uploads root.
  if (!resolved.startsWith(UPLOADS_ROOT + path.sep)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = await fs.readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
