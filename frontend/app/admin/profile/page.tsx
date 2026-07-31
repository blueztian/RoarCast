"use client";

import { UserCircle, Shield, Key } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col p-8 pb-16">
      <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6b0000] via-[#4a0000] to-[#2d0000] p-5 shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div className="relative z-10 flex flex-col gap-1.5">
          <h1 className="font-display text-[22px] font-bold leading-tight text-white">Admin Profile</h1>
          <p className="text-[14.5px] text-white/80">Manage your personal administrative account details.</p>
        </div>
      </header>

      <div className="bg-white border border-black/[0.06] rounded-xl shadow-sm p-8 flex items-start gap-8">
        <div className="w-24 h-24 bg-[#f0ede9] rounded-full flex items-center justify-center text-[#5e5a5a]">
          <UserCircle size={64} strokeWidth={1} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
             <h2 className="text-[24px] font-bold font-display text-[#201d1d]">Maria Santos</h2>
             <p className="text-[#5e5a5a]">Workforce Planning Director</p>
          </div>
          
          <div className="flex items-center gap-2 text-[12px] font-bold bg-[#fff5f5] text-[#6b0000] px-3 py-1.5 rounded w-fit">
            <Shield size={14} /> Super Administrator
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between py-3 border-b border-black/[0.05]">
              <span className="text-[13px] text-[#7a7373]">Email Address</span>
              <span className="text-[14px] font-bold text-[#201d1d]">m.santos@santarosa.gov.ph</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black/[0.05]">
              <span className="text-[13px] text-[#7a7373]">Department</span>
              <span className="text-[14px] font-bold text-[#201d1d]">City PESO</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-[13px] text-[#7a7373]">Last Login</span>
              <span className="text-[14px] font-bold text-[#201d1d]">Today, 08:42 AM</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
             <button className="px-4 py-2 border border-black/[0.1] rounded-lg text-[13px] font-bold hover:bg-black/[0.02]">
                Edit Profile
             </button>
             <button className="flex items-center gap-2 px-4 py-2 border border-black/[0.1] rounded-lg text-[13px] font-bold hover:bg-black/[0.02]">
                <Key size={14} /> Change Password
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
