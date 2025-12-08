"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Installation() {
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState<"bottom-right" | "bottom-left">(
    "bottom-right"
  );
  const [primaryColor, setPrimaryColor] = useState("#925FF0");
  const [greeting, setGreeting] = useState("Hi! How can we help you today?");
  const [saved, setSaved] = useState(false);
  const [clientId, setClientId] = useState("1001");
  const [botId, setBotId] = useState("2001");
  const [code, setCode] = useState("");

  // Generate installation code based on current settings
  const generateInstallationCode = () => {
    // Get API key from localStorage
    const apiKey = localStorage.getItem("generated_api_key") || "YOUR_API_KEY_HERE";

    return `<!-- Cipher & Row Widget Configuration -->
<script>
  window.CipherRowConfig = {
    clientId: "${clientId}",
    botId: "${botId}",
    apiKey: "${apiKey}",
    primaryColor: "${primaryColor}",
    greeting: "${greeting}",
    position: "${position}"
  };
</script>

<!-- Widget Container -->
<div id="cr-widget"></div>

<!-- Widget Script -->
<script src="https://widget-test-bfq.pages.dev/widget.js"></script>

<!-- Initialize Widget -->
<script>
  window.addEventListener("load", function() {
    if (window.CRWidget) {
      CRWidget.init({});
    }
  });
</script>`;
  };

  // Load widget settings from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("widget_primary_color");
    const savedPosition = localStorage.getItem("widget_position");
    const savedGreeting = localStorage.getItem("widget_greeting");

    if (savedColor) setPrimaryColor(savedColor);
    if (savedPosition) setPosition(savedPosition as "bottom-right" | "bottom-left");
    if (savedGreeting) setGreeting(savedGreeting);

    // Load user data for clientId
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData?.id) {
          setClientId(userData.id);
        }
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  // Update installation code whenever settings change
  useEffect(() => {
    setCode(generateInstallationCode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryColor, greeting, position, clientId, botId]);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1600);
      return () => clearTimeout(t);
    }
  }, [copied]);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 1800);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (e) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
    }
  };

  const handleSave = () => {
    // Save widget settings to localStorage
    localStorage.setItem("widget_primary_color", primaryColor);
    localStorage.setItem("widget_position", position);
    localStorage.setItem("widget_greeting", greeting);

    // Dispatch custom events to notify DemoChatWidget about changes
    window.dispatchEvent(new CustomEvent("widgetColorChange", {
      detail: { primaryColor }
    }));

    window.dispatchEvent(new CustomEvent("widgetGreetingChange", {
      detail: { greeting }
    }));

    setSaved(true);
  };

  const handlePlatformGuideClick = () => {
    toast.info("Coming Soon", {
      description: "Platform-specific guides will be available in v1.1",
    });
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-4 py-4 sm:py-6 md:py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900">
            Installation
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-500">
            Add the support widget to your website in seconds
          </p>
        </div>
      </div>

      {/* Steps cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          {
            id: 1,
            title: "Copy the Code",
            subtitle: "Copy the installation code snippet from below",
          },
          {
            id: 2,
            title: "Add to Your Site",
            subtitle: "Paste it before the closing </body> tag",
          },
          {
            id: 3,
            title: "Go Live",
            subtitle: "Your chat widget will appear automatically",
          },
        ].map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-sm shadow-md p-4 sm:p-5 md:p-6"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-sm sm:text-base">
                {card.id}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  {card.title}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-3">
                  {card.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Installation code block */}
      <div className="bg-white rounded-sm shadow mb-6 sm:mb-8">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
          <h3 className="text-base sm:text-lg font-medium text-slate-800">
            Installation Code
          </h3>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-md shadow hover:opacity-95 text-sm shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16h8M8 12h8m-6-8h6a2 2 0 012 2v6"
              />
            </svg>
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>

        <div className="rounded-sm overflow-hidden">
          <pre
            className="p-4 sm:p-5 md:p-6 text-xs sm:text-sm font-mono bg-clip-padding whitespace-pre-wrap wrap-break-words"
            style={{ backgroundColor: "#4b1d66" }}
          >
            <code className="text-white">{code}</code>
          </pre>
        </div>
      </div>

      {/* Widget Customization */}
      <div className="bg-white rounded-sm shadow p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-4 sm:mb-5">
          Widget Customization
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {/* Position */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Globe width={16} height={16} className="text-[#725FF0]" />{" "}
              Position
            </label>
            <div className="flex rounded-sm bg-slate-100 p-1 w-full">
              <button
                onClick={() => setPosition("bottom-right")}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-sm font-medium text-xs sm:text-sm ${
                  position === "bottom-right"
                    ? "bg-slate-900 text-white"
                    : "text-[#725FF0] bg-[#725FF0]/10"
                }`}
              >
                Bottom Right
              </button>
              <button
                onClick={() => setPosition("bottom-left")}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-sm font-medium text-xs sm:text-sm ${
                  position === "bottom-left"
                    ? "bg-slate-900 text-white"
                    : "text-[#725FF0] bg-[#725FF0]/10"
                }`}
              >
                Bottom Left
              </button>
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16.000000"
                height="16.000000"
                fill="none"
              >
                <rect
                  id="Icon"
                  width="16.000000"
                  height="16.000000"
                  x="0.000000"
                  y="0.000000"
                />
                <path
                  id="Vector"
                  d="M3.286 12.7141C2.03575 11.4638 1.33337 9.76815 1.33337 8.00004C1.33337 6.23193 2.03575 4.53624 3.286 3.286C4.53624 2.03575 6.23193 1.33337 8.00004 1.33337C9.76815 1.33337 11.4638 1.96552 12.7141 3.09073C13.9643 4.21595 14.6667 5.74207 14.6667 7.33337C14.6667 8.21743 14.3155 9.06528 13.6904 9.6904C13.0653 10.3155 12.2174 10.6667 11.3334 10.6667L9.83337 10.6667C9.61671 10.6667 9.40433 10.727 9.22002 10.8409C9.03572 10.9549 8.88677 11.1178 8.78988 11.3116C8.69298 11.5054 8.65196 11.7224 8.67142 11.9381C8.69088 12.1539 8.77004 12.36 8.90004 12.5334L9.10004 12.8C9.23004 12.9734 9.3092 13.1795 9.32866 13.3953C9.34812 13.6111 9.3071 13.828 9.21021 14.0218C9.11331 14.2156 8.96437 14.3786 8.78006 14.4925C8.59576 14.6064 8.38337 14.6667 8.16671 14.6667L8.00004 14.6667C6.23193 14.6667 4.53624 13.9643 3.286 12.7141Z"
                  fill-rule="nonzero"
                  stroke="rgb(120,77,199)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.33333337"
                />
                <path
                  id="Vector"
                  d="M8.99996 4.66667C9.18405 4.66667 9.33329 4.51743 9.33329 4.33333C9.33329 4.14924 9.18405 4 8.99996 4C8.81586 4 8.66663 4.14924 8.66663 4.33333C8.66663 4.51743 8.81586 4.66667 8.99996 4.66667Z"
                  fill="rgb(120,77,199)"
                  fill-rule="evenodd"
                />
                <path
                  id="Vector"
                  d="M8.99996 4.66667C8.81586 4.66667 8.66663 4.51743 8.66663 4.33333C8.66663 4.14924 8.81586 4 8.99996 4C9.18405 4 9.33329 4.14924 9.33329 4.33333C9.33329 4.51743 9.18405 4.66667 8.99996 4.66667Z"
                  fill-rule="evenodd"
                  stroke="rgb(120,77,199)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.33333337"
                />
                <path
                  id="Vector"
                  d="M11.6667 7.33329C11.8508 7.33329 12 7.18405 12 6.99996C12 6.81586 11.8508 6.66663 11.6667 6.66663C11.4826 6.66663 11.3334 6.81586 11.3334 6.99996C11.3334 7.18405 11.4826 7.33329 11.6667 7.33329Z"
                  fill="rgb(120,77,199)"
                  fill-rule="evenodd"
                />
                <path
                  id="Vector"
                  d="M11.6667 7.33329C11.4826 7.33329 11.3334 7.18405 11.3334 6.99996C11.3334 6.81586 11.4826 6.66663 11.6667 6.66663C11.8508 6.66663 12 6.81586 12 6.99996C12 7.18405 11.8508 7.33329 11.6667 7.33329Z"
                  fill-rule="evenodd"
                  stroke="rgb(120,77,199)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.33333337"
                />
                <path
                  id="Vector"
                  d="M4.33333 8.66667C4.51743 8.66667 4.66667 8.51743 4.66667 8.33333C4.66667 8.14924 4.51743 8 4.33333 8C4.14924 8 4 8.14924 4 8.33333C4 8.51743 4.14924 8.66667 4.33333 8.66667Z"
                  fill="rgb(120,77,199)"
                  fill-rule="evenodd"
                />
                <path
                  id="Vector"
                  d="M4.33333 8.66667C4.14924 8.66667 4 8.51743 4 8.33333C4 8.14924 4.14924 8 4.33333 8C4.51743 8 4.66667 8.14924 4.66667 8.33333C4.66667 8.51743 4.51743 8.66667 4.33333 8.66667Z"
                  fill-rule="evenodd"
                  stroke="rgb(120,77,199)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.33333337"
                />
                <path
                  id="Vector"
                  d="M5.66671 5.33329C5.8508 5.33329 6.00004 5.18405 6.00004 4.99996C6.00004 4.81586 5.8508 4.66663 5.66671 4.66663C5.48261 4.66663 5.33337 4.81586 5.33337 4.99996C5.33337 5.18405 5.48261 5.33329 5.66671 5.33329Z"
                  fill="rgb(120,77,199)"
                  fill-rule="evenodd"
                />
                <path
                  id="Vector"
                  d="M5.66671 5.33329C5.48261 5.33329 5.33337 5.18405 5.33337 4.99996C5.33337 4.81586 5.48261 4.66663 5.66671 4.66663C5.8508 4.66663 6.00004 4.81586 6.00004 4.99996C6.00004 5.18405 5.8508 5.33329 5.66671 5.33329Z"
                  fill-rule="evenodd"
                  stroke="rgb(120,77,199)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.33333337"
                />
              </svg>
              Primary Color
            </label>
            <div className="flex items-center gap-2 sm:gap-3">
              <Input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-9 sm:w-12 sm:h-10 rounded-md border shrink-0"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 rounded-md border px-3 py-2 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Greeting Message */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <MessageSquare
                width={16}
                height={16}
                className="text-[#725FF0]"
              />
              Greeting Message
            </label>
            <Input
              type="text"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-xs sm:text-sm"
            />
          </div>

          {/* Save */}
          <div className="pt-1 sm:pt-2">
            <Button
              onClick={handleSave}
              className="w-full bg-slate-900 rounded-sm text-white py-5 sm:py-6 font-semibold shadow hover:opacity-95 text-sm sm:text-base"
            >
              Save Changes
            </Button>
            {saved && (
              <div className="mt-2 text-xs sm:text-sm text-emerald-600 font-medium">
                Saved ✓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform Specific Guides */}
      <div className="bg-white rounded-lg sm:rounded-2xl shadow p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-3 sm:mb-4">
          Platform-Specific Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { title: "WordPress", subtitle: "Installation guide →" },
            { title: "Shopify", subtitle: "Installation guide →" },
            { title: "Custom HTML", subtitle: "Installation guide →" },
          ].map((g) => (
            <div
              key={g.title}
              onClick={handlePlatformGuideClick}
              className="p-3 sm:p-4 border rounded-lg hover:border-[#725FF0] hover:bg-[#725FF0]/5 transition-all duration-200 cursor-pointer"
            >
              <div className="font-semibold text-slate-900 text-sm sm:text-base">
                {g.title}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">
                {g.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
