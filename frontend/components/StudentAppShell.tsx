import MobileFloatingNav from "./MobileFloatingNav";

export default function StudentAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100svh] w-full flex-col bg-background">
      <main className="flex-1 pb-24">
        {children}
      </main>
      <MobileFloatingNav />
    </div>
  );
}
