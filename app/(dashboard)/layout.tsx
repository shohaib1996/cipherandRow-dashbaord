import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { FloatingSidebarTrigger } from "@/components/floating-sidebar-trigger";
import { DashboardLayoutClient } from "@/components/DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      {/* Show FloatingSidebarTrigger only on desktop (lg and above) */}
      <div className="hidden lg:block">
        <FloatingSidebarTrigger />
      </div>
      <SidebarInset>
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </SidebarInset>
    </SidebarProvider>
  );
}
