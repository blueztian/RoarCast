import MobileFloatingNav from "./MobileFloatingNav";

export default function StudentAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-background overflow-hidden relative">
      <main className="flex-1 flex flex-col min-h-0 relative z-0">
        {children}
      </main>
      <MobileFloatingNav />
    </div>
  );
}
