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

  const fs = await import("fs/promises");
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), file);
  return `/uploads/${folder}/${filename}`;
}
