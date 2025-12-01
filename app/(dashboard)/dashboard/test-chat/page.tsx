"use client";
import { useState, useEffect } from "react";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { Sparkles, Zap, Shield, Clock } from "lucide-react";

export default function TestChatPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      text: "Instant AI responses",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Sparkles,
      text: "Premium animations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      text: "Privacy-respecting",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      text: "Session persistence",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div
        className="absolute w-96 h-96 bg-purple-300/40 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          top: mousePosition.y - 192,
          left: mousePosition.x - 192,
          opacity: 0.4,
        }}
      />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div
        className={`relative z-10 p-8 max-w-6xl mx-auto space-y-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-12">
          <div className="inline-block">
            <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full border border-purple-300 backdrop-blur-sm mb-6 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span className="text-sm text-purple-700 font-medium">
                Experience the future of support
              </span>
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-linear-to-r from-slate-900 via-purple-700 to-cyan-700 bg-clip-text text-transparent animate-gradient">
            Test Your AI Support Bot
          </h1>

          <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            See how{" "}
            <span className="text-transparent bg-linear-to-r from-purple-600 to-cyan-600 bg-clip-text font-semibold">
              Cipher & Row
            </span>{" "}
            delivers instant, premium support that makes your business feel
            professional
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideUp 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                {feature.text}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-100/0 to-cyan-100/0 group-hover:from-purple-100/50 group-hover:to-cyan-100/50 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Main Showcase Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-400 to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />

          <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-200" />
              <span className="ml-auto text-xs text-slate-500 font-mono font-semibold">
                LIVE PREVIEW
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="inline-block w-1 h-6 bg-linear-to-b from-purple-500 to-cyan-500 rounded-full" />
              Interactive Widget Demo
            </h2>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Click the chat button in the bottom-right corner to experience the
              cleanest, fastest AI support widget. Watch how it responds
              instantly with smooth animations and on-brand answers.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 p-4 rounded-xl bg-linear-to-br from-yellow-50 to-orange-50 border border-orange-200">
                <div className="text-3xl">⚡</div>
                <h3 className="font-semibold text-slate-900">Lightning Fast</h3>
                <p className="text-sm text-slate-600">
                  Responses feel instant, not buffering
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200">
                <div className="text-3xl">✨</div>
                <h3 className="font-semibold text-slate-900">Premium Design</h3>
                <p className="text-sm text-slate-600">
                  Apple-level aesthetic and smoothness
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 border border-cyan-200">
                <div className="text-3xl">🎯</div>
                <h3 className="font-semibold text-slate-900">
                  Always Accurate
                </h3>
                <p className="text-sm text-slate-600">
                  Grounded in your knowledge base
                </p>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-200/30 rounded-full blur-2xl animate-float-delayed" />
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-8">
          {[
            "AI-Powered",
            "Session Memory",
            "Knowledge Base",
            "Zero Config",
            "Multi-tenant",
          ].map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm text-slate-700 font-medium hover:bg-white hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-default"
              style={{
                animationDelay: `${i * 50}ms`,
                animation: "fadeIn 0.5s ease-out forwards",
                opacity: 0,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}
