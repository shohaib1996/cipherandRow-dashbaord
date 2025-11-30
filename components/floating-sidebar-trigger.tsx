"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingSidebarTrigger() {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "fixed z-50 h-8 w-8 rounded-full border bg-white shadow-md transition-all duration-300 hover:bg-gray-100",
        isCollapsed
          ? "left-20 top-20 -translate-x-1/2"
          : "left-72 top-20 -translate-x-1/2"
      )}
      onClick={toggleSidebar}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4 text-foreground" />
      ) : (
        <ChevronLeft className="h-4 w-4 text-foreground" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
