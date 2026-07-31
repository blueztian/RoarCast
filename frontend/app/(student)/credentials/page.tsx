"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ArrowRight, UserSquare2, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";
import SignalBackground from "@/components/SignalBackground";
import { cn } from "@/lib/utils";
import { credentialsData } from "@/data/mockLearn";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const badgesData = [
  { id: "sap-erp-badge", title: "SAP ERP Fundamentals", earned: true, earnedDate: "July 24, 2026" },
  { id: "excel-badge", title: "Advanced Excel Pro", earned: true, earnedDate: "June 18, 2026" },
  { id: "reconciliation-badge", title: "Financial Reconciliation", earned: true, earnedDate: "May 30, 2026" },
  { id: "erp-systems-badge", title: "ERP Systems Essentials", earned: false, earnedDate: null },
];

export default function CredentialsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"credentials" | "badges">("credentials");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-0">
      <div className="sticky top-0 z-30">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-6 pb-7 rounded-b-[2.5rem]">
          <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award size={26} className="text-[#f59e0b]" strokeWidth={2} />
                <h1 className="font-display text-[22px] font-bold leading-tight tracking-tight text-white">
                  Credentials
                </h1>
              </div>
              <button className="relative p-1.5" aria-label="Notifications">
                <Bell size={24} className="text-white" strokeWidth={1.5} />
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#4a0000] bg-[#f59e0b]"
                />
              </button>
            </div>
            <p className="mt-2 text-[13.5px] text-white/80">
              Skills youÃ¢â‚¬â„¢ve completed and can carry beyond RoarCast.
            </p>
          </div>
        </header>

      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 flex flex-col gap-3 pt-2 pb-0"
      >
        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Credentials / Badges tab toggle Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <motion.div
          variants={fadeUpItem}
          className="flex rounded-full bg-white p-1 shadow-sm border border-black/[0.05]"
        >
          {(["credentials", "badges"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-full py-2 text-[15px] font-bold capitalize transition-colors",
                activeTab === tab ? "bg-[#6b0000] text-white" : "text-[#7a7373] hover:bg-[#faf9f8]"
              )}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {activeTab === "credentials" ? (
          <>
            {/* The first credential card overlaps the red header, fixing the text overlap issue. */}
            {credentialsData.map((cred) => (
              <CredentialCard key={cred.id} cred={cred} />
            ))}
            <motion.button
              variants={fadeUpItem}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-2.5 text-[15px] font-bold text-[#201d1d] shadow-sm hover:bg-[#faf9f8]"
            >
              View all credentials <ArrowRight size={14} />
            </motion.button>
          </>
        ) : (
          <motion.div variants={fadeUpItem} className="grid grid-cols-2 gap-3">
            {badgesData.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center rounded-[20px] border p-4 text-center shadow-sm",
                  badge.earned
                    ? "border-[#f59e0b]/25 bg-white"
                    : "border-black/[0.05] bg-[#faf9f8] opacity-60"
                )}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    badge.earned ? "bg-gradient-to-br from-[#f59e0b] to-[#d97706]" : "bg-black/[0.06]"
                  )}
                >
                  <Award size={24} className={badge.earned ? "text-white" : "text-[#9c9595]"} />
                </div>
                <span className="mt-2.5 text-[16px] font-bold leading-tight text-[#201d1d]">
                  {badge.title}
                </span>
                <span className="mt-1 text-[14px] text-[#7a7373]">
                  {badge.earned ? `Earned ${badge.earnedDate}` : "Not yet earned"}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Ã¢â€â‚¬Ã¢â€â‚¬ Optional In Progress Area Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
        <motion.div variants={fadeUpItem} className="mt-2 flex flex-col gap-2 px-1">
          <h2 className="font-display text-[18.5px] font-bold text-[#201d1d]">
            Next credential
          </h2>
          <div className="flex flex-col rounded-[20px] border border-[#f59e0b]/20 bg-[#fff8ee] p-4 shadow-sm">
            <h3 className="font-display text-[17.5px] font-bold text-[#201d1d]">
              SAP ERP Advanced Operations
            </h3>
            <div className="mt-2 flex items-center justify-between text-[13.5px] font-medium text-[#7a7373]">
              <span>62% complete</span>
              <Link href="/learn" className="flex items-center gap-1 font-bold text-[#d97706] hover:underline">
                Continue learning <ArrowRight size={12} />
              </Link>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#f0ede9]">
              <div className="h-full bg-[#f59e0b]" style={{ width: `62%` }} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CredentialCard({ cred }: { cred: any }) {
  return (
    <motion.div variants={fadeUpItem}>
      <Link
        href={`/credentials/verify/${cred.id}`}
        className="flex flex-col rounded-[20px] bg-white border-l-4 border-l-[#6b0000] border-y border-r border-black/[0.05] px-4 py-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#faf9f8]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="font-display text-[18px] font-bold leading-tight text-[#201d1d] pr-2">
              {cred.title}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-[#7a7373]">
              Issued: {cred.issued}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700 border border-emerald-100">
            <CheckCircle2 size={12} strokeWidth={2.5} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Verified
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          <div className="flex flex-1 flex-wrap gap-1.5">
            {cred.competencies.map((comp: string) => (
              <span key={comp} className="rounded-md bg-[#faf9f8] border border-black/[0.04] px-2 py-1 text-[13px] font-medium text-[#201d1d]">
                {comp}
              </span>
            ))}
          </div>
          <ChevronRight size={18} className="shrink-0 text-[#9c9595]" />
        </div>
      </Link>
    </motion.div>
  );
}
