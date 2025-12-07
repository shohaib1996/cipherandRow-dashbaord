"use client";

import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  Gift,
  Calendar,
  CalendarCheck,
  Ban,
  TrendingDown,
  Mail,
  CreditCard,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Navigation */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 pl-0 hover:bg-transparent hover:text-purple-600 transition-all duration-300 text-sm sm:text-base group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden xs:inline">Return to Dashboard</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Link>
        </div>

        {/* Refund Policy Section */}
        <Card className="border-slate-200  duration-500 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-8 pt-0 pb-6">
          <CardHeader className="pb-6 sm:pb-8 border-b border-slate-100 bg-linear-to-br from-green-50 via-white to-emerald-50 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-linear-to-br from-green-100 to-green-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                  Refund Policy
                  <span className="block text-base sm:text-lg md:text-xl mt-1 font-medium bg-clip-text text-transparent bg-linear-to-r from-slate-600 to-slate-500">
                    Cipher & Row v1.0
                  </span>
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Last Updated: </span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              Cipher & Row provides AI-powered support automation tools for
              businesses. This Refund Policy explains how refunds work for
              subscription payments.
            </p>
          </CardHeader>
          <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Free Trial
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  All paid plans begin with a free trial (typically 7 days).
                </li>
                <li>You will not be charged until the trial ends.</li>
                <li>
                  You may cancel at any time during the trial to avoid being
                  billed.
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Monthly Subscriptions
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                Monthly subscriptions are non-refundable once the billing period
                begins. However, we may issue a refund in the following cases:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>You were charged after cancelling before renewal</li>
                <li>There was a duplicate charge</li>
                <li>
                  You experienced a technical issue that prevented normal use of
                  the service
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 bg-green-50 p-2.5 sm:p-3 rounded-lg border border-green-100">
                Refunds outside these cases are granted at our discretion.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Annual Subscriptions
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                Annual subscription payments are also non-refundable except for:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Duplicate charges</li>
                <li>Clearly verifiable billing errors</li>
                <li>
                  Inability to access the service due to technical issues on our
                  side
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 bg-purple-50 p-2.5 sm:p-3 rounded-lg border border-purple-100">
                Partial refunds are generally not available for unused months.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Ban className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Cancellation
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  You may cancel your subscription at any time from your
                  dashboard.
                </li>
                <li>
                  Cancellation stops future renewals but does not automatically
                  trigger a refund.
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Downgrades
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  If you downgrade your plan, the change takes effect at the
                  next billing cycle.
                </li>
                <li>No partial refund is issued for the current period.</li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  How to Request a Refund
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-2 flex items-center gap-2 flex-wrap">
                Email us at
                <a
                  href="mailto:support@cipherandrow.com"
                  className="text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 font-medium transition-colors duration-300"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  support@cipherandrow.com
                </a>
                with:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Your account email</li>
                <li>Charge date and amount</li>
                <li>Reason for your request</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 bg-blue-50 p-2.5 sm:p-3 rounded-lg border border-blue-100">
                We typically respond within 2–3 business days.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Stripe as the Billing Provider
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  All payments and refunds are processed securely through
                  Stripe.
                </li>
                <li>Refund timing is subject to Stripe's processing times.</li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Abuse or Misuse
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                We reserve the right to refuse refunds in cases of:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Abuse of the refund policy</li>
                <li>Misuse of the platform</li>
                <li>Fraudulent or suspicious activity</li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Policy Changes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                We may update this Refund Policy at any time. The "Last Updated"
                date will reflect the most recent version.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
