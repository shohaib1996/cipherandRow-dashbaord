import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { FloatingSidebarTrigger } from "@/components/floating-sidebar-trigger";

import { DashboardFooter } from "@/components/DashboardFooter";

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
        <div className="flex flex-1 flex-col min-h-screen bg-linear-to-br from-[#925FF0]/5 via-[#925FF0]/5 to-[#3B82F6]/5">
          {/* Show SidebarTrigger on mobile and tablet (below lg) */}
          <div className="lg:hidden p-4">
            <SidebarTrigger />
          </div>
          <div className="flex-1 flex flex-col gap-4">{children}</div>
          <DashboardFooter />

          {/* Chat Widget */}
          {/* <ChatWidget /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
