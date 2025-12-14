"use client";

import {
  AlertTriangle,
  CheckCircle2,
  LineChart,
  MessageSquare,
  Plus,
  Settings,
  Star,
  Zap,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getUserSettings } from "@/lib/userSettings";
import { conversationsApi, Conversation } from "@/lib/conversationsApi";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock Data
const STATS = [
  {
    label: "Today's Conversations",
    value: "67",
    icon: MessageSquare,
    hoverColor: "group-hover:text-[#925FF0]",
    hoverBgColor: "group-hover:bg-[#925FF0]/10",
  },
  {
    label: "Resolution Rate",
    value: "82%",
    icon: CheckCircle2,
    hoverColor: "group-hover:text-emerald-500",
    hoverBgColor: "group-hover:bg-emerald-500/10",
  },
  {
    label: "Avg Response Time",
    value: "0.8s",
    icon: Zap,
    hoverColor: "group-hover:text-cyan-500",
    hoverBgColor: "group-hover:bg-cyan-500/10",
  },
  {
    label: "Satisfaction Score",
    value: "4.6",
    icon: Star,
    hoverColor: "group-hover:text-yellow-500",
    hoverBgColor: "group-hover:bg-yellow-500/10",
  },
];

const ACTIONS: Array<{
  label: string;
  icon: any;
  link?: string;
}> = [
  {
    label: "View All Conversations",
    icon: MessageSquare,
    link: "/dashboard/conversations",
  },
  {
    label: "Add Knowledge Article",
    icon: Plus,
    link: "/dashboard/kb",
  },
  {
    label: "View Analytics",
    icon: LineChart,
    // No link = Coming Soon
  },
  {
    label: "Widget Settings",
    icon: Settings,
    link: "/dashboard/installation",
  },
];

export default function OverviewPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("there");
  const [greeting, setGreeting] = useState("Good morning");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        const userId = userData?.id;

        if (userId) {
          // Get saved settings (custom or default from user metadata)
          const settings = getUserSettings(userId);
          const displayName = settings.fullName || userData?.email?.split("@")[0] || "there";
          setUserName(displayName);
        } else {
          // Fallback if no userId
          const fullName = userData?.user_metadata?.full_name || userData?.email?.split("@")[0] || "there";
          setUserName(fullName);
        }
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }

    // Fetch conversations
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoadingConversations(true);
    try {
      const data = await conversationsApi.getConversations({ limit: 5, offset: 1 });
      setConversations(data.conversations);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setLoadingConversations(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-6 lg:p-7 font-sans text-zinc-900">
      {/* Header */}
      <div className="mt-0 sm:mt-4">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
          {greeting}, {userName}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Here's what's happening with your support bot today
        </p>
      </div>

      {/* Stats & Actions Container */}
      <Card className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 shadow-sm border-zinc-100">
        {/* Stats Row */}
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <div className="group flex items-center gap-2 text-xs font-medium text-zinc-500 cursor-pointer">
                  <div
                    className={cn(
                      "rounded-full bg-zinc-100 p-2 transition-colors duration-200",
                      stat.hoverBgColor
                    )}
                  >
                    <stat.icon
                      className={cn(
                        "h-4 w-4 transition-colors duration-200",
                        stat.hoverColor
                      )}
                    />
                  </div>
                  <span className="text-xs sm:text-sm">{stat.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        {/* Actions Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map((action) => {
            const hasLink = Boolean(action.link);

            if (hasLink && action.link) {
              return (
                <Link key={action.label} href={action.link}>
                  <Button
                    variant="secondary"
                    className="h-10 w-full justify-center gap-2 bg-zinc-100 text-xs font-medium text-zinc-700 hover:text-[#925FF0] hover:bg-[#925FF0]/10"
                  >
                    <action.icon className="h-3.5 w-3.5" />
                    <span className="truncate">{action.label}</span>
                  </Button>
                </Link>
              );
            }

            return (
              <div
                key={action.label}
                className="relative group"
                title="Coming Soon"
              >
                <Button
                  variant="secondary"
                  disabled
                  className="h-10 w-full justify-center gap-2 bg-zinc-100 text-xs font-medium text-zinc-400 cursor-not-allowed opacity-60"
                >
                  <action.icon className="h-3.5 w-3.5" />
                  <span className="truncate">{action.label}</span>
                </Button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  Coming Soon
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Conversations Panel */}
        <Card className="flex-1 p-4 sm:p-6 shadow-sm border-zinc-100">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-medium">Conversations</h2>
            <Link href="/dashboard/conversations">
              <Button
                variant="ghost"
                className="h-auto p-0 text-xs text-zinc-700 hover:bg-transparent hover:text-zinc-900 cursor-pointer"
              >
                View All →
              </Button>
            </Link>
          </div>

          {loadingConversations ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              No conversations yet
            </div>
          ) : (
            <div className="flex flex-col">
              {conversations.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/dashboard/conversations/${item.session_id}`)}
                  className={cn(
                    "group flex items-start gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 cursor-pointer",
                    index !== conversations.length - 1 &&
                      "border-b border-zinc-100"
                  )}
                >
                  <div className="mt-1 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 group-hover:bg-[#925FF0]/10 transition-colors duration-200">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-500 group-hover:text-[#925FF0] transition-colors duration-200" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold truncate">
                        {item.client_id}
                      </span>
                      <Badge
                        variant="secondary"
                        className="rounded-md bg-zinc-100 px-1.5 py-0 text-xs font-medium text-zinc-600 group-hover:bg-[#925FF0] group-hover:text-white transition-colors duration-200"
                      >
                        Active
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed truncate">
                      {item.page_url || `Session: ${item.session_id.slice(0, 12)}...`}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-medium text-zinc-400 shrink-0">
                    {formatDate(item.created_at)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Critical Alerts Panel - Coming Soon */}
        <Card className="flex-1 p-4 sm:p-6 shadow-sm border-zinc-100">
          <div className="mb-4 sm:mb-6 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-medium">Critical Alerts</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <AlertTriangle className="h-6 w-6 text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-900 mb-1">Coming Soon</p>
            <p className="text-xs text-zinc-500">
              Critical alerts feature will be available in the next update
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
