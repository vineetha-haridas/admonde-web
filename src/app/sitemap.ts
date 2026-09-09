import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://admonde.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/clients`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/careers`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      select: { slug: true, createdAt: true },
    });
    serviceRoutes = services.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: s.createdAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // DB unreachable at build time — ship the static routes only
  }

  return [...staticRoutes, ...serviceRoutes];
}
