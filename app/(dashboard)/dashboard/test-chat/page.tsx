import DemoChatWidget from "@/components/ChatWidget/DemoChatWidget";
import { Sparkles, Zap, Shield, Clock, CheckCircle2 } from "lucide-react";
import React from "react";

export default function TestChatPage() {
  return (
    <div className="h-full bg-slate-50 p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center h-full">
        {/* Left Column: Product Info */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-100 rounded-full border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
            <span className="text-xs sm:text-sm text-purple-700 font-medium">
              Live Preview
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Test Your AI <br />
            <span className="text-purple-600">Support Assistant</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-lg">
            Experience how your customers will interact with your chatbot. Test
            responses, check knowledge base integration, and verify the user
            experience in real-time.
          </p>

          <div className="space-y-2.5 sm:space-y-3 lg:space-y-4 w-full flex flex-col items-center lg:items-start">
            {[
              "Instant AI Responses",
              "Knowledge Base Integration",
              "24/7 Availability",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 sm:pt-4 w-full flex justify-center lg:justify-start">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {[
                "AI-Powered",
                "Session Memory",
                "Zero Config",
                "Multi-tenant",
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-600 font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Demo Chat Widget */}
        <div className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-200 rounded-full blur-3xl opacity-50" />

          <div className="relative h-full w-full shadow-xl sm:shadow-2xl rounded-xl sm:rounded-[14px] overflow-hidden border border-slate-100 bg-white">
            <DemoChatWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
