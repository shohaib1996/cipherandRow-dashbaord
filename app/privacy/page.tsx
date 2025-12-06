"use client";

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

        <Card className="border-slate-200  duration-500 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-8 pt-0 pb-6">
          <CardHeader className="pb-6 sm:pb-8 border-b border-slate-100 bg-linear-to-br from-purple-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-linear-to-br from-purple-100 to-purple-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                  Privacy Policy
                  <span className="block text-base sm:text-lg md:text-xl mt-1 font-medium bg-clip-text text-transparent bg-linear-to-r from-slate-600 to-slate-500">
                    Cipher & Row v1.0
                  </span>
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
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
              Cipher & Row ("we", "us", "our") provides AI-powered support tools
              for businesses. This Privacy Policy explains how we collect, use,
              and protect information when you use our website, dashboard,
              widget, and support bot services ("Services").
            </p>
          </CardHeader>
          <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            {/* Section 1 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Information We Collect
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600">
                We collect the following information:
              </p>

              <div className="space-y-3 sm:space-y-4 pl-2 sm:pl-4">
                <div className="border-l-2 sm:border-l-3 border-purple-200 pl-3 sm:pl-4 py-2 hover:border-purple-400 transition-colors duration-300 rounded-r-lg hover:bg-purple-50/30">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-purple-600 font-bold text-base sm:text-lg">
                      A.
                    </span>{" "}
                    Account Information
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">
                    When you create an account, we collect:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 ml-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Company name</li>
                    <li>Website URL</li>
                  </ul>
                </div>

                <div className="border-l-2 sm:border-l-3 border-blue-200 pl-3 sm:pl-4 py-2 hover:border-blue-400 transition-colors duration-300 rounded-r-lg hover:bg-blue-50/30">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-base sm:text-lg">
                      B.
                    </span>{" "}
                    Support Bot Conversations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">
                    When your customers interact with your support bot, we
                    store:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 ml-2">
                    <li>User messages</li>
                    <li>Bot responses</li>
                    <li>Timestamps</li>
                    <li>Basic metadata (browser type, session ID)</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-2">
                    This allows us to:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 ml-2">
                    <li>Provide the service</li>
                    <li>Improve accuracy</li>
                    <li>Diagnose issues</li>
                    <li>Prevent abuse</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 italic bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-100">
                    We do not share conversation data with third parties.
                  </p>
                </div>

                <div className="border-l-2 sm:border-l-3 border-green-200 pl-3 sm:pl-4 py-2 hover:border-green-400 transition-colors duration-300 rounded-r-lg hover:bg-green-50/30">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-green-600 font-bold text-base sm:text-lg">
                      C.
                    </span>{" "}
                    Knowledge Base Content
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    You may add content to your knowledge base (KB). This data
                    is stored securely and only used to power your support bot.
                  </p>
                </div>

                <div className="border-l-2 sm:border-l-3 border-orange-200 pl-3 sm:pl-4 py-2 hover:border-orange-400 transition-colors duration-300 rounded-r-lg hover:bg-orange-50/30">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-orange-600 font-bold text-base sm:text-lg">
                      D.
                    </span>{" "}
                    Usage & Diagnostic Data
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">
                    We collect anonymized system and performance data:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 ml-2">
                    <li>API latency</li>
                    <li>Error types</li>
                    <li>Token usage</li>
                    <li>Worker performance</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    This helps keep the service fast and reliable.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 2 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  How We Use Information
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Provide and improve the Services</li>
                <li>Power the support bot for your website</li>
                <li>Diagnose technical issues</li>
                <li>Prevent abuse or misuse</li>
                <li>Communicate product updates</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-medium bg-blue-50 p-2.5 sm:p-3 rounded-lg mt-2 border border-blue-100">
                We do not sell data to third parties.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 3 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Data Retention
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  <span className="font-semibold">Support conversations:</span>{" "}
                  retained until you delete them or request deletion
                </li>
                <li>
                  <span className="font-semibold">KB entries:</span> retained
                  until you remove them
                </li>
                <li>
                  <span className="font-semibold">Account data:</span> retained
                  while your account is active
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600">
                You may request account deletion at any time.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 4 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Data Security
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                We use industry-standard security practices to protect your
                data, including:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Encrypted connections (HTTPS)</li>
                <li>Access controls</li>
                <li>Isolated databases using client-level row security</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600">
                No method of transmission is 100% secure, but we take
                appropriate precautions.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 5 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-cyan-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  International Use
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Cipher & Row currently operates in a U.S.-first capacity. We do
                not intentionally target or sign up users from the EU or other
                regions with additional regulatory requirements.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 6 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Third-Party Services
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                We may use third-party providers to operate the service (e.g.,
                hosting, payments). These providers only have access to the
                minimum data required to perform their functions.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 7 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Your Rights
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                You may request:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Access to your data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your account and associated data</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 flex items-center gap-2 flex-wrap">
                To submit a request, email:
                <a
                  href="mailto:support@cipherandrow.co"
                  className="text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 font-medium transition-colors duration-300"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  support@cipherandrow.co
                </a>
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 8 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Changes to This Policy
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                We may update this Privacy Policy over time. The "Last Updated"
                date will be revised accordingly.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            {/* Section 9 */}
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Contact
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 flex-wrap">
                If you have questions, contact us at:
                <a
                  href="mailto:support@cipherandrow.co"
                  className="text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 font-medium transition-colors duration-300"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  support@cipherandrow.co
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
