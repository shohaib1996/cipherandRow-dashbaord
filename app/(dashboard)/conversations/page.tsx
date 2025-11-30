"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Send,
  User,
  Bot,
  ChevronRight,
  Archive,
  ShieldAlert,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---

type ConversationStatus = "active" | "bot_resolved" | "escalated" | "closed";
type CaseStatus = "open" | "pending" | "closed";
type Priority = "low" | "medium" | "high";

interface Message {
  id: string;
  role: "user" | "bot" | "agent";
  content: string;
  timestamp: string;
}

interface Case {
  id: string;
  status: CaseStatus;
  priority: Priority;
  created_at: string;
  description?: string;
}

interface Conversation {
  id: string;
  user_name: string;
  user_email: string;
  user_avatar?: string;
  last_message: string;
  timestamp: string;
  status: ConversationStatus;
  priority: Priority;
  unread_count: number;
  messages: Message[];
  active_case?: Case;
}

// --- Mock Data ---

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    user_name: "Alice Freeman",
    user_email: "alice@example.com",
    last_message: "I need help with my billing statement.",
    timestamp: "10:23 AM",
    status: "active",
    priority: "high",
    unread_count: 2,
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Hi, I have a question about my last invoice.",
        timestamp: "10:20 AM",
      },
      {
        id: "m2",
        role: "bot",
        content:
          "Hello Alice! I can certainly help with that. Could you please provide your invoice number?",
        timestamp: "10:21 AM",
      },
      {
        id: "m3",
        role: "user",
        content: "It's INV-2024-001. I think I was overcharged.",
        timestamp: "10:23 AM",
      },
    ],
  },
  {
    id: "c2",
    user_name: "Bob Smith",
    user_email: "bob.smith@company.co",
    last_message: "Thanks, that solved it!",
    timestamp: "Yesterday",
    status: "bot_resolved",
    priority: "low",
    unread_count: 0,
    messages: [
      {
        id: "m4",
        role: "user",
        content: "How do I reset my password?",
        timestamp: "Yesterday 2:00 PM",
      },
      {
        id: "m5",
        role: "bot",
        content:
          "You can reset your password by going to Settings > Security > Reset Password. Here is a direct link.",
        timestamp: "Yesterday 2:01 PM",
      },
      {
        id: "m6",
        role: "user",
        content: "Thanks, that solved it!",
        timestamp: "Yesterday 2:05 PM",
      },
    ],
  },
  {
    id: "c3",
    user_name: "Charlie Davis",
    user_email: "charlie@tech.net",
    last_message: "I'd like to speak to a human agent please.",
    timestamp: "2 days ago",
    status: "escalated",
    priority: "medium",
    unread_count: 0,
    messages: [
      {
        id: "m7",
        role: "user",
        content: "My widget isn't loading on mobile.",
        timestamp: "2 days ago",
      },
      {
        id: "m8",
        role: "bot",
        content: "I'm sorry to hear that. Have you tried clearing your cache?",
        timestamp: "2 days ago",
      },
      {
        id: "m9",
        role: "user",
        content:
          "Yes, I have. It's still not working. I'd like to speak to a human agent please.",
        timestamp: "2 days ago",
      },
    ],
    active_case: {
      id: "CASE-8821",
      status: "open",
      priority: "medium",
      created_at: "2 days ago",
      description: "Mobile widget loading issue",
    },
  },
];

// --- Components ---

export default function ConversationsPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(
    MOCK_CONVERSATIONS[0].id
  );
  const [filter, setFilter] = useState<"all" | ConversationStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  // Filter logic
  const filteredConversations = conversations.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.last_message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Action: Mark as Case
  const handleMarkAsCase = () => {
    if (!selectedConversation) return;
    if (selectedConversation.active_case) return; // Already a case

    const newCase: Case = {
      id: `CASE-${Math.floor(Math.random() * 10000)}`,
      status: "open",
      priority: "medium",
      created_at: "Just now",
      description: "Manual escalation",
    };

    const updated = conversations.map((c) =>
      c.id === selectedId
        ? {
            ...c,
            status: "escalated" as ConversationStatus,
            active_case: newCase,
          }
        : c
    );
    setConversations(updated);
  };

  // Action: Update Case Status
  const handleUpdateCaseStatus = (newStatus: CaseStatus) => {
    if (!selectedConversation) return;

    const updated = conversations.map((c) =>
      c.id === selectedId && c.active_case
        ? { ...c, active_case: { ...c.active_case, status: newStatus } }
        : c
    );
    setConversations(updated);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-background overflow-hidden rounded-none border shadow-sm">
      {/* --- Left Sidebar: Conversation List --- */}
      <div className="w-80 border-r flex flex-col bg-muted/10">
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Conversations</h2>
            <div className="text-xs text-muted-foreground">
              {filteredConversations.length} chats
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {["all", "active", "escalated", "bot_resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === f
                    ? "bg-[#493FD7] text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedId === conv.id
                  ? "bg-muted/50 border-l-4 border-l-[#493FD7]"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm truncate">
                  {conv.user_name}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {conv.timestamp}
                </div>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {conv.last_message}
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={conv.status} />
                {conv.active_case && (
                  <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-[10px] font-medium border border-orange-200">
                    Case #{conv.active_case.id.split("-")[1]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Main Area: Chat --- */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {selectedConversation.user_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    {selectedConversation.user_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedConversation.user_email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!selectedConversation.active_case && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAsCase}
                    className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                  >
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Escalate to Case
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                      {msg.role === "bot" ? (
                        <Bot size={16} />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#493FD7] text-white rounded-tr-sm"
                        : "bg-white border text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input placeholder="Type a reply..." className="flex-1" />
                <Button
                  size="icon"
                  className="bg-[#493FD7] hover:bg-[#493FD7]/90 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to view details
          </div>
        )}
      </div>

      {/* --- Right Panel: Case Details (Conditional) --- */}
      {selectedConversation?.active_case && (
        <div className="w-72 border-l bg-muted/10 p-4 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Case Details
            </h3>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Case ID
                </CardTitle>
                <div className="text-lg font-bold">
                  {selectedConversation.active_case.id}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Status
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between mt-1 capitalize"
                      >
                        {selectedConversation.active_case.status}
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleUpdateCaseStatus("open")}
                      >
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateCaseStatus("pending")}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateCaseStatus("closed")}
                      >
                        Closed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Priority
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedConversation.active_case.priority === "high"
                          ? "bg-red-500"
                          : selectedConversation.active_case.priority ===
                            "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm capitalize">
                      {selectedConversation.active_case.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Created
                  </label>
                  <div className="text-sm mt-1">
                    {selectedConversation.active_case.created_at}
                  </div>
                </div>
                {selectedConversation.active_case.description && (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Description
                    </label>
                    <div className="text-sm mt-1 text-muted-foreground bg-muted p-2 rounded">
                      {selectedConversation.active_case.description}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-auto">
            <Button variant="outline" className="w-full text-muted-foreground">
              <Archive className="w-4 h-4 mr-2" /> Archive Conversation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---

function StatusBadge({ status }: { status: ConversationStatus }) {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    bot_resolved: "bg-blue-100 text-blue-700 border-blue-200",
    escalated: "bg-red-100 text-red-700 border-red-200",
    closed: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const labels = {
    active: "Active",
    bot_resolved: "Bot Resolved",
    escalated: "Escalated",
    closed: "Closed",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
