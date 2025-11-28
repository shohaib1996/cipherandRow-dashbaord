import { Calendar, Command, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "KB",
    url: "/kb",
    icon: Inbox,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: Calendar,
  },
  {
    title: "Test Chat",
    url: "/test-chat",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="border-b border-sidebar-border/50 p-4">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Command className="size-6" />
            </div>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-bold text-base tracking-tight text-foreground">
                Cipher & Row
              </span>
              <span className="truncate text-xs font-medium text-muted-foreground">
                Enterprise Dashboard
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
