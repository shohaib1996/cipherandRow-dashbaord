"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, X, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";

interface Message {
  role: "user" | "bot";
  text: string;
  time: number;
}

export default function ChatWidget({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(embedded); // Default to open if embedded

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

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize session and load history
  useEffect(() => {
    let sid = localStorage.getItem("cr_widget_session_id");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("cr_widget_session_id", sid);
    }
    setSessionId(sid);

    const savedMessages = localStorage.getItem(`cr_widget_messages_${sid}`);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse messages", e);
      }
    } else {
      // Initial greeting if no history
      setMessages([
        { role: "bot", text: "Hello! How can I help you?", time: Date.now() },
      ]);
    }
  }, []);

  // Smart Auto-scroll
  useEffect(() => {
    if (!isOpen && !embedded) return; // Only scroll if open (always open if embedded)
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
  }, [messages, isThinking, isTyping, isOpen, embedded]);

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

  // Helper to persist messages
  const persistMessages = (arr: Message[]) => {
    setMessages(arr);
    if (sessionId) {
      try {
        localStorage.setItem(
          `cr_widget_messages_${sessionId}`,
          JSON.stringify(arr)
        );
      } catch (e) {
        /* ignore */
      }
    }
  };

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

      if (sessionId) {
        localStorage.setItem(
          `cr_widget_messages_${sessionId}`,
          JSON.stringify(arr)
        );
      }

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

        // persist partial typing
        if (sessionId) {
          try {
            localStorage.setItem(
              `cr_widget_messages_${sessionId}`,
              JSON.stringify(arr)
            );
          } catch (e) {
            /* ignore */
          }
        }

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
    persistMessages(updatedMessages);

    // show thinking (loader) while waiting for server response
    setIsThinking(true);

    try {
      const response = await fetch(
        "https://widget-worker.khanshohaibhossain.workers.dev/api/widget",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            user_message: userText,
            client_id: "dashboard_test",
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const botText =
        data.reply ||
        (data.messages && data.messages[0]?.text) ||
        "Sorry, I didn't get that.";

      // choose faster speeds (a little faster)
      const speed = botText.length > 200 ? 8 : 10;
      startTyping(botText, speed);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorText = "Sorry, something went wrong. Please try again.";
      startTyping(errorText, 10);
    } finally {
      // do not change thinking/typing here — startTyping will clear thinking
    }
  };

  if (!mounted) return null;

  return (
    <div className="font-sans">
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

      {/* Chat Window */}
      <div
        className={
          embedded
            ? "relative w-full h-full flex flex-col"
            : `fixed bottom-[90px] right-5 z-50 transition-all duration-300 ease-in-out transform origin-bottom-right ${
                isOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 translate-y-4 pointer-events-none"
              }`
        }
        aria-hidden={!isOpen && !embedded}
      >
        <Card
          className={
            embedded
              ? "w-full h-full flex flex-col overflow-hidden rounded-[14px] shadow-none border-0 bg-[#ffffff]"
              : "w-[360px] py-0 h-[520px] gap-3 max-w-[calc(100vw-40px)] flex flex-col overflow-hidden rounded-[14px] shadow-[0_10px_25px_rgba(2,6,23,0.08)] border-[#E5E7EB] bg-[#ffffff]"
          }
        >
          {/* Header */}
          <CardHeader className="flex flex-row h-16 items-center justify-between p-[12px_14px] shadow-[0_2px_6px_rgba(0,0,0,0.06)] space-y-0 bg-[linear-gradient(90deg,#8A06E6,#7A05D0)]">
            <div className="flex items-center gap-2">
              {/* Custom Icon Container */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                {/* White diamond/star shape */}
                <Image
                  src="/images/Text.png"
                  alt="Text"
                  width={20}
                  height={20}
                />
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
                    <div className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold text-white select-none text-xs bg-[#8A06E6]">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] p-[10px_12px] rounded-[12px] text-[14px] leading-[1.45] wrap-break-words shadow-[0_2px_6px_rgba(2,6,23,0.04)] ${
                      msg.role === "user"
                        ? "bg-[#8A06E6] text-white rounded-tr-[2px] shadow-[0_2px_6px_rgba(138,6,230,0.25)]"
                        : "bg-white text-[#111827] border-[#E5E7EB] rounded-tl-[2px]"
                    }`}
                    style={{
                      borderStyle: msg.role === "user" ? "none" : "solid",
                      borderWidth: msg.role === "user" ? 0 : 1,
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold text-white bg-[#8A06E6] select-none text-xs">
                      You
                    </div>
                  )}
                </div>
              ))}

              {/* Show thinking loader (...) only while waiting for server response,
                  and hide it immediately once typing starts */}
              {isThinking && !isTyping && (
                <div className="flex gap-[10px] items-end justify-start">
                  <div className="w-[34px] h-[34px] rounded-full shrink-0 grid place-items-center font-bold select-none text-xs bg-[#8A06E6] text-white">
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

                {/* Black rounded-square send button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8A06E6] text-white rounded-[12px] grid place-items-center shadow hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-transform"
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
                  className="font-medium hover:underline text-[#8A06E6]"
                >
                  Cipher & Row
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Toggle Button - Only show if not embedded */}
      {!embedded && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#8A06E6] rounded-full shadow-[0_10px_25px_rgba(138,6,230,0.3)] grid place-items-center cursor-pointer hover:bg-[#7A05D0] hover:scale-105 transition-all duration-200 z-50"
          aria-label="Toggle chat"
          role="button"
        >
          {isOpen ? (
            <X className="text-white w-8 h-8" />
          ) : (
            <MessageCircle className="text-white w-8 h-8" />
          )}
        </div>
      )}
    </div>
  );
}
