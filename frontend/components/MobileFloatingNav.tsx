"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, ShieldCheck, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Credentials", href: "/credentials/erp-workflow", icon: ShieldCheck },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export default function MobileFloatingNav() {
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
    <div className="fixed inset-x-0 bottom-6 z-50 px-4 md:hidden">
      <nav
        aria-label="Mobile Navigation"
        className="mx-auto flex h-16 w-full max-w-sm items-center justify-around rounded-full border border-border-subtle bg-surface/90 px-2 shadow-capsule backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-12 w-16 flex-col items-center justify-center gap-1 rounded-full transition-colors",
                active ? "text-brand-primary" : "text-text-secondary hover:text-ink"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
