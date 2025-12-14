"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Clock,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Send,
  ArrowRight,
  Loader2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { conversationsApi, Message } from "@/lib/conversationsApi";
import { format } from "date-fns";

export default function ConversationDetailsPage() {
  const params = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [sessionDetails, setSessionDetails] = useState<{
    clientId: string;
    botId: string;
  } | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchMessages();
    }
  }, [params.id]);

  const fetchMessages = async () => {
    if (!params.id) return;
    setLoading(true);
    try {
      const data = await conversationsApi.getMessages(params.id);

      let filteredMessages = data.messages;

      // If the first message is "ping", it's a warm-up message.
      // We need to hide both the "ping" and the bot's immediate reply (so slice 2).
      if (
        data.messages.length > 0 &&
        data.messages[0].message.trim().toLowerCase() === "ping"
      ) {
        filteredMessages = data.messages.slice(2);
      }

      setMessages(filteredMessages);

      if (data.messages.length > 0) {
        // Extract basic details from the first available message (even if it's the hidden one)
        const firstMsg = data.messages[0];
        setSessionDetails({
          clientId: firstMsg.client_id,
          botId: firstMsg.bot_id,
        });
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to load conversation history");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTraining = () => {
    toast.info("Coming Soon", {
      description: "Training feature will be available in v1.1",
    });
  };

  const handleSendMessage = () => {
    toast.info("Coming Soon", {
      description: "This feature will be available in v1.1",
    });
  };

  // Helper to format message time
  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="bg-white mx-0 sm:mx-4 lg:mx-10 my-0 sm:my-6 lg:my-10 h-full font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/dashboard/conversations"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Conversations
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="text-xs text-zinc-500 mb-1">Client ID</div>
            <h1
              className="text-lg sm:text-xl font-medium text-zinc-900 truncate"
              title={sessionDetails?.clientId || ""}
            >
              {loading
                ? "Loading..."
                : sessionDetails?.clientId || "Unknown Client"}
            </h1>
            <p className="text-sm text-zinc-500">
              Bot ID: {sessionDetails?.botId || "-"}
            </p>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Session Duration</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span>-</span> {/* Placeholder as we don't have duration yet */}
            </div>
          </div>

          <div>
            {/* Empty/Placeholder column, maybe status? */}
            <div className="text-xs text-zinc-500 mb-1">Status</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-800">
                Closed
              </span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="text-xs text-zinc-500 mb-1">Messages</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <MessageSquare className="h-4 w-4 text-zinc-400" />
              <span>{messages.length}</span>
            </div>
          </div>
        </div>
      </header>
      <div className="px-4 sm:px-5">
        <hr className="" />
      </div>
      <div className="px-4 sm:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="space-y-4 sm:space-y-6 py-4 sm:py-6 lg:py-8 lg:order-1 order-2">
            {/* AI Summary Card - Static for now or remove? keeping purely as UI element per original design */}
            <Card className="p-4 sm:p-6 border-zinc-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-[#925FF0] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium text-zinc-900">AI Summary</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Conversation summary is not available yet.
              </p>
            </Card>

            {/* Train the Bot Card */}
            <Card className="p-4 sm:p-6 border-zinc-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <h3 className="font-medium text-zinc-900">Train the Bot</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                Help improve AI responses by providing feedback on this
                conversation.
              </p>
              <Button
                onClick={handleAddToTraining}
                variant="outline"
                size="lg"
                className="w-full bg-zinc-100 border-transparent text-zinc-600 hover:bg-green-400 hover:text-white rounded-sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Add to Training
              </Button>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-[500px] sm:h-[600px] bg-zinc-50/50 rounded-xl border border-zinc-100 lg:order-2 order-1 mt-6">
            {/* Messages */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Loading conversation...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                  <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
                  <p>No messages found in this conversation.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "items-start gap-2 sm:gap-4"
                    }`}
                  >
                    {/* Bot Avatar */}
                    {msg.sender === "bot" && (
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#925FF0] flex items-center justify-center shrink-0 mt-1">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`${
                        msg.sender === "user"
                          ? "bg-black text-white rounded-tr-sm"
                          : "bg-white border border-zinc-100 rounded-tl-sm shadow-sm"
                      } px-4 sm:px-6 py-2.5 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-[80%]`}
                    >
                      <p
                        className={`text-sm ${
                          msg.sender === "bot"
                            ? "text-zinc-600 leading-relaxed"
                            : ""
                        }`}
                      >
                        {msg.message}
                      </p>
                      <p
                        className={`text-[10px] mt-1 text-right ${
                          msg.sender === "user"
                            ? "text-zinc-400"
                            : "text-zinc-300"
                        }`}
                      >
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            {/* <div className="p-3 sm:p-4 bg-white border-t border-zinc-100 rounded-b-xl">
              <div className="flex items-center gap-2 sm:gap-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-10 sm:h-12 bg-zinc-50 border-zinc-100 focus-visible:ring-0 focus-visible:border-zinc-300 rounded-full px-4 sm:px-6 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 bg-black hover:bg-zinc-800 rounded-full transition-colors shrink-0"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
