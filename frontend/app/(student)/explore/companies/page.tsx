"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Factory, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/useScrolled";
import { hiringCompanies, pezaZonesData } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Header height (px), and how far the rounded content sheet overlaps its
// bottom edge while at rest (before scrolling). Kept in one place so the
// header, the scroll-triggered spacer, and the overlap all stay in sync.
const HEADER_H = 84;
const OVERLAP = 24;

function CompanyLogo({ domain, name }: { domain?: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!domain || failed) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6b0000]/8">
        <Building2 size={18} className="text-[#6b0000]" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://unavatar.io/${domain}?fallback=false`}
        alt={`${name} logo`}
        className="h-full w-full object-contain p-1.5"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function CompaniesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"companies" | "peza">("companies");
  const scrolled = useScrolled();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* -- Header ------------------------------------------------------------
          The header is always pinned to the top (`fixed`); its own visual
          style is untouched. The spacer below keeps its place in flow so
          content isn't hidden underneath it. */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-0 flex items-center overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-7 transition-shadow duration-200",
          scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.15)]" : "shadow-none"
        )}
        style={{ height: HEADER_H }}
      >
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/explore"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Explore"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="font-display text-[16.5px] font-bold leading-tight tracking-tight text-white">
            Hiring Companies
          </h1>
        </div>
      </header>

      {/* Spacer keeps the header's place in flow now that it's always fixed. */}
      <div style={{ height: HEADER_H }} aria-hidden="true" />

      {/* -- Content sheet ------------------------------------------------------ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col gap-4 bg-white px-4 pb-12 pt-6 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] transition-[margin-top,border-radius] duration-200"
        style={{
          marginTop: scrolled ? 0 : -OVERLAP,
          borderTopLeftRadius: scrolled ? 0 : 32,
          borderTopRightRadius: scrolled ? 0 : 32,
        }}
      >
        <motion.div
          variants={fadeUpItem}
          className="flex rounded-full bg-[#f5f3f0] p-1 shadow-inner border border-black/[0.05]"
        >
          <button
            onClick={() => setActiveTab("companies")}
            className={cn(
              "flex-1 rounded-full py-2 text-[12.5px] font-bold transition-colors",
              activeTab === "companies" ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-white"
            )}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab("peza")}
            className={cn(
              "flex-1 rounded-full py-2 text-[12.5px] font-bold transition-colors",
              activeTab === "peza" ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-white"
            )}
          >
            PEZA Zones
          </button>
        </motion.div>

        {activeTab === "companies" ? (
          <>
            <motion.div variants={fadeUpItem} className="flex flex-col gap-2.5">
              {hiringCompanies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white p-3.5 shadow-sm"
                >
                  <CompanyLogo domain={company.domain} name={company.name} />
                  <div className="flex flex-1 flex-col">
                    <span className="text-[13.5px] font-bold leading-tight text-[#201d1d]">
                      {company.name}
                    </span>
                    <span className="mt-0.5 text-[11.5px] text-[#7a7373]">
                      {company.industry} · {company.zone}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#fff8ee] px-2.5 py-1 text-[11px] font-bold text-[#d97706]">
                    {company.openings} openings
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.button
              variants={fadeUpItem}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-2.5 text-[12.5px] font-bold text-[#201d1d] shadow-sm hover:bg-[#faf9f8]"
            >
              View all companies <ChevronRight size={14} />
            </motion.button>
          </>
        ) : (
          <motion.div variants={fadeUpItem} className="flex flex-col gap-2.5">
            {pezaZonesData.map((zone) => (
              <div
                key={zone.name}
                className="flex items-center gap-3 rounded-[16px] border border-black/[0.05] bg-white p-3.5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/10">
                  <Factory size={18} className="text-[#f59e0b]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-[13.5px] font-bold leading-tight text-[#201d1d]">
                    {zone.name}
                  </span>
                  <span className="mt-0.5 text-[11.5px] text-[#7a7373]">
                    {zone.industries}
                  </span>
                </div>
                <span className="shrink-0 text-[11px] font-bold text-[#7a7373]">
                  {zone.employers} employers
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
