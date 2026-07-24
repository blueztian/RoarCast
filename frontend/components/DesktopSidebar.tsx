"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Home, BarChart2, Target, Users, ShieldCheck, Briefcase, HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/", icon: Home },
  { label: "Industry Pulse", href: "/dashboard", icon: BarChart2 },
  { label: "Skill Audit", href: "/audit", icon: Target },
  { label: "Upskilling Squads", href: "/squads", icon: Users },
  { label: "Credentials", href: "/credentials/erp-workflow", icon: ShieldCheck },
  { label: "Opportunities", href: "/opportunities", icon: Briefcase },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        pathname.startsWith("/skills")
      );
    }
    if (href === "/audit") {
      return pathname.startsWith("/assessment") || pathname.startsWith("/results") || pathname === "/audit";
    }
    if (href === "/squads") {
      return pathname.startsWith("/squads") || pathname.startsWith("/learn");
    }
    if (href.startsWith("/credentials")) {
      return pathname.startsWith("/credentials");
    }
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-black/[0.04] bg-[#fcfbf9] py-8 md:flex">
      {/* Logo */}
      <Link href="/dashboard" className="mb-10 flex items-center gap-2.5 px-6 font-display text-[22px] font-bold tracking-tight text-[#201d1d]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6b0000] shadow-sm">
          <Radio size={18} strokeWidth={2.5} className="text-[#f59e0b]" aria-hidden="true" />
        </span>
        RoarCast
      </Link>

      {/* Primary Nav */}
      <nav aria-label="Sidebar Navigation" className="flex flex-1 flex-col gap-1 pr-4">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 py-3 pl-8 pr-4 text-[15px] font-medium transition-all",
                active
                  ? "bg-[#6b0000] text-white rounded-r-xl shadow-md"
                  : "text-[#5e5a5a] hover:bg-black/[0.03] hover:text-[#201d1d] rounded-r-xl"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} className={cn(active ? "text-white" : "text-[#7a7373]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-4 px-6 pt-4">
        <Link
          href="/help"
          className="flex items-center gap-3 py-2 text-[15px] font-medium text-[#5e5a5a] transition-colors hover:text-[#201d1d]"
        >
          <HelpCircle size={20} className="text-[#7a7373]" />
          Help
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.pravatar.cc/150?img=5" 
              alt="Jana Dela Cruz" 
              className="h-10 w-10 rounded-full object-cover shadow-sm border border-black/[0.05]"
            />
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#201d1d] leading-tight">Jana Dela Cruz</span>
              <span className="text-[11px] text-text-secondary mt-0.5">Student</span>
            </div>
          </div>
          <ChevronDown size={16} className="text-text-secondary" />
        </div>
      </div>
    </aside>
  );
}
