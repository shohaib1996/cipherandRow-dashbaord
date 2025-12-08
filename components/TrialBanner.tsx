"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Zap, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function TrialBanner() {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const userData = JSON.parse(userStr);
      const createdAt = userData.created_at;

      if (!createdAt) return;

      // Calculate days since signup
      const signupDate = new Date(createdAt);
      const today = new Date();
      const diffTime = today.getTime() - signupDate.getTime();
      const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Trial is 7 days
      const trialDays = 7;
      const remaining = trialDays - daysPassed;

      setDaysRemaining(remaining);

      // Check if trial is still active (within 7 days)
      if (remaining > 0) {
        setIsTrialActive(true);
      } else {
        setIsTrialActive(false);
      }
    } catch (error) {
      console.error("Error calculating trial:", error);
    }
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

  // Don't show banner if dismissed or if trial data not loaded
  if (isDismissed || daysRemaining === null) return null;

  // Don't show if trial is not active (expired)
  if (!isTrialActive) return null;

  return (
    <div className="bg-linear-to-r from-[#8A06E6] via-[#925FF0] to-[#7A05D0] text-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left side - Trial info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:hidden" />
                You're on a free trial.{" "}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-xs sm:text-sm font-bold">
                  {daysRemaining} {daysRemaining === 1 ? "day" : "days"}{" "}
                  remaining
                </span>
              </p>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5 hidden sm:block">
                Upgrade to keep your support bot live after your trial ends.
              </p>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="bg-white text-[#8A06E6] hover:bg-white/90 font-semibold text-sm px-4 sm:px-6 h-9 sm:h-10 rounded-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Upgrade Now"
              )}
            </Button>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors p-1"
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
