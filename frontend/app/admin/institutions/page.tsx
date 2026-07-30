"use client";

import { useEffect, useState } from "react";
import { Building2, ShieldCheck, MapPin, Users, GraduationCap, ArrowRight } from "lucide-react";

export default function InstitutionsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex w-full flex-col p-8 pb-16">
      
      {/* Header */}
      <header className="relative mb-8 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[32px] font-bold leading-tight text-white">
              Partner Institutions
            </h1>
            <p className="text-[15px] text-white/80">
              Manage and track metrics for educational institutions in the RoarCast network.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm">
            <ShieldCheck size={16} className="text-[#f59e0b]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              12 Active Partners
            </span>
          </div>
        </div>
      </header>

      {/* Grid of Institutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InstitutionCard 
          name="Polytechnic University of the Philippines"
          location="Santa Rosa Campus"
          students={4250}
          courses={24}
          readiness={72}
        />
        <InstitutionCard 
          name="STI College"
          location="Balibago, Santa Rosa"
          students={1850}
          courses={15}
          readiness={68}
        />
        <InstitutionCard 
          name="Dominican College of Santa Rosa"
          location="Macabling, Santa Rosa"
          students={950}
          courses={8}
          readiness={75}
        />
        <InstitutionCard 
          name="Laguna Northwestern College"
          location="San Lorenzo, Santa Rosa"
          students={1120}
          courses={12}
          readiness={64}
        />
      </div>
    </div>
  );
}

function InstitutionCard({ name, location, students, courses, readiness }: { name: string, location: string, students: number, courses: number, readiness: number }) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm border border-black/[0.04] flex flex-col hover:shadow-md transition-shadow group cursor-pointer">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff5f5] mb-4">
        <Building2 size={24} className="text-[#6b0000]" />
      </div>
      <h3 className="font-display text-[18px] font-bold text-[#201d1d] leading-tight mb-1">{name}</h3>
      <div className="flex items-center gap-1.5 text-[#5e5a5a] text-[13px] mb-6">
        <MapPin size={14} />
        <span>{location}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1 bg-[#f8f9fa] rounded-xl p-3 border border-black/5">
          <div className="flex items-center gap-1.5 text-[#5e5a5a] text-[12px] font-bold uppercase tracking-wide">
            <Users size={14} /> Students
          </div>
          <span className="text-[18px] font-bold text-[#201d1d]">{students.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1 bg-[#f8f9fa] rounded-xl p-3 border border-black/5">
          <div className="flex items-center gap-1.5 text-[#5e5a5a] text-[12px] font-bold uppercase tracking-wide">
            <GraduationCap size={14} /> Programs
          </div>
          <span className="text-[18px] font-bold text-[#201d1d]">{courses}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-auto">
        <div className="flex flex-col gap-1 w-2/3">
          <span className="text-[12px] font-bold text-[#5e5a5a]">Avg. Readiness</span>
          <div className="h-1.5 w-full rounded-full bg-black/5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ea580c]" style={{ width: `${readiness}%` }} />
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.03] group-hover:bg-[#6b0000] group-hover:text-white transition-colors text-[#201d1d]">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
}
