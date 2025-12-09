"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Zap, Calendar, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { userApi } from "@/lib/userApi";

export function TrialBanner() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        setIsLoading(true);
        const { trialStatus, subscriptionStatus } =
          await userApi.getCompleteUserStatus();

        // If user has active subscription, don't show trial banner
        if (subscriptionStatus.isSubscribed) {
          setIsTrialActive(false);
          setIsLoading(false);
          return;
        }

        // Show trial banner if trial is active
        setDaysRemaining(trialStatus.daysRemaining);
        setIsTrialActive(trialStatus.isActive);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user status:", error);
        setIsLoading(false);
      }
    };

    fetchUserStatus();
  }, []);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        throw new Error("Authentication required. Please sign in again.");
      }

      // Get user id from user data
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        throw new Error("User data not found. Please sign in again.");
      }

      const userData = JSON.parse(userStr);
      const clientId = userData?.id;

      if (!clientId) {
        throw new Error("User ID not found. Please sign in again.");
      }

      // Make request to create checkout session
      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/billing/checkout-session",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            client_id: clientId,
            return_url: window.location.origin + "/dashboard/overview",
            plan_slug: "pro",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.message ||
            "Failed to create checkout session"
        );
      }

      const data = await response.json();

      // Redirect to Stripe checkout URL
      if (data.url || data.checkout_url) {
        window.location.href = data.url || data.checkout_url;
      } else {
        throw new Error("No checkout URL returned from API");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast.error("Checkout Failed", {
        description:
          error.message || "Failed to start checkout. Please try again.",
      });
      setIsUpgrading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Store dismissal in sessionStorage (resets on page reload)
    sessionStorage.setItem("trial_banner_dismissed", "true");
  };

  // Don't show banner if dismissed, loading, or if trial data not loaded
  if (isDismissed || isLoading || daysRemaining === null) return null;

  // Don't show if trial is not active (expired)
  if (!isTrialActive) return null;

  // Determine urgency level for styling
  const isUrgent = daysRemaining <= 2;
  const isWarning = daysRemaining <= 4 && daysRemaining > 2;

  return (
    <div
      className={`relative text-white shadow-lg ${
        isUrgent
          ? "bg-linear-to-r from-orange-500 via-red-500 to-pink-600 animate-pulse"
          : isWarning
          ? "bg-linear-to-r from-amber-500 via-orange-500 to-amber-600"
          : "bg-linear-to-r from-[#8A06E6] via-[#925FF0] to-[#7A05D0]"
      }`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="container relative z-10 mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          {/* Left side - Trial info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Icon with glow effect */}
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm shrink-0 ring-2 ring-white/30 shadow-lg">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Trial status heading */}
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-4 h-4 sm:hidden shrink-0" />
                <p className="font-bold text-sm sm:text-base leading-tight">
                  {isUrgent ? (
                    <>
                      <span className="inline-flex items-center gap-1">
                        <Zap className="w-4 h-4 animate-bounce" />
                        Urgent: Trial Ending Soon!
                      </span>
                    </>
                  ) : (
                    "You're on a Free Trial"
                  )}
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md ${
                    isUrgent
                      ? "bg-white text-red-600 animate-bounce"
                      : isWarning
                      ? "bg-white text-orange-600"
                      : "bg-white/25 text-white backdrop-blur-sm ring-1 ring-white/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isUrgent
                        ? "bg-red-600 animate-ping"
                        : isWarning
                        ? "bg-orange-600"
                        : "bg-white"
                    }`}
                  ></div>
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                </span>
              </div>

              {/* Description text */}
              <p className="text-xs sm:text-sm text-white/95 mt-1 leading-relaxed">
                {isUrgent ? (
                  <span className="font-medium">
                    Your bot will stop working after trial ends. Upgrade now to
                    keep it live!
                  </span>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      Upgrade to keep your AI support bot live 24/7 after your
                      trial ends.
                    </span>
                    <span className="sm:hidden">
                      Upgrade to continue using your bot.
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className={`flex-1 sm:flex-none font-bold text-sm px-5 sm:px-8 h-10 sm:h-11 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 ${
                isUrgent
                  ? "bg-white text-red-600 hover:bg-gray-50"
                  : "bg-white text-[#8A06E6] hover:bg-gray-50"
              }`}
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Now
                </>
              )}
            </Button>

            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-lg shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
