"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function TrialExpiredModal() {
  const router = useRouter();
  const [isExpired, setIsExpired] = useState(false);
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

      // Trial is 7 days - if more than 7 days have passed, trial is expired
      if (daysPassed > 7) {
        setIsExpired(true);
      }
    } catch (error) {
      console.error("Error checking trial expiry:", error);
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

  const handleContactSupport = () => {
    window.location.href = "mailto:support@cipherandrow.com";
  };

  return (
    <AlertDialog open={isExpired}>
      <AlertDialogContent className="sm:max-w-[500px] [&>button]:hidden">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-orange-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900">
              Trial Expired
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base text-slate-600 pt-2">
            <p className="font-semibold text-slate-900 mb-3">
              Your 7-day free trial has ended.
            </p>
            <p className="mb-4">
              To continue using your support bot and keep it live for your
              customers, please upgrade to a paid plan.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-900 font-medium mb-2">
                What you'll get with an upgrade:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-purple-800">
                <li>Unlimited conversations</li>
                <li>24/7 AI-powered support bot</li>
                <li>Full knowledge base access</li>
                <li>Priority customer support</li>
                <li>Advanced analytics and reporting</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={handleContactSupport}
            variant="outline"
            className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-100 rounded-md"
          >
            Contact Support
          </Button>
          <Button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="w-full sm:w-auto bg-[#8A06E6] hover:bg-[#7505C7] text-white font-semibold rounded-md disabled:opacity-50"
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
