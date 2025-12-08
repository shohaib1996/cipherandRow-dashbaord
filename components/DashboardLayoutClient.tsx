"use client";

import { TrialBanner } from "@/components/TrialBanner";
import { TrialExpiredModal } from "@/components/TrialExpiredModal";
import { DashboardFooter } from "@/components/DashboardFooter";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col min-h-screen bg-linear-to-br from-[#925FF0]/5 via-[#925FF0]/5 to-[#3B82F6]/5">
      {/* Trial Expired Modal - Blocks access when trial is over */}
      <TrialExpiredModal />

      {/* Trial Banner - Shows at the top when trial is active */}
      <TrialBanner />

      {/* Show SidebarTrigger on mobile and tablet (below lg) */}
      <div className="lg:hidden p-4">
        <SidebarTrigger />
      </div>

      <div className="flex-1 flex flex-col gap-4">{children}</div>

      <DashboardFooter />
    </div>
  );
}
