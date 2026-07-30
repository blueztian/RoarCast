"use client";

import { Building, GraduationCap, MapPin, ExternalLink } from "lucide-react";

const institutions = [
  { name: "Santa Rosa Science and Technology University", type: "University", students: 4200, matchScore: 78 },
  { name: "Laguna Polytechnic College", type: "College", students: 1850, matchScore: 65 },
  { name: "South Luzon Vocational Institute", type: "Vocational", students: 940, matchScore: 82 },
  { name: "Santa Rosa City College", type: "College", students: 3100, matchScore: 59 },
];

export default function InstitutionsPage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex flex-col gap-1.5">
          <h1 className="font-display text-[28px] font-bold leading-tight text-white">Partner Institutions</h1>
          <p className="text-[14.5px] text-white/80">Manage and monitor participating educational institutions in the network.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {institutions.map((inst) => (
          <div key={inst.name} className="bg-white border border-black/[0.06] rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black/[0.03] flex items-center justify-center text-[#6b0000]">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#201d1d]">{inst.name}</h3>
                  <span className="text-[12px] text-[#7a7373] uppercase tracking-wider font-semibold">{inst.type}</span>
                </div>
              </div>
              <button className="text-[#9c9595] hover:text-[#6b0000]">
                <ExternalLink size={18} />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-black/[0.05] pt-4">
              <div>
                <span className="text-[12px] text-[#7a7373] flex items-center gap-1.5 mb-1"><GraduationCap size={14}/> Enrolled Students</span>
                <span className="text-[18px] font-bold font-display text-[#201d1d]">{inst.students.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[12px] text-[#7a7373] flex items-center gap-1.5 mb-1"><MapPin size={14}/> Curriculum Match</span>
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold font-display text-[#201d1d]">{inst.matchScore}%</span>
                  <div className="flex-1 h-2 bg-black/[0.05] rounded-full">
                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${inst.matchScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
