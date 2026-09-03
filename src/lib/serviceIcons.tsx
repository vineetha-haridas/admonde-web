import { Store, Hammer, Wrench, Printer, Calendar, Truck, ShieldCheck, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const DEFAULT_SERVICE_ICON: LucideIcon = Layers;

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "interior-fitout": Store,
  "carpentry-fabrication": Hammer,
  "mep-works": Wrench,
  "printing-branding": Printer,
  "exhibition-booths": Calendar,
  "fleet-uniform": Truck,
  "hse-safety": ShieldCheck,
  "signage-wayfinding": Store,
};

export function getServiceIcon(slug: string): LucideIcon {
  return SERVICE_ICON_MAP[slug] ?? DEFAULT_SERVICE_ICON;
}
