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
            <div className="text-xs text-zinc-500 mb-1">Customer</div>
            <h1 className="text-lg sm:text-xl font-medium text-zinc-900">
              Sarah Johnson
            </h1>
            <p className="text-sm text-zinc-500">sarah@example.com</p>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Rating</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>5/5</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-zinc-500 mb-1">Response Time</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span>15s</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="text-xs text-zinc-500 mb-1">Messages</div>
            <div className="flex items-center gap-1.5 font-medium text-sm sm:text-base">
              <MessageSquare className="h-4 w-4 text-zinc-400" />
              <span>3</span>
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
            {/* AI Summary Card */}
            <Card className="p-4 sm:p-6 border-zinc-100 shadow-sm">
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
          <div className="lg:col-span-2 flex flex-col h-[500px] sm:h-[600px] bg-zinc-50/50 rounded-xl border border-zinc-100 lg:order-2 order-1">
            {/* Messages */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[80%]">
                  <p className="text-sm">How do I reset my password?</p>
                </div>
              </div>

              {/* Bot Message */}
              <div className="flex items-start gap-2 sm:gap-4">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#925FF0] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="bg-white border border-zinc-100 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-[80%] shadow-sm">
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    I can help you reset your password! Click on "Forgot
                    Password" on the login page, enter your email address, and
                    you'll receive a reset link within a few minutes.
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[80%]">
                  <p className="text-sm">Perfect, thank you!</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white border-t border-zinc-100 rounded-b-xl">
              <div className="flex items-center gap-2 sm:gap-4">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-10 sm:h-12 bg-zinc-50 border-zinc-100 focus-visible:ring-0 focus-visible:border-zinc-300 rounded-full px-4 sm:px-6 text-sm"
                />
                <Button
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 bg-black hover:bg-zinc-800 rounded-full transition-colors shrink-0"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
