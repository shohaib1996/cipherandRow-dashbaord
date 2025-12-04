"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  UserCheck,
  ShieldAlert,
  FileCode,
  Bot,
  CreditCard,
  Server,
  Ban,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
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

        {/* Terms of Service Section */}
        <Card className="border-slate-200 shadow-lg bg-white overflow-hidden">
          <CardHeader className="pb-8 border-b border-slate-100 bg-linear-to-br from-blue-50 via-white to-purple-50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-blue-100 to-blue-200 rounded-lg shadow-sm">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-2 flex-1">
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Terms of Service (Cipher & Row — v1.0)
                </CardTitle>
                <p className="text-slate-500 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
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
              These Terms govern your use of the Cipher & Row dashboard, widget,
              and support bot services ("Services"). By using the Services, you
              agree to these Terms.
            </p>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Your Account
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>You must create an account to access the Services.</li>
                <li>
                  You are responsible for keeping your account secure and for
                  any activity that occurs under it.
                </li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Acceptable Use
                </h2>
              </div>
              <p className="text-slate-600 mb-2">You agree not to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Use the Services for illegal or harmful purposes</li>
                <li>Send spam, threats, or abusive content through the bot</li>
                <li>
                  Attempt to reverse engineer, misuse, or overload the system
                </li>
                <li>
                  Store sensitive personal information (e.g., medical,
                  financial, legal) in the chatbot
                </li>
              </ul>
              <p className="text-slate-600 mt-2 bg-red-50 p-3 rounded-lg">
                We may suspend accounts that violate this policy.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                  <FileCode className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Customer Content
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>
                  Anything you input into the Services—including Knowledge Base
                  entries, messages, and configurations—remains your content.
                </li>
                <li>
                  You grant us a limited license to process this content solely
                  for the purpose of operating the Services.
                </li>
                <li>We do not own your data.</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  AI-Generated Output
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                Our support bots may generate automated responses. You
                understand that:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Responses may contain errors</li>
                <li>
                  You are responsible for reviewing and validating important or
                  high-risk information
                </li>
                <li>
                  The system is not a replacement for professional advice
                  (legal, medical, financial)
                </li>
              </ul>
              <p className="text-slate-600 mt-2 bg-purple-50 p-3 rounded-lg">
                We do not guarantee accuracy of AI-generated responses.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-emerald-100 rounded-lg shadow-sm">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Payments & Billing
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Paid plans are billed through Stripe.</li>
                <li>Subscriptions renew automatically unless cancelled.</li>
                <li>
                  You may cancel at any time; cancellations take effect at the
                  end of the billing period.
                </li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                  <Server className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Service Availability
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                We strive for high uptime, but the Services may experience:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Maintenance windows</li>
                <li>Network outages</li>
                <li>API slowdowns</li>
                <li>Third-party provider disruptions</li>
              </ul>
              <p className="text-slate-600 mt-2">
                We are not liable for downtime or temporary interruptions.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                  <Ban className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Termination
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                We may suspend or terminate access if:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>You violate these Terms</li>
                <li>You misuse or abuse the system</li>
                <li>You fail to pay for Services</li>
              </ul>
              <p className="text-slate-600 mt-2">
                You may cancel your account at any time.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-yellow-100 rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>
                  Cipher & Row is not liable for indirect, incidental, or
                  consequential damages.
                </li>
                <li>
                  Our total liability will not exceed the amount you paid us in
                  the last 6 months.
                </li>
              </ul>
              <p className="text-slate-600 mt-2">
                This standard clause protects early-stage startups.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Changes to Terms
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>We may modify these Terms from time to time.</li>
                <li>
                  Continued use of the Services constitutes acceptance of
                  updated Terms.
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
