import DesktopSidebar from "./DesktopSidebar";
import MobileFloatingNav from "./MobileFloatingNav";

export default function StudentAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DesktopSidebar />
      <main className="flex-1 md:ml-64 pb-24 md:pb-0">
        {children}
      </main>
      <MobileFloatingNav />
    </div>
  );
}
