"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Users,
  ImageIcon,
  Briefcase,
  LogOut,
  ChevronRight,
  Building2,
  Layers,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Applications", href: "/admin/applications", icon: Users },
  { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-60 2xl:w-72 3xl:w-80 shrink-0 flex flex-col bg-[#0a0a0a] border-r border-white/8 sticky top-0 h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <div className="flex flex-col gap-1.5 leading-none items-start">
          <Image src="/Admonde White.png" alt="Admonde" width={180} height={40} className="h-6 w-auto object-contain object-left" />
          <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-medium transition-colors duration-150 group",
                active
                  ? "bg-white/8 text-white border-l-2 border-[#72b043] pl-[10px]"
                  : "text-white/45 hover:text-white hover:bg-white/5 border-l-2 border-transparent pl-[10px]"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" style={active ? { color: "#72b043" } : undefined} />
              {label}
              {active && (
                <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded text-[13px] font-medium text-white/40 hover:text-red-400 hover:bg-red-500/8 transition-colors duration-150"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
