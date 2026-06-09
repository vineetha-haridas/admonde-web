"use client";

import { useEffect, useState } from "react";
import { Mail, Users, ImageIcon, Briefcase, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Stats = {
  totalEnquiries: number;
  newEnquiries: number;
  totalApplications: number;
  newApplications: number;
  totalProjects: number;
  activeJobs: number;
  recentEnquiries: { id: number; name: string; service: string | null; status: string; createdAt: string }[];
};

const STATUS_STYLES: Record<string, string> = {
  new:      "bg-[#111111]/8 text-[#111111]",
  read:     "bg-[#72b043]/12 text-[#4a7a2a]",
  replied:  "bg-blue-50 text-blue-600",
  archived: "bg-[#E8E4DC] text-[#AAAAAA]",
};

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: number; sub?: string }) {
  return (
    <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="w-11 h-11 rounded-xl bg-[#F4F2EE] border border-[#E0DDD8] flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-[#111111]" />
      </div>
      <div className="min-w-0">
        <p className="text-[#999999] text-[11px] uppercase tracking-widest">{label}</p>
        <p className="text-[#111111] text-4xl font-bold font-display mt-1 leading-none">{value}</p>
        {sub && <p className="text-[#111111] text-xs mt-1.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#DDDDDD] border-t-[#111111] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#EEEBE6]">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-6 h-px bg-[#CCCCCC]" />
          <span className="text-[#111111] text-[10px] tracking-[0.35em] uppercase font-medium">Overview</span>
        </div>
        <h1 className="text-2xl font-bold text-[#111111] font-display">Dashboard</h1>
        <p className="text-[#999999] text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        <StatCard icon={Mail} label="Total Enquiries" value={stats?.totalEnquiries ?? 0} sub={stats?.newEnquiries ? `${stats.newEnquiries} new` : undefined} />
        <StatCard icon={TrendingUp} label="New Enquiries" value={stats?.newEnquiries ?? 0} sub="Awaiting review" />
        <StatCard icon={Users} label="Applications" value={stats?.totalApplications ?? 0} sub={stats?.newApplications ? `${stats.newApplications} new` : undefined} />
        <StatCard icon={Briefcase} label="Active Jobs" value={stats?.activeJobs ?? 0} />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        {/* Recent enquiries */}
        <div className="lg:col-span-2 bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8E4DC] flex items-center justify-between bg-[#FAFAF8]">
            <h2 className="text-[#111111] font-semibold text-sm">Recent Enquiries</h2>
            <Clock className="w-4 h-4 text-[#AAAAAA]" />
          </div>
          {!stats?.recentEnquiries?.length ? (
            <p className="px-6 py-8 text-[#AAAAAA] text-sm text-center">No enquiries yet</p>
          ) : (
            <div className="divide-y divide-[#EEEBE6]">
              {stats.recentEnquiries.map((e) => (
                <div key={e.id} className="px-6 py-3.5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#111111] text-sm font-medium truncate">{e.name}</p>
                    <p className="text-[#999999] text-xs mt-0.5">{e.service ?? "—"}</p>
                  </div>
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider", STATUS_STYLES[e.status] ?? STATUS_STYLES.new)}>
                    {e.status}
                  </span>
                  <span className="text-[#AAAAAA] text-xs shrink-0">
                    {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="space-y-3">
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-4 h-4 text-[#111111]" />
              <h3 className="text-[#111111] text-sm font-semibold">Portfolio</h3>
            </div>
            <p className="text-[#111111] text-4xl font-bold font-display">{stats?.totalProjects ?? 0}</p>
            <p className="text-[#999999] text-xs mt-1.5 uppercase tracking-wider">Projects in DB</p>
          </div>
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-4 h-4 text-[#111111]" />
              <h3 className="text-[#111111] text-sm font-semibold">New Applications</h3>
            </div>
            <p className="text-[#111111] text-4xl font-bold font-display">{stats?.newApplications ?? 0}</p>
            <p className="text-[#999999] text-xs mt-1.5 uppercase tracking-wider">Awaiting review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
