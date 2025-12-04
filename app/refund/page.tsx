"use client";

import React from "react";
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
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation */}
        <div>
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 pl-0 hover:bg-transparent hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        {/* Refund Policy Section */}
        <Card className="border-slate-200 shadow-lg bg-white overflow-hidden">
          <CardHeader className="pb-8 border-b border-slate-100 bg-linear-to-br from-green-50 via-white to-emerald-50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-green-100 to-green-200 rounded-lg shadow-sm">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2 flex-1">
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Refund Policy (Cipher & Row — v1.0)
                </CardTitle>
                <p className="text-slate-500 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Last Updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Cipher & Row provides AI-powered support automation tools for
              businesses. This Refund Policy explains how refunds work for
              subscription payments.
            </p>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Free Trial
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
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

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Monthly Subscriptions
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                Monthly subscriptions are non-refundable once the billing period
                begins. However, we may issue a refund in the following cases:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>You were charged after cancelling before renewal</li>
                <li>There was a duplicate charge</li>
                <li>
                  You experienced a technical issue that prevented normal use of
                  the service
                </li>
              </ul>
              <p className="text-slate-600 mt-2 bg-green-50 p-3 rounded-lg">
                Refunds outside these cases are granted at our discretion.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <CalendarCheck className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Annual Subscriptions
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                Annual subscription payments are also non-refundable except for:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Duplicate charges</li>
                <li>Clearly verifiable billing errors</li>
                <li>
                  Inability to access the service due to technical issues on our
                  side
                </li>
              </ul>
              <p className="text-slate-600 mt-2 bg-purple-50 p-3 rounded-lg">
                Partial refunds are generally not available for unused months.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                  <Ban className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Cancellation
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
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

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Downgrades
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>
                  If you downgrade your plan, the change takes effect at the
                  next billing cycle.
                </li>
                <li>No partial refund is issued for the current period.</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  How to Request a Refund
                </h2>
              </div>
              <p className="text-slate-600 mb-2 flex items-center gap-2 flex-wrap">
                Email us at
                <a
                  href="mailto:support@cipherandrow.com"
                  className="text-purple-600 hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  support@cipherandrow.com
                </a>
                with:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Your account email</li>
                <li>Charge date and amount</li>
                <li>Reason for your request</li>
              </ul>
              <p className="text-slate-600 mt-2 bg-blue-50 p-3 rounded-lg">
                We typically respond within 2–3 business days.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Stripe as the Billing Provider
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>
                  All payments and refunds are processed securely through
                  Stripe.
                </li>
                <li>Refund timing is subject to Stripe's processing times.</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Abuse or Misuse
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                We reserve the right to refuse refunds in cases of:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Abuse of the refund policy</li>
                <li>Misuse of the platform</li>
                <li>Fraudulent or suspicious activity</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Policy Changes
                </h2>
              </div>
              <p className="text-slate-600">
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
