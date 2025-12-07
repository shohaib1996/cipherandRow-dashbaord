"use client";

import React from "react";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: LayoutGrid,
  },
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: MessageSquare,
  },
  {
    title: "Knowledge Base (KB)",
    url: "/dashboard/kb",
    icon: BookOpen,
  },
  {
    title: "Installation",
    url: "/dashboard/installation",
    icon: Code,
  },
  {
    title: "Test Chat",
    url: "/dashboard/test-chat",
    icon: Bot,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    // Clear cookie
    document.cookie = "auth_token=; path=/; max-age=0";

    // Show toast
    toast.success("Successfully logged out!");

    // Redirect to signin
    router.push("/signin");
  };

  // Get user initials
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-[#432876] text-white">
        <SidebarHeader className="px-4 py-7 border-b border-white/40">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white shadow-sm overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Cipher & Row Logo"
                width={40}
                height={40}
                className="object-cover"
              />
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
            {user?.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : "U"}
          </div>

          {/* Text (hidden while collapsed) */}
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-white">
              {user?.user_metadata?.full_name || "User"}
            </span>
            <span className="truncate text-xs text-white/70">
              {user?.email || "No email"}
            </span>
          </div>

          {/* Logout icon (always visible) */}
          <button
            onClick={handleLogout}
            className="hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut className="size-5 text-white/70 hover:text-white" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
