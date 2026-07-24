"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, CheckCircle2, QrCode, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const credentialsData = [
  {
    id: "sap-erp",
    title: "SAP ERP Foundations",
    issuedTo: "Jana Dela Cruz",
    issued: "July 24, 2026",
    credentialId: "RC-SAP-2026-00184",
    competencies: [
      "ERP Fundamentals",
      "SAP Navigation",
      "Financial Accounting Workflow"
    ],
    verified: true,
  },
  {
    id: "advanced-excel",
    title: "Advanced Excel for Operations",
    issuedTo: "Jana Dela Cruz",
    issued: "June 18, 2026",
    competencies: [
      "Advanced Formulas",
      "PivotTables",
      "Data Cleaning"
    ],
    verified: true,
  },
  {
    id: "financial-reconciliation",
    title: "Financial Data Reconciliation",
    issuedTo: "Jana Dela Cruz",
    issued: "May 30, 2026",
    competencies: [
      "Transaction Matching",
      "Error Detection",
      "Reconciliation Workflow"
    ],
    verified: true,
  }
];

export default function CredentialsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pt-12 pb-14 rounded-b-[2.5rem]">
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <Award size={26} className="text-[#f59e0b]" strokeWidth={2} />
            <h1 className="font-display text-[24px] font-bold leading-tight tracking-tight text-white">
              Credentials
            </h1>
          </div>
          <span className="absolute -top-6 left-[36px] text-[11px] font-bold uppercase tracking-widest text-[#f59e0b]">
            Your Achievements
          </span>
          <p className="mt-1 text-[13.5px] text-white/80 ml-[36px]">
            Skills you’ve completed and can carry beyond RoarCast.
          </p>
        </div>
      </header>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-4 -mt-8 flex flex-col gap-4 pb-12"
      >
        {/* ── 2. Main Content Intro ─────────────────────────────────────────── */}
        <motion.div variants={fadeUpItem} className="flex flex-col gap-1 px-1">
          <h2 className="font-display text-[18px] font-bold text-[#201d1d]">
            Your verified credentials
          </h2>
          <p className="text-[12.5px] leading-snug text-[#7a7373]">
            Tap a credential to view its competencies and verification details.
          </p>
        </motion.div>

        {/* ── 3. Credential Cards ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mt-2">
          {credentialsData.map((cred, index) => (
            <motion.div
              key={cred.id}
              variants={fadeUpItem}
              className="flex flex-col overflow-hidden rounded-[24px] bg-white border-l-4 border-l-[#6b0000] border-y border-r border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col p-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-display text-[18px] font-bold leading-tight text-[#201d1d] pr-2">
                      {cred.title}
                    </h3>
                    <p className="mt-1 text-[12px] text-[#7a7373]">
                      Issued: {cred.issued}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-100">
                    <CheckCircle2 size={12} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a7373]">
                    Competencies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cred.competencies.map((comp) => (
                      <span key={comp} className="rounded-md bg-[#faf9f8] border border-black/[0.04] px-2.5 py-1.5 text-[11.5px] font-medium text-[#201d1d]">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
                
                {cred.credentialId && (
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-[#9c9595]">
                    <ShieldCheck size={14} /> Credential ID: {cred.credentialId}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-black/[0.05] bg-[#faf9f8] p-4">
                <div className="flex items-center gap-2 text-[#7a7373]">
                  <QrCode size={18} />
                  <span className="text-[12px] font-bold">QR verifiable</span>
                </div>

                <Link
                  href={`/credentials/${cred.id}`}
                  className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 border border-black/[0.08] text-[12.5px] font-bold text-[#201d1d] shadow-sm transition-colors hover:bg-[#f0ede9]"
                >
                  View credential <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 4. Optional In Progress Area ──────────────────────────────────── */}
        <motion.div variants={fadeUpItem} className="mt-4 flex flex-col gap-3 px-1">
          <h2 className="font-display text-[16px] font-bold text-[#201d1d]">
            Next credential
          </h2>
          <div className="flex flex-col rounded-[20px] border border-[#f59e0b]/20 bg-[#fff8ee] p-4 shadow-sm">
            <h3 className="font-display text-[15px] font-bold text-[#201d1d]">
              SAP ERP Advanced Operations
            </h3>
            
            <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-[#7a7373]">
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
