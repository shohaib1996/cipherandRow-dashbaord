"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ConversationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white mx-10 my-10 h-full font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-white px-8 py-6">
        <div className="mb-6">
          <Link
            href="/dashboard/conversations"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Conversations
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-zinc-500 mb-1">Customer</div>
            <h1 className="text-xl font-medium text-zinc-900">Sarah Johnson</h1>
            <p className="text-sm text-zinc-500">sarah@example.com</p>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Rating</div>
            <div className="flex items-center gap-1.5 font-medium">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>5/5</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Response Time</div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span>15s</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Messages</div>
            <div className="flex items-center gap-1.5 font-medium">
              <MessageSquare className="h-4 w-4 text-zinc-400" />
              <span>3</span>
            </div>
          </div>
        </div>
      </header>
      <div className="px-5">
        <hr className="" />
      </div>
      <div className="px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6 py-8">
            {/* AI Summary Card */}
            <Card className="p-6 border-zinc-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-[#925FF0] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium text-zinc-900">AI Summary</h3>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Customer contacted support regarding general inquiry. Issue was
                successfully resolved after 3 messages.
              </p>
            </Card>

            {/* Train the Bot Card */}
            <Card className="p-6 border-zinc-100 shadow-sm">
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
          <div className="lg:col-span-2 flex flex-col h-[600px] bg-zinc-50/50 rounded-xl border border-zinc-100">
            {/* Messages */}
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-black text-white px-6 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="text-sm">How do I reset my password?</p>
                </div>
              </div>

              {/* Bot Message */}
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-[#925FF0] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-zinc-100 px-6 py-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    I can help you reset your password! Click on "Forgot
                    Password" on the login page, enter your email address, and
                    you'll receive a reset link within a few minutes.
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-black text-white px-6 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="text-sm">Perfect, thank you!</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-zinc-100 rounded-b-xl">
              <div className="flex items-center gap-4">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-12 bg-zinc-50 border-zinc-100 focus-visible:ring-0 focus-visible:border-zinc-300 rounded-full px-6"
                />
                <Button
                  size="icon"
                  className="h-12 w-12 bg-black hover:bg-zinc-800 rounded-full transition-colors shrink-0"
                >
                  <ArrowRight className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
