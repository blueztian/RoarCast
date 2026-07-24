"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { House, Compass, BookOpen, ShieldCheck, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/dashboard",
    icon: House,
    activeRoutes: ["/dashboard", "/assessment", "/results", "/skills"],
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
    activeRoutes: ["/explore"],
  },
  {
    label: "Learn",
    href: "/learn",
    icon: BookOpen,
    activeRoutes: ["/learn", "/squads"],
  },
  {
    label: "Credentials",
    href: "/credentials",
    icon: ShieldCheck,
    activeRoutes: ["/credentials", "/audit"],
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCircle,
    activeRoutes: ["/profile", "/help"],
  },
];

export default function MobileFloatingNav() {
  const pathname = usePathname();

  const isActive = (item: (typeof NAV_ITEMS)[0]) =>
    item.activeRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      {/* Gradient scrim — blends page content into nav */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#faf9f7] via-[#faf9f7]/70 to-transparent"
      />

      {/* Capsule nav */}
      <div className="relative px-4 pb-5 pt-10">
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex h-[62px] w-full max-w-[360px] items-center justify-around",
            "rounded-[999px] border border-white/80",
            "bg-white/55 backdrop-blur-3xl",
            "shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]",
          )}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center gap-[3px]",
                  "h-full rounded-full transition-colors duration-200",
                  active
                    ? "text-[#6b0000]"
                    : "text-[#9c9595] hover:text-[#4a0404]"
                )}
              >
                {/* Active pill indicator */}
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-1 rounded-full bg-[#6b0000]/[0.07]"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  size={19}
                  strokeWidth={active ? 2.5 : 1.9}
                  className="relative z-10"
                />
                <span className="relative z-10 text-[9.5px] font-semibold tracking-wide">
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
