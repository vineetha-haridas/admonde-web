import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Admonde",
  description:
    "Join the ad.monde team — we're always looking for talented people passionate about advertising, branding, and print production across the GCC.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
