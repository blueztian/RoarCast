"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      {/* Gradient fade to prevent text collision */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/80 to-transparent pointer-events-none" />
      
      <div className="relative px-5 pb-6 pt-8">
        <nav
          aria-label="Mobile Navigation"
          className="mx-auto flex h-[68px] w-full max-w-sm items-center justify-around rounded-[2rem] border border-white bg-white/60 px-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60"
        >
          {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex h-full w-16 flex-col items-center justify-center gap-1 transition-colors",
                  active ? "text-[#6b0000]" : "text-[#7a7373] hover:text-[#201d1d]"
                )}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 h-[4px] w-8 rounded-b-md bg-[#6b0000]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-semibold tracking-wide">
                  {item.label}
                </span>
              </Link>
          );
        })}
      </nav>
      </div>
    </div>
  );
}
