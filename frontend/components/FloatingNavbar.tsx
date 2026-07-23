"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "RoarCast", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Skill Signals", href: "/#skill-signals" },
  { label: "For Institutions", href: "/#for-institutions" },
  { label: "About", href: "/#about" },
];

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        aria-label="Primary"
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-paper-line bg-white/90 px-3 py-2 backdrop-blur-md transition-shadow duration-300 sm:px-4",
          scrolled ? "shadow-capsule" : "shadow-none"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 py-1 font-display text-[15px] font-semibold tracking-tight text-ink"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-roar-maroon text-roar-yellow">
            <Radio size={15} strokeWidth={2.25} aria-hidden="true" />
          </span>
          RoarCast
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:bg-paper-dim hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-roar-maroon sm:inline-flex"
          >
            Take My Audit
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-dim md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-50 rounded-3xl border border-paper-line bg-white p-3 shadow-card md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-soft hover:bg-paper-dim hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1">
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold text-paper"
                >
                  Take My Audit
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
