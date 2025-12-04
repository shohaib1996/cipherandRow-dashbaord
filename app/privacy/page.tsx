"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Database,
  Lock,
  Globe,
  Users,
  FileText,
  Clock,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
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

        <Card className="border-slate-200 shadow-lg bg-white overflow-hidden">
          <CardHeader className="pb-8 border-b border-slate-100 bg-linear-to-br from-purple-50 via-white to-blue-50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-purple-100 to-purple-200 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="space-y-2 flex-1">
                <CardTitle className="text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Privacy Policy (Cipher & Row — v1.0)
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
              Cipher & Row ("we", "us", "our") provides AI-powered support tools
              for businesses. This Privacy Policy explains how we collect, use,
              and protect information when you use our website, dashboard,
              widget, and support bot services ("Services").
            </p>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Information We Collect
                </h2>
              </div>
              <p className="text-slate-600">
                We collect the following information:
              </p>

              <div className="space-y-4 pl-4">
                <div className="border-l-2 border-purple-200 pl-4 py-2">
                  <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-purple-600">A.</span> Account
                    Information
                  </h3>
                  <p className="text-slate-600 mb-2">
                    When you create an account, we collect:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Company name</li>
                    <li>Website URL</li>
                  </ul>
                </div>

                <div className="border-l-2 border-blue-200 pl-4 py-2">
                  <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-600">B.</span> Support Bot
                    Conversations
                  </h3>
                  <p className="text-slate-600 mb-2">
                    When your customers interact with your support bot, we
                    store:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                    <li>User messages</li>
                    <li>Bot responses</li>
                    <li>Timestamps</li>
                    <li>Basic metadata (browser type, session ID)</li>
                  </ul>
                  <p className="text-slate-600 mt-2 mb-2">This allows us to:</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                    <li>Provide the service</li>
                    <li>Improve accuracy</li>
                    <li>Diagnose issues</li>
                    <li>Prevent abuse</li>
                  </ul>
                  <p className="text-slate-600 mt-2 italic bg-blue-50 p-2 rounded">
                    We do not share conversation data with third parties.
                  </p>
                </div>

                <div className="border-l-2 border-green-200 pl-4 py-2">
                  <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-green-600">C.</span> Knowledge Base
                    Content
                  </h3>
                  <p className="text-slate-600">
                    You may add content to your knowledge base (KB). This data
                    is stored securely and only used to power your support bot.
                  </p>
                </div>

                <div className="border-l-2 border-orange-200 pl-4 py-2">
                  <h3 className="font-medium text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-orange-600">D.</span> Usage &
                    Diagnostic Data
                  </h3>
                  <p className="text-slate-600 mb-2">
                    We collect anonymized system and performance data:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                    <li>API latency</li>
                    <li>Error types</li>
                    <li>Token usage</li>
                    <li>Worker performance</li>
                  </ul>
                  <p className="text-slate-600 mt-2">
                    This helps keep the service fast and reliable.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  How We Use Information
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Provide and improve the Services</li>
                <li>Power the support bot for your website</li>
                <li>Diagnose technical issues</li>
                <li>Prevent abuse or misuse</li>
                <li>Communicate product updates</li>
              </ul>
              <p className="text-slate-600 font-medium bg-blue-50 p-3 rounded-lg mt-2">
                We do not sell data to third parties.
              </p>
            </section>

            <Separator />

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Data Retention
                </h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>
                  <span className="font-medium">Support conversations:</span>{" "}
                  retained until you delete them or request deletion
                </li>
                <li>
                  <span className="font-medium">KB entries:</span> retained
                  until you remove them
                </li>
                <li>
                  <span className="font-medium">Account data:</span> retained
                  while your account is active
                </li>
              </ul>
              <p className="text-slate-600">
                You may request account deletion at any time.
              </p>
            </section>

            <Separator />

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Data Security
                </h2>
              </div>
              <p className="text-slate-600 mb-2">
                We use industry-standard security practices to protect your
                data, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Encrypted connections (HTTPS)</li>
                <li>Access controls</li>
                <li>Isolated databases using client-level row security</li>
              </ul>
              <p className="text-slate-600">
                No method of transmission is 100% secure, but we take
                appropriate precautions.
              </p>
            </section>

            <Separator />

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-cyan-100 rounded-lg shadow-sm">
                  <Globe className="w-5 h-5 text-cyan-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  International Use
                </h2>
              </div>
              <p className="text-slate-600">
                Cipher & Row currently operates in a U.S.-first capacity. We do
                not intentionally target or sign up users from the EU or other
                regions with additional regulatory requirements.
              </p>
            </section>

            <Separator />

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Third-Party Services
                </h2>
              </div>
              <p className="text-slate-600">
                We may use third-party providers to operate the service (e.g.,
                hosting, payments). These providers only have access to the
                minimum data required to perform their functions.
              </p>
            </section>

            <Separator />

            {/* Section 7 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Your Rights
                </h2>
              </div>
              <p className="text-slate-600 mb-2">You may request:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                <li>Access to your data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your account and associated data</li>
              </ul>
              <p className="text-slate-600 mt-2 flex items-center gap-2 flex-wrap">
                To submit a request, email:
                <a
                  href="mailto:support@cipherandrow.com"
                  className="text-purple-600 hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  support@cipherandrow.com
                </a>
              </p>
            </section>

            <Separator />

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                  <RefreshCw className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Changes to This Policy
                </h2>
              </div>
              <p className="text-slate-600">
                We may update this Privacy Policy over time. The "Last Updated"
                date will be revised accordingly.
              </p>
            </section>

            <Separator />

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Contact
                </h2>
              </div>
              <p className="text-slate-600 flex items-center gap-2 flex-wrap">
                If you have questions, contact us at:
                <a
                  href="mailto:support@cipherandrow.com"
                  className="text-purple-600 hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  support@cipherandrow.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
