import DesktopTopNav from "./DesktopTopNav";
import MobileFloatingNav from "./MobileFloatingNav";

export default function StudentAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#fcfbf9]">
      <DesktopTopNav />
      <main className="flex-1 pb-24 md:pb-0 md:pt-[76px]">
        {children}
      </main>
      <MobileFloatingNav />
    </div>
  );
}
