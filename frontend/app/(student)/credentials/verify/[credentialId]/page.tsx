"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, QrCode, CheckCircle2, ShieldCheck } from "lucide-react";
import SignalBackground from "@/components/SignalBackground";
import { credentialsData } from "@/data/mockLearn";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function VerifyCredentialPage({
  params,
}: {
  params: { credentialId: string };
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const cred = credentialsData.find((c) => c.id === params.credentialId);
  if (!cred) return notFound();

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f5f3f0] font-sans pb-28">
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col justify-end overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-5 pb-5 rounded-b-[2.5rem] shadow-sm transition-all" style={{ height: 120 }}>
        <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/credentials"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Back to Credentials"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-[20px] font-bold leading-tight tracking-tight text-white">
            Verify Credential
          </h1>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[120px] shrink-0" aria-hidden="true" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative z-10 mx-4 mt-2 flex flex-col gap-4 pb-12"
      >
        <div className="flex flex-col items-center rounded-[28px] bg-white p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#7a7373]">
            Certificate of Completion
          </span>
          <h2 className="mt-1.5 font-display text-[19px] font-bold leading-tight text-[#201d1d]">
            {cred.title}
          </h2>

          <div className="mt-5 flex h-[176px] w-[176px] items-center justify-center rounded-[20px] border border-black/[0.06] bg-white shadow-sm">
            <QrCode size={130} className="text-[#201d1d]" strokeWidth={0.9} />
          </div>

          <div className="mt-5 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700 border border-emerald-100">
            <CheckCircle2 size={14} strokeWidth={2.5} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Verified
            </span>
          </div>

          <div className="mt-5 flex w-full flex-col gap-2.5 border-t border-black/[0.06] pt-5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#7a7373]">Issued to</span>
              <span className="text-[12.5px] font-bold text-[#201d1d]">{cred.issuedTo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#7a7373]">Issued</span>
              <span className="text-[12.5px] font-bold text-[#201d1d]">{cred.issued}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#7a7373]">Credential ID</span>
              <span className="text-[12.5px] font-bold text-[#201d1d]">{cred.credentialId}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5 border-t border-black/[0.06] pt-5">
            {cred.competencies.map((comp) => (
              <span
                key={comp}
                className="rounded-md bg-[#faf9f8] border border-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#201d1d]"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-[18px] bg-white p-4 shadow-sm border border-black/[0.05]">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#6b0000]" />
          <p className="text-[11.5px] leading-snug text-[#7a7373]">
            This credential can be verified independently by scanning the QR code above or referencing the Credential ID with RoarCast.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
