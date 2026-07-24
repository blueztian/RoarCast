"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, LayoutDashboard, Compass, ShieldCheck, UserCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Credentials", href: "/credentials/erp-workflow", icon: ShieldCheck },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  // Helper to determine active state across secondary routes
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        pathname.startsWith("/assessment") ||
        pathname.startsWith("/results") ||
        pathname.startsWith("/skills")
      );
    }
    if (href === "/explore") {
      return pathname.startsWith("/explore") || pathname.startsWith("/squads") || pathname.startsWith("/learn");
    }
    if (href.startsWith("/credentials")) {
      return pathname.startsWith("/credentials");
    }
    if (href === "/profile") {
      return pathname.startsWith("/profile") || pathname.startsWith("/help");
    }
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border-subtle bg-surface px-4 py-6 md:flex">
      {/* Logo */}
      <Link href="/dashboard" className="mb-10 flex items-center gap-2 px-2 font-display text-xl font-bold tracking-tight text-ink">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-brand-signal">
          <Radio size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
        RoarCast
      </Link>

      {/* Primary Nav */}
      <nav aria-label="Sidebar Navigation" className="flex flex-1 flex-col gap-1.5">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
                active
                  ? "bg-brand-primary/[0.06] text-brand-primary"
                  : "text-text-secondary hover:bg-paper-dim hover:text-ink"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-4 border-t border-border-subtle pt-4">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-text-secondary transition-colors hover:bg-paper-dim hover:text-ink"
        >
          <HelpCircle size={18} />
          Help
        </Link>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-dim text-sm font-semibold text-ink">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-ink">Jana Dela Cruz</span>
            <span className="text-xs text-text-secondary">Student</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
