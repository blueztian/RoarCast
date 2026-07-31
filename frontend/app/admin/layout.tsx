"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Settings, UserCircle, 
  Focus, Building2, LineChart, BarChart4
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isWorkforceActive = pathname === "/admin" || pathname === "/admin/workforce-intelligence";

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] font-sans overflow-hidden text-[#201d1d]">
      
      {/* ── Left Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="flex w-[260px] flex-col border-r border-black/[0.06] bg-white shrink-0">
        <div className="flex h-16 shrink-0 items-center gap-3 px-6 pb-2 pt-6">
          <img src="/assets/roarcast_logo.png" alt="RoarCast Logo" className="h-8 w-8 rounded-full object-cover mix-blend-multiply" />
          <span className="font-display text-[15px] font-bold tracking-tight text-[#201d1d]">
            RoarCast <span className="text-[#6b0000]">ADMIN</span>
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 pt-6">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === "/admin"} />
          <NavItem href="/admin/workforce-intelligence" icon={<LineChart size={18} />} label="Workforce Intelligence" active={pathname === "/admin/workforce-intelligence"} />
          <NavItem href="/admin/skill-gaps" icon={<Focus size={18} />} label="Skill Gaps" active={pathname === "/admin/skill-gaps"} />
          <NavItem href="/admin/institutions" icon={<Building2 size={18} />} label="Institutions" active={pathname === "/admin/institutions"} />
          <NavItem href="/admin/peza-zones" icon={<Map size={18} />} label="PEZA Zones" active={pathname === "/admin/peza-zones"} />
          <NavItem href="/admin/reports" icon={<BarChart4 size={18} />} label="Reports" active={pathname === "/admin/reports"} />
        </nav>

        <div className="flex flex-col gap-1 border-t border-black/[0.06] p-4">
          <NavItem href="/admin/settings" icon={<Settings size={18} />} label="Settings" active={pathname === "/admin/settings"} />
          <NavItem href="/admin/profile" icon={<UserCircle size={18} />} label="Admin Profile" active={pathname === "/admin/profile"} />
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
        active ? "bg-[#fff5f5] text-[#6b0000] font-bold" : "text-[#5e5a5a] hover:bg-black/[0.02]"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
