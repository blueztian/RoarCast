"use client";

import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  { name: "Q3 2026 Workforce Readiness Overview", date: "Oct 1, 2026", type: "PDF", size: "2.4 MB" },
  { name: "Skill Gap Analysis - Manufacturing Sector", date: "Sep 15, 2026", type: "CSV", size: "156 KB" },
  { name: "PEZA Zone Demand Forecast 2027", date: "Aug 28, 2026", type: "PDF", size: "1.8 MB" },
  { name: "Institution Alignment Scores H1", date: "Jul 10, 2026", type: "Excel", size: "890 KB" },
];

export default function ReportsPage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-[28px] font-bold leading-tight text-white">Reports</h1>
            <p className="text-[14.5px] text-white/80">Downloadable analytics and historical data reports.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#6b0000] rounded-lg text-[13px] font-bold shadow-sm hover:bg-white/90 transition-colors">
            Generate Custom Report
          </button>
        </div>
      </header>

      <div className="bg-white border border-black/[0.06] rounded-xl shadow-sm">
        <ul className="divide-y divide-black/[0.04]">
          {reports.map((report) => (
            <li key={report.name} className="flex items-center justify-between p-5 hover:bg-black/[0.01] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-[#fff5f5] text-[#6b0000] flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#201d1d]">{report.name}</h3>
                  <div className="flex items-center gap-3 text-[12px] text-[#7a7373] mt-0.5">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                    <span>•</span>
                    <span className="font-semibold">{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-black/[0.08] rounded bg-white text-[12px] font-bold text-[#201d1d] hover:bg-black/[0.02]">
                <Download size={14} /> Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
