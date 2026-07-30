"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-8 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex flex-col gap-1.5">
          <h1 className="font-display text-[28px] font-bold leading-tight text-white">System Settings</h1>
          <p className="text-[14.5px] text-white/80">Configure global RoarCast parameters and data sources.</p>
        </div>
      </header>

      <div className="bg-white border border-black/[0.06] rounded-xl shadow-sm overflow-hidden flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#201d1d]">Data Retention Period</label>
          <select className="border border-black/[0.1] rounded-md p-2 text-[14px] outline-none focus:border-[#6b0000]">
            <option>1 Year</option>
            <option>3 Years</option>
            <option>5 Years</option>
          </select>
          <span className="text-[12px] text-[#7a7373]">How long anonymized student data is kept before deletion.</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#201d1d]">Default Export Format</label>
          <select className="border border-black/[0.1] rounded-md p-2 text-[14px] outline-none focus:border-[#6b0000]">
            <option>CSV</option>
            <option>PDF</option>
            <option>Excel</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 mt-4 pt-6 border-t border-black/[0.05]">
          <h3 className="font-bold text-[#201d1d]">API Integrations</h3>
          <p className="text-[13px] text-[#5e5a5a] mb-2">Manage connections to PESO databases and local job boards.</p>
          <button className="w-fit px-4 py-2 border border-black/[0.1] rounded-md text-[13px] font-bold hover:bg-black/[0.02]">
            Manage API Keys
          </button>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#6b0000] text-white rounded-lg text-[13px] font-bold shadow-sm hover:bg-[#4a0000]">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
