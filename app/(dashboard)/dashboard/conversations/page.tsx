"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, MessageSquare, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- Types ---

type ConversationStatus = "active" | "resolved" | "pending";

interface Conversation {
  id: string;
  user_name: string;
  user_email: string;
  user_avatar?: string; // Initials for now
  last_message: string;
  status: ConversationStatus;
  rating: string; // e.g., "5/5", "N/A"
  response_time: string; // e.g., "15s"
  message_count: number;
}

// --- Mock Data ---

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    user_name: "Sarah Johnson",
    user_email: "sarah@example.com",
    user_avatar: "SJ",
    last_message: "Perfect, thank you!",
    status: "resolved",
    rating: "5/5",
    response_time: "15s",
    message_count: 3,
  },
  {
    id: "c2",
    user_name: "Michael Chen",
    user_email: "michael@example.com",
    user_avatar: "MC",
    last_message: "Yes! Once your order ships, you'll receive a tracki...",
    status: "active",
    rating: "N/A",
    response_time: "10s",
    message_count: 4,
  },
  {
    id: "c3",
    user_name: "Emma Wilson",
    user_email: "emma@example.com",
    user_avatar: "EW",
    last_message: "Yes! We have a 30-day money-back guarantee. I...",
    status: "resolved",
    rating: "4/5",
    response_time: "12s",
    message_count: 2,
  },
  {
    id: "c4",
    user_name: "David Park",
    user_email: "david.park@example.com",
    user_avatar: "DP",
    last_message: "Order #12345",
    status: "pending",
    rating: "N/A",
    response_time: "15s",
    message_count: 3,
  },
  {
    id: "c5",
    user_name: "Jessica Thompson",
    user_email: "jess.t@example.com",
    user_avatar: "JT",
    last_message: "I sincerely apologize for this discrepancy. This is ...",
    status: "active",
    rating: "3/5",
    response_time: "20s",
    message_count: 2,
  },
  {
    id: "c6",
    user_name: "Michael Rodriguez",
    user_email: "michael.r@example.com",
    user_avatar: "MR",
    last_message: "I need this resolved NOW or I'm canceling my su...",
    status: "active",
    rating: "N/A",
    response_time: "15s",
    message_count: 3,
  },
  {
    id: "c7",
    user_name: "Amanda White",
    user_email: "amanda.w@example.com",
    user_avatar: "AW",
    last_message: "I'm truly sorry to hear about your experience. Thi...",
    status: "active",
    rating: "N/A",
    response_time: "20s",
    message_count: 2,
  },
  {
    id: "c8",
    user_name: "Robert Taylor",
    user_email: "robert.t@example.com",
    user_avatar: "RT",
    last_message: "Great, thanks!",
    status: "resolved",
    rating: "5/5",
    response_time: "10s",
    message_count: 3,
  },
  {
    id: "c9",
    user_name: "Lisa Anderson",
    user_email: "lisa.a@example.com",
    user_avatar: "LA",
    last_message: "I sincerely apologize for your experience. I'm esc...",
    status: "pending",
    rating: "N/A",
    response_time: "25s",
    message_count: 2,
  },
];

export default function ConversationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | ConversationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = MOCK_CONVERSATIONS.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user_email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: ConversationStatus) => {
    switch (status) {
      case "resolved":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
      case "active":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRowHoverClass = (status: ConversationStatus) => {
    switch (status) {
      case "resolved":
        return "hover:bg-emerald-50";
      case "active":
        return "hover:bg-blue-50";
      case "pending":
        return "hover:bg-yellow-50";
      default:
        return "hover:bg-gray-50";
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 mx-0 sm:mx-4 lg:mx-10 font-sans text-zinc-900 bg-white my-4 sm:my-6 lg:my-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2 mt-4 sm:mt-6 lg:mt-10">
          Recent Conversations
        </h1>
        <p className="text-zinc-500 text-sm">
          Click on any conversation to view details
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10 bg-white border-zinc-200 h-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Buttons and Export */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(["all", "active", "resolved", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-all capitalize border whitespace-nowrap",
                  filter === f
                    ? f === "all"
                      ? "bg-[#925FF0]/10 text-[#925FF0] border-[#925FF0]"
                      : f === "active"
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : f === "resolved"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-yellow-50 text-yellow-600 border-yellow-200"
                    : cn(
                        "bg-zinc-100 text-zinc-600 border-transparent",
                        f === "all"
                          ? "hover:bg-[#925FF0]/10 hover:text-[#925FF0]"
                          : f === "active"
                          ? "hover:bg-blue-50 hover:text-blue-600"
                          : f === "resolved"
                          ? "hover:bg-emerald-50 hover:text-emerald-600"
                          : "hover:bg-yellow-50 hover:text-yellow-600"
                      )
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="h-10 gap-2 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 rounded-sm text-xs sm:text-sm"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Table - Desktop View (hidden on mobile) */}
      <div className="hidden lg:block bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 font-medium text-zinc-500 w-[300px]">
                  Customer
                </th>
                <th className="px-6 py-4 font-medium text-zinc-500">
                  Last Message
                </th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-[120px]">
                  Status
                </th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-[100px]">
                  Rating
                </th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-[140px]">
                  Response Time
                </th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-[100px]">
                  Messages
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredConversations.map((conversation) => (
                <tr
                  key={conversation.id}
                  onClick={() =>
                    router.push(`/dashboard/conversations/${conversation.id}`)
                  }
                  className="group transition-colors duration-200 cursor-pointer hover:bg-zinc-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-medium text-sm shrink-0 transition-colors duration-200 group-hover:bg-[#925FF0] group-hover:text-white">
                        {conversation.user_avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900">
                          {conversation.user_name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {conversation.user_email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-zinc-600 truncate max-w-[300px]">
                      {conversation.last_message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition-colors duration-200 bg-zinc-100 text-zinc-600",
                        conversation.status === "resolved" &&
                          "group-hover:bg-emerald-100 group-hover:text-emerald-700",
                        conversation.status === "active" &&
                          "group-hover:bg-blue-100 group-hover:text-blue-700",
                        conversation.status === "pending" &&
                          "group-hover:bg-yellow-100 group-hover:text-yellow-700"
                      )}
                    >
                      {conversation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-[#925FF0] transition-colors duration-200">
                      <Star className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#925FF0] transition-colors duration-200" />
                      <span>{conversation.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-[#925FF0] transition-colors duration-200">
                      <Clock className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#925FF0] transition-colors duration-200" />
                      <span>{conversation.response_time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-[#925FF0] transition-colors duration-200">
                      <MessageSquare className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#925FF0] transition-colors duration-200" />
                      <span>{conversation.message_count}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredConversations.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            No conversations found matching your criteria.
          </div>
        )}
      </div>

      {/* Card View - Mobile/Tablet (visible on mobile and tablet) */}
      <div className="lg:hidden flex flex-col gap-3">
        {filteredConversations.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-12 text-center text-zinc-500">
            No conversations found matching your criteria.
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() =>
                router.push(`/dashboard/conversations/${conversation.id}`)
              }
              className="bg-white rounded-lg border border-zinc-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              {/* Customer Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-medium text-sm shrink-0">
                  {conversation.user_avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-zinc-900 truncate">
                      {conversation.user_name}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize shrink-0",
                        conversation.status === "resolved" &&
                          "bg-emerald-100 text-emerald-700",
                        conversation.status === "active" &&
                          "bg-blue-100 text-blue-700",
                        conversation.status === "pending" &&
                          "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {conversation.status}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 truncate block">
                    {conversation.user_email}
                  </span>
                </div>
              </div>

              {/* Last Message */}
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                {conversation.last_message}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-100">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{conversation.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{conversation.response_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{conversation.message_count}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
