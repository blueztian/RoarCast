"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Home, Compass, ShieldCheck, UserCircle, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Credentials", href: "/credentials/erp-workflow", icon: ShieldCheck },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export default function DesktopTopNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
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
    <header className="fixed top-0 inset-x-0 z-50 hidden h-[76px] w-full items-center bg-white border-b border-black/[0.06] shadow-sm md:flex px-8">
      {/* Logo */}
      <div className="flex w-64 shrink-0 items-center">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-display text-[22px] font-bold tracking-tight text-[#6b0000]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6b0000] shadow-sm">
            <Radio size={18} strokeWidth={2.5} className="text-[#f59e0b]" aria-hidden="true" />
          </span>
          RoarCast
        </Link>
      </div>

      {/* Primary Nav */}
      <nav aria-label="Desktop Navigation" className="flex flex-1 items-center justify-center gap-8 h-full">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex h-full items-center gap-2.5 px-3 text-[15px] font-bold transition-colors",
                active
                  ? "text-[#6b0000]"
                  : "text-[#5e5a5a] hover:text-[#201d1d]"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} className={cn(active ? "text-[#6b0000]" : "text-[#7a7373]")} />
              {item.label}
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6b0000] rounded-t-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex w-64 shrink-0 items-center justify-end gap-6">
        <button aria-label="Notifications" className="relative transition-colors text-[#5e5a5a] hover:text-[#201d1d]">
          <Bell size={22} strokeWidth={2} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-[#6b0000]" />
        </button>

        <div className="h-8 w-[1px] bg-black/[0.08]" />

        <button className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img 
            src="https://i.pravatar.cc/150?img=5" 
            alt="Jana D." 
            className="h-10 w-10 rounded-full object-cover shadow-sm border border-black/[0.05]"
          />
          <div className="flex flex-col text-left">
            <span className="text-[13px] font-bold text-[#201d1d] leading-tight">Jana D.</span>
            <span className="text-[11px] font-medium text-text-secondary mt-0.5">Student</span>
          </div>
          <ChevronDown size={16} className="text-text-secondary ml-1" />
        </button>
      </div>
    </header>
  );
}
