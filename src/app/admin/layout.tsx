import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "sonner";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";

  if (pathname !== "/admin/login") {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        const user = await prisma.adminUser.findUnique({
          where: { id: payload.id },
          select: { id: true },
        });
        if (!user) {
          redirect("/api/auth/logout");
        }
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F4F2EE]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">{children}</div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
