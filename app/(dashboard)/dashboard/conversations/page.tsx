"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  ExternalLink,
  Calendar,
  User,
  Hash,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { conversationsApi, Conversation } from "@/lib/conversationsApi";
import { format } from "date-fns";
import { GlobalTable, Column } from "@/components/GlobalTable";
import Link from "next/link";

export default function ConversationsPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Helper to track if we might have more data

  useEffect(() => {
    fetchConversations();
  }, [offset]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await conversationsApi.getConversations({ limit, offset });
      setConversations(data.conversations);
      // specific logic for hasMore could be improved if API returned total count
      // for now, assume if we got full limit, there might be more
      setHasMore(data.conversations.length === limit);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setOffset((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(1, prev - 1));
  };

  const handleExportCSV = () => {
    toast.info("Coming Soon", {
      description: "CSV export feature will be available in v1.1",
    });
  };

  // Simple formatting helpers
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  const columns: Column<Conversation>[] = [
    {
      header: "Client ID",
      className: "w-[200px] xl:w-[250px]",
      cell: (item: Conversation) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 shrink-0">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span
              className="font-medium text-zinc-900 truncate max-w-[120px] xl:max-w-[150px]"
              title={item.client_id}
            >
              {item.client_id}
            </span>
            <span className="text-xs text-zinc-400">Bot: {item.bot_id}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Session / Page",
      accessorKey: "session_id",
      cell: (item: Conversation) => (
        <div className="flex flex-col gap-1">
          <span
            className="text-zinc-600 text-xs font-mono"
            title={item.session_id}
          >
            Session: {item.session_id.slice(0, 8)}...
          </span>
          {item.page_url && (
            <Link
              href={item.page_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-600 truncate max-w-[150px] xl:max-w-[200px] flex items-center gap-1"
            >
              {item.page_url}
            </Link>
          )}
        </div>
      ),
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell: (item: Conversation) => (
        <div className="flex items-center gap-1.5 text-zinc-600">
          <Calendar className="h-3.5 w-3.5 text-zinc-400" />
          <span>{formatDate(item.created_at)}</span>
        </div>
      ),
    },
    {
      header: "Conversation",
      className: "w-[80px] xl:w-[100px]",
      cell: (item: Conversation) =>
        item.session_id && (
          <Link
            href={`/dashboard/conversations/${item.session_id}`}
            className="text-zinc-400 hover:text-[#925FF0]"
          >
            <Button className="hover:bg-[#925FF0] cursor-pointer" size="sm">
              View
            </Button>
          </Link>
        ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 mx-0 sm:mx-4 lg:mx-10 font-sans text-zinc-900 bg-white my-0 sm:my-6 lg:my-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2 mt-4 sm:mt-6 lg:mt-10">
          Recent Conversations
        </h1>
        <p className="text-zinc-500 text-sm">
          View and manage your chatbot interactions
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Filter Buttons and Export */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
          <div className="flex gap-2">
            <Button
              onClick={fetchConversations}
              variant="outline"
              size="sm"
              className="h-9 gap-2"
              disabled={loading}
            >
              Refresh
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="ghost"
              className="h-9 gap-2 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 rounded-sm text-xs sm:text-sm"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden lg:block">
        <GlobalTable<Conversation>
          columns={columns}
          data={conversations}
          isLoading={loading}
          emptyMessage="No conversations found."
        />
      </div>

      {/* Card View - Mobile */}
      <div className="lg:hidden flex flex-col gap-3">
        {loading ? (
          <div className="p-12 text-center text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading...
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-12 text-center text-zinc-500">
            No conversations found.
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              // onClick={() => router.push(`/dashboard/conversations/${conversation.id}`)}
              className="bg-white rounded-lg border border-zinc-100 shadow-sm p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-medium text-zinc-900 text-sm truncate"
                      title={conversation.client_id}
                    >
                      {conversation.client_id.length > 20 ?
                        `${conversation.client_id.slice(0, 20)}...` :
                        conversation.client_id}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />{" "}
                      {conversation.session_id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-100 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{formatDate(conversation.created_at)}</span>
                </div>
                {conversation.session_id && (
                  <Link
                    href={`/dashboard/conversations/${conversation.session_id}`}
                    className="text-zinc-400 hover:text-[#925FF0]"
                  >
                    <Button
                      size="sm"
                      className="h-7 text-xs hover:bg-[#925FF0]"
                    >
                      View
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-6">
        <div className="text-sm text-zinc-500 order-2 sm:order-1">Page {offset}</div>
        <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={offset <= 1 || loading}
            className="flex-1 sm:flex-initial"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasMore || loading}
            className="flex-1 sm:flex-initial"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
