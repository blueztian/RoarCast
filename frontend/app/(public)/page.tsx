"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import SignalBackground from "@/components/SignalBackground";

const staggerUp = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-[100dvh] justify-center bg-[#201d1d]">
      <div className="relative flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden bg-[#f5f3f0]">
        <div className="flex h-full flex-col">
          {/* Dark maroon hero — matches student application visual identity */}
          <div className="relative flex flex-[1.2] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] px-6 pb-14">
            <SignalBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />

            <motion.div
              className="relative z-10 flex flex-col items-center gap-5"
              variants={staggerUp}
              initial="hidden"
              animate="show"
            >
              {/* Logo — breathing pulse micro-animation */}
              <motion.div
                variants={fadeUp}
                animate={{ scale: [1, 1.05, 1], opacity: [0.88, 1, 0.88] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-[26px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.35)]"
              >
                <Image
                  src="/assets/roarcast_logo.png"
                  alt="RoarCast"
                  width={90}
                  height={90}
                  className="h-full w-full object-cover"
                  priority
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
                <h1 className="font-display text-[22px] font-bold tracking-tight text-white">
                  RoarCast
                </h1>
                <p className="text-center text-[15.5px] font-medium leading-snug text-white/80">
                  Know what industries need.<br />
                  Prepare before you graduate.
                </p>
              </motion.div>

              {/* Flow progression indicator */}
              <motion.div variants={fadeUp} className="flex items-center gap-1.5">
                {["Industry Demand", "Skill Gap", "Upskilling"].map((label, i) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-white/60">{label}</span>
                    {i < 2 && <span className="text-white/30">→</span>}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* White bottom sheet */}
          <div className="relative z-10 -mt-8 flex flex-col rounded-t-[2.5rem] bg-white px-6 pt-7 pb-10 shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">
            <p className="mb-6 text-center text-[14px] leading-relaxed text-[#5e5a5a]">
              RoarCast helps students discover the skills employers are looking for, identify their readiness gaps, and build a pathway toward industry-aligned opportunities.
            </p>

            <motion.button
              id="cta-start-audit"
              onClick={() => router.push("/audit")}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-full bg-gradient-to-r from-[#6b0000] to-[#4a0000] py-4 text-[16px] font-bold tracking-tight text-white shadow-[0_4px_24px_rgba(107,0,0,0.35)] transition-shadow hover:shadow-[0_6px_28px_rgba(107,0,0,0.45)]"
            >
              Start 60-Second Micro-Audit
            </motion.button>

            <p className="mt-3 text-center text-[12.5px] text-[#9c9595]">
              Discover your workforce readiness & upskilling pathway
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
              <span className="text-[11.5px] text-[#9c9595]">
                For students in Santa Rosa&apos;s PEZA corridor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
