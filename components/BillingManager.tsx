"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Loader2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userApi } from "@/lib/userApi";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";

interface PlanFromAPI {
  slug: string;
  name: string;
  stripe_price_id: string;
  price_cents: number;
  currency: string;
  active: boolean;
  metadata: {
    features: string[];
    tokens_limit: number;
  };
  created_at: string;
}

interface Plan {
  slug: string;
  name: string;
  stripe_price_id: string;
  price_cents: number;
  currency: string;
  features: string[];
  highlight: boolean;
}

interface PlansResponseFromAPI {
  plans: PlanFromAPI[];
}

export default function BillingManager() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);
  const [currentPriceId, setCurrentPriceId] = useState<string | null>(null);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);
  const [subscribedPlanName, setSubscribedPlanName] = useState<string | null>(
    null
  );
  const [isTrialing, setIsTrialing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<{ monthly: Plan[]; yearly: Plan[] }>({
    monthly: [],
    yearly: [],
  });
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform API plan to internal Plan format
  const transformPlan = (apiPlan: PlanFromAPI): Plan => ({
    slug: apiPlan.slug,
    name: apiPlan.name,
    stripe_price_id: apiPlan.stripe_price_id,
    price_cents: apiPlan.price_cents,
    currency: apiPlan.currency,
    features: apiPlan.metadata.features,
    highlight: apiPlan.slug.toLowerCase().includes("pro"), // Highlight 'pro' plans
  });

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoadingPlans(true);
        const response = await axiosInstance.get<PlansResponseFromAPI>(
          "/plans",
          {
            skipAuth: true, // Public endpoint
          }
        );

        // Transform API response to internal format
        // Separate plans into monthly and yearly based on slug
        const allPlans = response.data.plans.map(transformPlan);

        const transformedPlans = {
          monthly: allPlans.filter((plan) => !plan.slug.includes("yearly")),
          yearly: allPlans.filter((plan) => plan.slug.includes("yearly")),
        };

        setPlans(transformedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        toast.error("Failed to Load Plans", {
          description: "Could not load pricing plans. Please refresh the page.",
        });
      } finally {
        setIsLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Fetch user subscription status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { profile, subscriptionStatus } =
          await userApi.getCompleteUserStatus();

        if (
          profile?.subscription?.status === "active" ||
          profile?.subscription?.status === "trialing"
        ) {
          setCurrentPriceId(profile.subscription.price_id);
          setIsTrialing(profile.subscription.status === "trialing");

          // Set the correct date: trial_end for trialing, current_period_end for active
          if (
            profile.subscription.status === "trialing" &&
            profile.subscription.trial_end
          ) {
            setNextBillingDate(profile.subscription.trial_end);
          } else {
            setNextBillingDate(profile.subscription.current_period_end);
          }
        }
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // Find and set the subscribed plan name when plans are loaded and we have a price_id
  useEffect(() => {
    if (
      currentPriceId &&
      (plans.monthly.length > 0 || plans.yearly.length > 0)
    ) {
      // Search in all plans (both monthly and yearly)
      const allPlans = [...plans.monthly, ...plans.yearly];
      const subscribedPlan = allPlans.find(
        (plan) => plan.stripe_price_id === currentPriceId
      );

      if (subscribedPlan) {
        setSubscribedPlanName(subscribedPlan.name);
      }
    }
  }, [currentPriceId, plans]);

  const handleUpgrade = async (planSlug: string) => {
    setIsUpgrading(planSlug);
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("User data not found");

      const userData = JSON.parse(userStr);
      const clientId = userData?.id;

      if (!clientId) throw new Error("Client ID not found");

      const response = await axiosInstance.post("/billing/checkout-session", {
        client_id: clientId,
        return_url: window.location.origin + "/dashboard/settings",
        plan_slug: planSlug,
      });

      const data = response.data;
      if (data.url || data.checkout_url) {
        window.location.href = data.url || data.checkout_url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to start checkout. Please try again.";
      toast.error("Checkout Failed", {
        description: errorMessage,
      });
      setIsUpgrading(null);
    }
  };

  const currentPlans = plans[billingInterval];

  // Prevent hydration mismatch by showing loading state until mounted
  if (!mounted) {
    return (
      <Card className="border-slate-200 shadow-sm rounded-sm bg-white lg:col-span-2 py-0">
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex flex-row items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-green-100 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-green-600" />
            </div>
            <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
              Billing & Plan
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-0 px-4 sm:px-6 pb-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-sm rounded-sm bg-white lg:col-span-2 py-0">
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex flex-row items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-green-100 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-green-600" />
          </div>
          <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
            Billing & Plan
          </CardTitle>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-sm">
          <button
            onClick={() => setBillingInterval("monthly")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-sm transition-all",
              billingInterval === "monthly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval("yearly")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-sm transition-all",
              billingInterval === "yearly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Yearly
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0 px-4 sm:px-6 pb-6">
        {(subscribedPlanName || nextBillingDate) && (
          <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-sm text-sm border border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {subscribedPlanName && (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  Current Plan: <strong>{subscribedPlanName}</strong>
                  {/* {isTrialing && " (Trial Period)"} */}
                </span>
              </div>
            )}

            {nextBillingDate && (
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>
                  {isTrialing ? "Trial ends on" : "Next billing date"}:{" "}
                  <strong>
                    {new Date(nextBillingDate).toLocaleDateString()}
                  </strong>
                </span>
              </div>
            )}
          </div>
        )}

        {isLoadingPlans ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentPlans || []).map((plan: Plan) => {
              const isCurrentPlan = currentPriceId === plan.stripe_price_id;

              return (
                <div
                  key={plan.slug}
                  className={cn(
                    "border rounded-sm p-5 relative flex flex-col transition-all duration-200",
                    isCurrentPlan
                      ? "border-green-500 bg-green-50/10 ring-1 ring-green-500"
                      : "border-slate-200 bg-white hover:border-purple-200 hover:shadow-sm"
                  )}
                >
                  {plan.highlight && !isCurrentPlan && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-sm rounded-tr-sm">
                      Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold text-slate-900">
                        ${plan.price_cents / 100}
                      </span>
                      <span className="text-sm text-slate-500">
                        /{billingInterval === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {(plan.features || []).map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plan.slug)}
                    disabled={isUpgrading === plan.slug}
                    variant={isCurrentPlan ? "outline" : "default"}
                    className={cn(
                      "w-full rounded-sm h-10 font-medium",
                      isCurrentPlan
                        ? "border-green-500 text-green-700 hover:bg-green-100 bg-green-50"
                        : "bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50"
                    )}
                  >
                    {isUpgrading === plan.slug ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : isCurrentPlan ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Renew Plan
                      </span>
                    ) : (
                      "Upgrade"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
