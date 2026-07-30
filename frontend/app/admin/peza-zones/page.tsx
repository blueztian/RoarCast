"use client";

import { Map, Briefcase, Factory } from "lucide-react";

const zones = [
  { name: "Laguna Technopark", companies: 245, demand: "High", topSkill: "SAP ERP" },
  { name: "Greenfield Automotive Park", companies: 85, demand: "Medium", topSkill: "PLC Programming" },
  { name: "Daystar Santa Rosa Industrial Park", companies: 42, demand: "Medium", topSkill: "Quality Assurance" },
  { name: "Toyota Special Economic Zone", companies: 1, demand: "Low", topSkill: "Lean Manufacturing" },
];

export default function PezaZonesPage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex flex-col gap-1.5">
          <h1 className="font-display text-[28px] font-bold leading-tight text-white">PEZA Zones</h1>
          <p className="text-[14.5px] text-white/80">Geographic mapping of industry demand across local economic zones.</p>
        </div>
      </header>

      <div className="flex gap-6">
        <div className="flex-1 bg-white border border-black/[0.06] rounded-xl p-2 shadow-sm overflow-hidden min-h-[500px]">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '8px' }} 
            loading="lazy" 
            allowFullScreen 
            referrerPolicy="no-referrer-when-downgrade" 
            src="https://maps.google.com/maps?q=Laguna%20Technopark,%20Santa%20Rosa,%20Laguna&t=&z=13&ie=UTF8&iwloc=&output=embed">
          </iframe>
        </div>

        <div className="w-[350px] shrink-0 flex flex-col gap-4">
          {zones.map((zone) => (
            <div key={zone.name} className="bg-white border border-black/[0.06] rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[15px] text-[#201d1d] mb-3">{zone.name}</h3>
              <div className="space-y-2 text-[13px] text-[#5e5a5a]">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5"><Factory size={14} /> Companies</span>
                  <span className="font-bold text-[#201d1d]">{zone.companies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5"><Briefcase size={14} /> Top Skill Demand</span>
                  <span className="font-bold text-[#6b0000]">{zone.topSkill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
