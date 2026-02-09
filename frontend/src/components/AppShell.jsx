import { SidebarNav } from "@/components/SidebarNav";
import { TopBar } from "@/components/TopBar";

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopBar />
          <main className="mx-auto w-full max-w-6xl px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
