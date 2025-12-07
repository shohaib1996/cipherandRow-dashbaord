"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface Message {
  role: "user" | "bot";
  text: string;
  time: number;
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  const newR = Math.max(0, Math.min(255, r + (r * percent) / 100));
  const newG = Math.max(0, Math.min(255, g + (g * percent) / 100));
  const newB = Math.max(0, Math.min(255, b + (b * percent) / 100));

  // Convert back to hex
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export default function DemoChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [warmupPingSent, setWarmupPingSent] = useState(false);
  const [clientId, setClientId] = useState<string>("1001"); // Default fallback

  // thinking = server processing / waiting for reply
  // typing = character-by-character rendering of the bot reply
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Typing refs
  const typingIntervalRef = useRef<number | null>(null);
  const typingMessageIndexRef = useRef<number | null>(null);

  // Widget color customization
  const [primaryColor, setPrimaryColor] = useState("#8A06E6");

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Load saved color from localStorage
    const savedColor = localStorage.getItem("widget_primary_color");
    if (savedColor) {
      setPrimaryColor(savedColor);
    }

    // Load client_id from user data in localStorage
    // The user object stores the identifier as 'id', not 'client_id'
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        // Use 'id' field from user data as the client_id
        if (userData?.id) {
          setClientId(userData.id);
        }
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    // Listen for color changes
    const handleColorChange = (event: CustomEvent) => {
      if (event.detail?.primaryColor) {
        setPrimaryColor(event.detail.primaryColor);
      }
    };

    window.addEventListener("widgetColorChange" as any, handleColorChange);

    return () => {
      window.removeEventListener("widgetColorChange" as any, handleColorChange);
    };
  }, []);

  // Initialize session
  useEffect(() => {
    // Generate a new session ID for each page load
    const sid = crypto.randomUUID();
    setSessionId(sid);

    // Initial greeting
    setMessages([
      {
        role: "bot",
        text: "Hi! I'm ready whenever you are. What would you like to talk about?",
        time: Date.now(),
      },
    ]);

    // Send warmup ping to reduce first-message latency
    if (!warmupPingSent) {
      sendWarmupPing();
      setWarmupPingSent(true);
    }
  }, []);

  // Smart Auto-scroll
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const isNearBottom =
        scrollArea.scrollHeight -
          scrollArea.scrollTop -
          scrollArea.clientHeight <
        100;

      if (
        isNearBottom ||
        messages[messages.length - 1]?.role === "user" ||
        isTyping
      ) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isThinking, isTyping]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

  // Typing effect function
  const startTyping = (fullText: string, typingSpeed = 30) => {
    // stop any previous typing
    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      typingMessageIndexRef.current = null;
    }

    // As soon as we start actual typing, remove the thinking/loader UI
    setIsThinking(false);
    setIsTyping(true);

    // push initial empty bot message and persist
    const timestamp = Date.now();
    setMessages((prev: Message[]) => {
      const arr: Message[] = [
        ...prev,
        {
          role: "bot",
          text: "",
          time: timestamp,
        },
      ];

      typingMessageIndexRef.current = arr.length - 1;

      return arr;
    });

    // start interval to append characters
    let charIndex = 0;
    typingIntervalRef.current = window.setInterval(() => {
      charIndex += 1;
      setMessages((prev) => {
        const arr = [...prev];
        const mi = typingMessageIndexRef.current;
        if (mi == null || mi < 0 || mi >= arr.length) {
          return prev;
        }

        const nextText = fullText.slice(0, charIndex);
        arr[mi] = { ...arr[mi], text: nextText };

        // finished
        if (charIndex >= fullText.length) {
          if (typingIntervalRef.current) {
            window.clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          typingMessageIndexRef.current = null;
          setIsTyping(false);
        }

        return arr;
      });
    }, typingSpeed);
  };

  // Warmup ping function to reduce first-message latency
  const sendWarmupPing = () => {
    const pingUrl = `https://widget-worker.khanshohaibhossain.workers.dev/api/support-bot/ping?client_id=${clientId}&bot_id=2001`;

    fetch(pingUrl, { method: "GET" })
      .then(() => {
        // Ping successful - worker and backend are warmed
        console.log("Warmup ping successful");
      })
      .catch((err) => {
        // Silently fail - not critical
        console.warn("Warmup ping failed:", err);
      });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isThinking || isTyping) return;

    const userText = input.trim();
    setInput("");

    const newMessage: Message = {
      role: "user",
      text: userText,
      time: Date.now(),
    };
    // optimistic add user message
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // show thinking (loader) while waiting for server response
    setIsThinking(true);

    try {
      // Get generated API key from localStorage
      const generatedApiKey = localStorage.getItem("generated_api_key");

      // Check if user has generated an API key
      if (!generatedApiKey) {
        const errorText =
          "API key not found. Please generate an API key in Settings to use the chatbot.";
        toast.error("API Key Required", {
          description:
            "Go to Settings → API Key Management to generate your key.",
        });
        throw new Error(errorText);
      }

      // Check payment status from user data
      const userStr = localStorage.getItem("user");
      let hasPaid = false;

      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          const betterUserData = userData?.user_metadata?.better_user;

          if (betterUserData) {
            // Handle both string and object formats
            let betterUser = betterUserData;
            if (typeof betterUserData === "string") {
              betterUser = JSON.parse(betterUserData);
            }
            hasPaid = betterUser?.auth === "persistroot";
          }
        } catch (e) {
          console.error("Failed to parse user data:", e);
          // If parsing fails, assume not paid
          hasPaid = false;
        }
      }

      if (!hasPaid) {
        const errorText =
          "Payment required. Please upgrade your plan to use the chatbot.";
        toast.error("Payment Required", {
          description: "Complete payment in Settings to access the chatbot.",
        });
        throw new Error(errorText);
      }

      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/support-bot/query",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": generatedApiKey,
          },
          body: JSON.stringify({
            client_id: clientId,
            user_message: userText,
            session_id: sessionId || crypto.randomUUID(),
            page_url: window.location.href,
            bot_id: "2001",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Parse details if it's a JSON string
        const details =
          typeof errorData.details === "string"
            ? (JSON.parse(errorData.details) as { error?: string })
            : {};

        console.log(details);

        const errorCode =
          details.error ||
          errorData.error ||
          errorData.status ||
          "unknown_error";

        let errorMessage = "Sorry, something went wrong. Please try again.";

        if (errorCode === "Invalid API key") {
          errorMessage =
            "Invalid API key. Please regenerate your API key in Settings.";
          toast.error("Invalid API Key", {
            description:
              "Your API key is invalid. Please regenerate it in Settings.",
          });
        } else if (errorCode === "invalid_request") {
          errorMessage = "Your trial has ended. Upgrade to continue.";
          toast.error("Trial Ended", {
            description:
              "Please upgrade your plan to continue using the chatbot.",
          });
        } else if (errorCode === "rate_limit") {
          errorMessage = "Too many requests. Please try again shortly.";
          toast.error("Rate Limit Exceeded", {
            description:
              "You're sending too many messages. Please wait a moment.",
          });
        } else if (response.status === 403) {
          errorMessage = "Payment required to use the chatbot.";
          toast.error("Payment Required", {
            description: "Complete payment in Settings to access the chatbot.",
          });
        } else {
          toast.error("Error", {
            description: errorMessage,
          });
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const botText =
        data.bot_answer ||
        data.reply ||
        (data.messages && data.messages[0]?.text) ||
        "Sorry, I didn't get that.";

      // choose faster speeds (a little faster)
      const speed = botText.length > 200 ? 8 : 10;
      startTyping(botText, speed);
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorText =
        error.message || "Sorry, something went wrong. Please try again.";
      startTyping(errorText, 10);
    } finally {
      // do not change thinking/typing here — startTyping will clear thinking
    }
  };

  if (!mounted) return null;

  return (
    <div className="font-sans w-full h-full flex flex-col">
      <style jsx global>{`
        @keyframes typing {
          0% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
        }
        .typing-dot {
          animation: typing 1s infinite;
        }
        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.12s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.24s;
        }
      `}</style>

      <Card className="w-full h-full flex flex-col overflow-hidden rounded-[14px] py-0 shadow-xl border-[#E5E7EB] bg-[#ffffff]">
        {/* Header */}
        <CardHeader
          className="flex flex-row h-16 items-center justify-between p-[12px_14px] shadow-[0_2px_6px_rgba(0,0,0,0.06)] space-y-0"
          style={{
            background: `linear-gradient(90deg, ${primaryColor}, ${adjustColorBrightness(
              primaryColor,
              -10
            )})`,
          }}
        >
          <div className="flex items-center gap-2">
            {/* Custom Icon Container */}
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              {/* White diamond/star shape */}
              <Image src="/images/Text.png" alt="Text" width={20} height={20} />
            </div>

            <div className="flex flex-col">
              <div className="text-[15px] font-semibold text-white leading-tight">
                Support Assistant
              </div>
            </div>
          </div>

          {/* Green active dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] mr-3 animate-pulse" />
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-[#F5F7FA]">
          {/* Messages Area */}
          <div
            ref={scrollAreaRef}
            className="chat-scroll flex-1 overflow-y-auto p-[12px] space-y-[10px]"
            aria-live="polite"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-[10px] items-end ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && (
                  <div
                    className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold text-white select-none text-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[78%] p-[10px_12px] rounded-[12px] text-[14px] leading-[1.45] wrap-break-words shadow-[0_2px_6px_rgba(2,6,23,0.04)] ${
                    msg.role === "user"
                      ? "text-white rounded-tr-[2px]"
                      : "bg-white text-[#111827] border-[#E5E7EB] rounded-tl-[2px]"
                  }`}
                  style={{
                    backgroundColor:
                      msg.role === "user" ? primaryColor : undefined,
                    borderStyle: msg.role === "user" ? "none" : "solid",
                    borderWidth: msg.role === "user" ? 0 : 1,
                    boxShadow:
                      msg.role === "user"
                        ? `0 2px 6px ${primaryColor}40`
                        : undefined,
                  }}
                >
                  {msg.text}
                </div>

                {msg.role === "user" && (
                  <div
                    className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold text-white select-none text-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    You
                  </div>
                )}
              </div>
            ))}

            {/* Show thinking loader (...) only while waiting for server response,
                and hide it immediately once typing starts */}
            {isThinking && !isTyping && (
              <div className="flex gap-[10px] items-end justify-start">
                <div
                  className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold select-none text-xs text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  AI
                </div>
                <div className="p-[10px_12px] rounded-[12px] rounded-tl-[2px] shadow-[0_2px_6px_rgba(2,6,23,0.04)] bg-white border border-[#E5E7EB]">
                  <div className="flex gap-[4px] items-center h-[20px]">
                    <div
                      className="w-[7px] h-[7px] rounded-full opacity-90 typing-dot"
                      style={{ backgroundColor: "#9CA3AF" }}
                    />
                    <div
                      className="w-[7px] h-[7px] rounded-full opacity-90 typing-dot"
                      style={{ backgroundColor: "#9CA3AF" }}
                    />
                    <div
                      className="w-[7px] h-[7px] rounded-full opacity-90 typing-dot"
                      style={{ backgroundColor: "#9CA3AF" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-[12px] flex flex-col items-center gap-[8px] border-t border-[#E5E7EB] bg-[#FBFBFD] w-full">
            <form
              onSubmit={handleSend}
              className="relative w-full flex items-center"
            >
              {/* Pill Input (matches provided screenshot) */}
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-10 rounded-[28px] bg-[#f3f4f6] text-[15px] placeholder:text-[#9CA3AF] text-[#374151] pl-6 pr-24 border-0 outline-none shadow-sm focus:ring-2 focus:ring-slate-200 transition"
                disabled={isThinking || isTyping}
              />

              {/* Send button with dynamic color */}
              <button
                type="submit"
                disabled={!input.trim() || isThinking || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 text-white rounded-[12px] grid place-items-center shadow hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-transform"
                style={{ backgroundColor: primaryColor }}
                aria-label="Send message"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="text-xs text-center text-[#6B7280]">
              Powered by{" "}
              <Link
                href="https://cipherandrow.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                style={{ color: primaryColor }}
              >
                Cipher & Row
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
