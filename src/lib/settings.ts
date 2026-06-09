import { prisma } from "@/lib/prisma";

export const SETTING_DEFAULTS: Record<string, string> = {
  hero_image_url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400",
  hero_label:     "Advertising & Printing Solutions",
  hero_headline:  "We Build Brands\nThat People\nRemember.",
  hero_subtext:   "Custom carpentry, complete fit-out, MEP contracting, and precision printing — built to specification, delivered on time.",
};

export type SiteSettings = typeof SETTING_DEFAULTS;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const db = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...SETTING_DEFAULTS, ...db };
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}
