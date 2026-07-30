"use client";

import { Search, Filter, ArrowDownToLine, MoreHorizontal } from "lucide-react";

const gaps = [
  { skill: "SAP ERP", category: "Technical", demand: "82%", readiness: "31%", gap: 51, priority: "High" },
  { skill: "PLC Programming", category: "Engineering", demand: "74%", readiness: "29%", gap: 45, priority: "High" },
  { skill: "Quality Assurance Systems", category: "Operations", demand: "69%", readiness: "36%", gap: 33, priority: "Medium" },
  { skill: "Advanced Excel", category: "Technical", demand: "72%", readiness: "51%", gap: 21, priority: "Medium" },
  { skill: "Power BI", category: "Technical", demand: "58%", readiness: "42%", gap: 16, priority: "Low" },
];

export default function SkillGapsPage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[28px] font-bold leading-tight text-white">Detailed Skill Gaps</h1>
            <p className="text-[14.5px] text-white/80">Comprehensive view of skill deficiencies across all tracked programs.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-black/20 text-white rounded-lg text-[13px] font-bold shadow-sm hover:bg-black/40 backdrop-blur-sm transition-colors">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#6b0000] rounded-lg text-[13px] font-bold shadow-sm hover:bg-white/90 transition-colors">
              <ArrowDownToLine size={16} /> Export CSV
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border border-black/[0.06] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/[0.06] flex items-center bg-[#faf9f8]">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9595]" />
            <input 
              type="text" 
              placeholder="Search skills or categories..." 
              className="w-full pl-9 pr-4 py-2 text-[13px] bg-white border border-black/[0.08] rounded-md focus:outline-none focus:border-[#6b0000]"
            />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/[0.06] text-[11px] uppercase tracking-wider text-[#7a7373] bg-[#faf9f8]">
              <th className="px-6 py-4 font-bold">Skill Name</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Industry Demand</th>
              <th className="px-6 py-4 font-bold">Student Readiness</th>
              <th className="px-6 py-4 font-bold">Gap Score</th>
              <th className="px-6 py-4 font-bold">Priority</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {gaps.map((item) => (
              <tr key={item.skill} className="hover:bg-black/[0.01] transition-colors">
                <td className="px-6 py-4 text-[14px] font-bold text-[#201d1d]">{item.skill}</td>
                <td className="px-6 py-4 text-[13px] text-[#5e5a5a]">{item.category}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-[#201d1d]">{item.demand}</td>
                <td className="px-6 py-4 text-[13px] font-semibold text-[#201d1d]">{item.readiness}</td>
                <td className="px-6 py-4 text-[13px] font-bold text-[#6b0000]">{item.gap} pts</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${
                    item.priority === 'High' ? 'bg-[#fff5f5] text-[#6b0000]' :
                    item.priority === 'Medium' ? 'bg-[#fff8ee] text-[#d97706]' :
                    'bg-[#f0fdf4] text-[#166534]'
                  }`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-[#9c9595] hover:text-[#201d1d] rounded-md hover:bg-black/[0.05]">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
