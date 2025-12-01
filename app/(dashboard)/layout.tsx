import { cookies } from "next/headers";

import {
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { FloatingSidebarTrigger } from "@/components/floating-sidebar-trigger";
import ChatWidget from "@/components/ChatWidget/ChatWidget";

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
      <FloatingSidebarTrigger />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 bg-linear-to-br from-[#925FF0]/5 via-[#925FF0]/5 to-[#3B82F6]/5">
          {children}

          {/* Chat Widget */}
          <ChatWidget />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
