import path from "path";
import { randomUUID } from "node:crypto";

export type UploadFolder = "portfolio" | "clients" | "services" | "hero" | "cvs";

export async function saveFile(
  file: Buffer,
  originalName: string,
  folder: UploadFolder
): Promise<string> {
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "bin";
  const filename = `${randomUUID()}.${ext}`;

  // Use Vercel Blob in production, local filesystem in development
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${folder}/${filename}`, file, { access: "public" });
    return blob.url;
  }

  if (process.env.VERCEL) {
    // Vercel's deployed filesystem is read-only (aside from /tmp), so a local
    // disk write here would fail with a cryptic EROFS. Fail with a clear,
    // actionable message instead: this project needs a Blob store connected
    // (Vercel dashboard → Storage → Create Database → Blob → Connect to Project),
    // which injects BLOB_READ_WRITE_TOKEN automatically.
    throw new Error(
      "Image storage is not configured for this deployment: BLOB_READ_WRITE_TOKEN is missing. " +
      "Connect a Vercel Blob store to this project (Storage tab → Create Database → Blob) and redeploy."
    );
  }

  const fs = await import("fs/promises");
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), file);
  return `/uploads/${folder}/${filename}`;
}
