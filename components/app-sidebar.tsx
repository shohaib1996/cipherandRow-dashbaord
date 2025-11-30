import {
  Book,
  BookOpen,
  Bot,
  Code,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: LayoutGrid,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageSquare,
  },
  {
    title: "Knowledge Base (KB)",
    url: "/kb",
    icon: BookOpen,
  },
  {
    title: "Installation",
    url: "/installation",
    icon: Code,
  },
  {
    title: "Test Chat",
    url: "/test-chat",
    icon: Bot,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-[#432876] text-white">
        <SidebarHeader className="px-4 py-7 border-b border-white/40">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#432876] shadow-sm">
              <span className="font-bold text-lg">C</span>
            </div>
            <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-bold text-base tracking-tight text-white">
                Cipher & Row
              </span>
              <span className="truncate text-xs font-medium text-white/70">
                Support Bots v1
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white/90 hover:bg-white/10 hover:text-white active:bg-white/20 data-[active=true]:bg-white/20 data-[active=true]:text-white"
                  >
                    <Link href={item.url} className="">
                      <item.icon className="size-5.5! text-white/80" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#432876] p-4 border-t border-white/10">
        <div
          className="
      flex items-center gap-3 rounded-lg bg-white/10 p-3
      group-data-[collapsible=icon]:flex-col
      group-data-[collapsible=icon]:items-center
      group-data-[collapsible=icon]:gap-2
    "
        >
          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-medium text-white">
            JD
          </div>

          {/* Text (hidden while collapsed) */}
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-white">John Doe</span>
            <span className="truncate text-xs text-white/70">
              john@company.com
            </span>
          </div>

          {/* Logout icon (always visible) */}
          <LogOut className="size-5 text-white/70" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
