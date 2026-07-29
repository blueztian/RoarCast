"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Route, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { careerPaths, roleIntelligenceCards } from "@/data/industryPulse";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CareerPathsPage() {
  return (
    <Suspense fallback={null}>
      <CareerPathsContent />
    </Suspense>
  );
}

function CareerPathsContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"paths" | "roles">("paths");

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("tab") === "roles") setActiveTab("roles");
  }, [searchParams]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/explore"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Explore"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-tight text-white">
            Career Paths
          </h1>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-4 pb-12"
      >
        <motion.div
          variants={fadeUpItem}
          className="flex rounded-full bg-white p-1 shadow-sm border border-black/[0.05]"
        >
          <button
            onClick={() => setActiveTab("paths")}
            className={cn(
              "flex-1 rounded-full py-2 text-[12.5px] font-bold transition-colors",
              activeTab === "paths" ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-[#faf9f8]"
            )}
          >
            Career Paths
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={cn(
              "flex-1 rounded-full py-2 text-[12.5px] font-bold transition-colors",
              activeTab === "roles" ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-[#faf9f8]"
            )}
          >
            Roles
          </button>
        </motion.div>

        {activeTab === "paths" ? (
          <>
            <motion.div variants={fadeUpItem} className="flex flex-col gap-2.5">
              {careerPaths.map((path) => (
                <button
                  key={path.role}
                  className="flex items-center justify-between rounded-[16px] border border-black/[0.05] bg-white p-3.5 text-left shadow-sm transition-colors hover:bg-[#faf9f8]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                      <Route size={18} className="text-[#f59e0b]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13.5px] font-bold leading-tight text-[#201d1d]">
                        {path.role}
                      </span>
                      <span className="mt-0.5 text-[11.5px] text-[#7a7373]">
                        {path.industry} · {path.match}% match
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-[#9c9595]" />
                </button>
              ))}
            </motion.div>
            <motion.button
              variants={fadeUpItem}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-2.5 text-[12.5px] font-bold text-[#201d1d] shadow-sm hover:bg-[#faf9f8]"
            >
              Explore more roles <ChevronRight size={14} />
            </motion.button>
          </>
        ) : (
          <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
            {roleIntelligenceCards.map((role, idx) => (
              <div
                key={role.role}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[20px] p-4 shadow-sm relative",
                  idx === 0 ? "border-[1.5px] border-[#6b0000] bg-white" : "border border-black/[0.05] bg-white"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-3">
                    <h3 className="text-[14.5px] font-bold leading-snug text-[#201d1d]">
                      {role.role}
                    </h3>
                    <p className="mt-1 text-[12px] font-medium text-[#7a7373]">
                      {role.opportunities} opportunities analyzed
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="relative flex h-[48px] w-[48px] items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                        <path
                          className="stroke-black/[0.06]"
                          strokeWidth="4"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-[#6b0000]"
                          strokeWidth="4"
                          strokeDasharray={`${role.match}, 100`}
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="font-display text-[13px] font-bold text-[#201d1d]">
                        {role.match}%
                      </span>
                    </div>
                    <span className="mt-1 text-[10px] font-bold text-[#7a7373]">match</span>
                  </div>
                </div>

                <div className="mb-1 mt-4">
                  <p className="mb-2 text-[11px] font-medium text-[#7a7373]">Top Skill Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {role.skillTags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-[11px] font-medium",
                          idx === 0
                            ? "border-[#6b0000]/15 bg-[#6b0000]/5 text-[#6b0000]"
                            : "border-black/[0.06] bg-white text-[#5e5a5a]"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-end pt-2 text-[11.5px] font-bold">
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      role.metadata.demand.includes("High") ? "text-[#6b0000]" : "text-[#f59e0b]"
                    )}
                  >
                    <TrendingUp size={14} strokeWidth={3} /> {role.metadata.demand}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
