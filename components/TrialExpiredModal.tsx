"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, CheckCircle2, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { userApi } from "@/lib/userApi";
import axiosInstance from "@/lib/axiosInstance";

export function TrialExpiredModal() {
  const router = useRouter();
  const [isExpired, setIsExpired] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubscriptionInfo, setShowSubscriptionInfo] = useState(false);
  const [daysUntilBilling, setDaysUntilBilling] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        setIsLoading(true);
        const { trialStatus, subscriptionStatus } =
          await userApi.getCompleteUserStatus();

        // If user has active subscription, show subscription info instead
        if (subscriptionStatus.isSubscribed) {
          setIsExpired(false);
          setShowSubscriptionInfo(true);
          setDaysUntilBilling(subscriptionStatus.daysUntilNextBilling);
          setIsLoading(false);
          return;
        }

        // Check if trial is expired
        if (trialStatus.isExpired) {
          setIsExpired(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking trial expiry:", error);
        setIsLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  const handleUpgrade = () => {
    // Redirect to settings page with anchor to billing section
    router.push("/dashboard/settings#billing-plans");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@cipherandrow.com";
  };

  // Don't show modal while loading
  if (isLoading) return null;

  // Show subscription info modal if user has active subscription
  if (showSubscriptionInfo) {
    return (
      <Dialog
        open={showSubscriptionInfo}
        onOpenChange={setShowSubscriptionInfo}
      >
        <DialogContent className="sm:max-w-[520px] border-green-200 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4 mb-2">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-green-100">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold text-slate-900 mb-2">
                  You're All Set!
                </DialogTitle>
                <p className="text-base text-slate-600">
                  Your subscription is active and your bot is live
                </p>
              </div>
            </div>
            <DialogDescription className="text-base text-slate-600 pt-4 space-y-4">
              <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">
                    Next Billing Period
                  </p>
                </div>
                <p className="text-2xl font-bold text-green-700 mb-1">
                  {daysUntilBilling} {daysUntilBilling === 1 ? "day" : "days"}
                </p>
                <p className="text-xs text-green-600">
                  until your next billing cycle
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <p className="text-sm text-purple-900 font-semibold mb-3">
                  Active Features:
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    "Unlimited conversations",
                    "24/7 AI-powered support bot",
                    "Full knowledge base access",
                    "Priority customer support",
                    "Advanced analytics & reporting",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span className="text-sm text-purple-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowSubscriptionInfo(false)}
              className="w-full sm:w-auto bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg px-8 shadow-lg"
            >
              Continue to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Show trial expired modal
  return (
    <Dialog open={isExpired} onOpenChange={setIsExpired}>
      <DialogContent className="sm:max-w-[550px] border-red-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center text-center gap-4 mb-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center shadow-2xl ring-4 ring-red-100 animate-pulse">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-slate-900 mb-2">
                Trial Period Ended
              </DialogTitle>
              <p className="text-base text-slate-600">
                Your 7-day free trial has expired
              </p>
            </div>
          </div>
          <DialogDescription className="text-base text-slate-700 pt-4 space-y-4">
            <div className="bg-linear-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5">
              <p className="font-bold text-red-900 mb-2 text-center text-lg">
                ⚠️ Your Bot is Currently Offline
              </p>
              <p className="text-sm text-red-800 text-center">
                Upgrade now to reactivate your AI support bot and continue
                serving your customers without interruption.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm text-purple-900 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                Unlock Premium Features:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    icon: "💬",
                    text: "Unlimited conversations",
                    desc: "No limits on customer interactions",
                  },
                  {
                    icon: "🤖",
                    text: "24/7 AI-powered bot",
                    desc: "Always available for your customers",
                  },
                  {
                    icon: "📚",
                    text: "Full knowledge base",
                    desc: "Complete access to all features",
                  },
                  {
                    icon: "⚡",
                    text: "Priority support",
                    desc: "Get help when you need it",
                  },
                  {
                    icon: "📊",
                    text: "Advanced analytics",
                    desc: "Deep insights & reporting",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/60 rounded-lg p-3 border border-purple-100"
                  >
                    <span className="text-xl shrink-0">{feature.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-purple-900">
                        {feature.text}
                      </p>
                      <p className="text-xs text-purple-700">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs text-amber-800 text-center">
                💡 <span className="font-semibold">Need more time?</span>{" "}
                Contact our support team to discuss your options.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-3 pt-2">
          <Button
            onClick={handleContactSupport}
            variant="outline"
            className="w-full sm:flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium h-12"
          >
            Contact Support
          </Button>
          <Button
            onClick={handleUpgrade}
            className="w-full sm:flex-1 bg-linear-to-r from-[#8A06E6] via-[#925FF0] to-[#7A05D0] hover:from-[#7505C7] hover:via-[#8A06E6] hover:to-[#6B04B8] text-white font-bold rounded-lg h-12 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
