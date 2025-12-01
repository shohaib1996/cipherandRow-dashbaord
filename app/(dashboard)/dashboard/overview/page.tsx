"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Plus,
  Settings,
  Star,
  ThumbsDown,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

const ACTIONS = [
  {
    label: "View All Conversations",
    icon: MessageSquare,
  },
  {
    label: "Add Knowledge Article",
    icon: Plus,
  },
  {
    label: "View Analytics",
    icon: LineChart,
  },
  {
    label: "Widget Settings",
    icon: Settings,
  },
];

const CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Resolved",
    description: "Tracking and delivery on time for Christmas",
    rating: "9/10",
    icon: CheckCircle2,
    iconColor: "text-zinc-500 group-hover:text-emerald-500",
    iconBgColor: "bg-zinc-100 group-hover:bg-emerald-500/10",
    badgeColor: "group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "Active",
    description: "Payment issue with credit card",
    rating: "7/10",
    icon: MessageSquare,
    iconColor: "text-zinc-500 group-hover:text-[#925FF0]",
    iconBgColor: "bg-zinc-100 group-hover:bg-[#925FF0]/10",
    badgeColor: "group-hover:bg-[#925FF0] group-hover:text-white",
  },
  {
    id: 3,
    name: "Emma Wilson",
    status: "Resolved",
    description: "Account login problems after password reset",
    rating: "8/10",
    icon: CheckCircle2,
    iconColor: "text-zinc-500 group-hover:text-emerald-500",
    iconBgColor: "bg-zinc-100 group-hover:bg-emerald-500/10",
    badgeColor: "group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    id: 4,
    name: "David Park",
    status: "Waiting",
    description: "Product return and refund request",
    rating: "6/10",
    icon: Clock,
    iconColor: "text-zinc-500 group-hover:text-yellow-500",
    iconBgColor: "bg-zinc-100 group-hover:bg-yellow-500/10",
    badgeColor: "group-hover:bg-yellow-500 group-hover:text-white",
  },
];

const ALERTS = [
  {
    id: 1,
    name: "Michael Rodriguez",
    severity: "High",
    description:
      "Customer extremely frustrated with delayed shipment, threatening to cancel subscription",
    icon: ThumbsDown,
    color: "text-red-500",
  },
  {
    id: 2,
    name: "Jessica Thompson",
    severity: "High",
    description:
      "Requesting full refund due to product not matching description",
    icon: DollarSign,
    color: "text-orange-500",
  },
  {
    id: 3,
    name: "David Park",
    severity: "Medium",
    description:
      "Bot unable to resolve billing discrepancy, customer requesting human support",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    id: 4,
    name: "Amanda White",
    severity: "High",
    description:
      "Multiple unresolved issues, mentioned switching to competitor",
    icon: XCircle,
    color: "text-red-500",
  },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-7 font-sans text-zinc-900">
      {/* Header */}
      <div className="mt-4">
        <h1 className="text-3xl font-medium tracking-tight">
          Good morning, John
        </h1>
        <p className="text-sm text-zinc-500">
          Here's what's happening with your support bot today
        </p>
      </div>

      {/* Stats & Actions Container */}
      <Card className="flex flex-col gap-6 p-6 shadow-sm border-zinc-100">
        {/* Stats Row */}
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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
                  <span>{stat.label}</span>
                </div>
                <div className="text-3xl font-semibold">{stat.value}</div>
              </div>
            ))}
          </div>
          <hr />
        </div>

        {/* Actions Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              className="h-10 w-full justify-center gap-2 bg-zinc-100 text-xs font-medium text-zinc-700 hover:text-[#925FF0] hover:bg-[#925FF0]/10"
            >
              <action.icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Main Content Grid — FIXED HERE */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Conversations Panel */}
        <Card className="flex-1 p-6 shadow-sm border-zinc-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-medium">Conversations</h2>
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-zinc-700 hover:bg-transparent hover:text-zinc-900"
            >
              View All →
            </Button>
          </div>
          <div className="flex flex-col">
            {CONVERSATIONS.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group flex items-start gap-3 py-4 px-3 -mx-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 cursor-pointer",
                  index !== CONVERSATIONS.length - 1 &&
                    "border-b border-zinc-100"
                )}
              >
                <div
                  className={cn(
                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                    item.iconBgColor
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors duration-200",
                      item.iconColor
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-md bg-zinc-100 px-1.5 py-0 text-sm font-medium text-zinc-600 transition-colors duration-200",
                        item.badgeColor
                      )}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-zinc-600">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Critical Alerts Panel */}
        <Card className="flex-1 p-6 shadow-sm border-zinc-100">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-medium">Critical Alerts</h2>
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-zinc-700 hover:bg-transparent hover:text-zinc-900"
            >
              View All →
            </Button>
          </div>
          <div className="flex flex-col">
            {ALERTS.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 py-4 px-3 -mx-3 rounded-lg transition-colors duration-200 hover:bg-zinc-50 cursor-pointer",
                  index !== ALERTS.length - 1 && "border-b border-zinc-100"
                )}
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center">
                  <item.icon className={cn("h-4 w-4", item.color)} />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <Badge
                      className={cn(
                        "rounded-md px-1.5 py-0 text-[10px] font-medium text-white hover:bg-opacity-90",
                        item.severity === "High"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      )}
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
