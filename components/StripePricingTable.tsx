"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2 } from "lucide-react";

export default function StripePricingTable() {
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get user ID from localStorage
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUserId(userData?.id || null);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, []);

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
    <>
      <Script
        src="https://js.stripe.com/v3/pricing-table.js"
        strategy="afterInteractive"
      />

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

        <CardContent className="pt-6 px-4 sm:px-6 pb-6">
          {userId ? (
            <>
              {/* @ts-ignore - Stripe custom element */}
              <stripe-pricing-table
                pricing-table-id="prctbl_1SbRhSQMyXv74YgqMhepf2Hs"
                publishable-key="pk_test_51SXVmfQMyXv74YgqVMz0JksCPuNF6oxRo9oPG2SJaZcPFrRHGtO3AYxHg2GXwzijiraTJqUlIB6EEIeBRfQ85HAe00qHFm9btl"
                client-reference-id={userId}
              />
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-500">
                Please log in to view pricing plans.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
