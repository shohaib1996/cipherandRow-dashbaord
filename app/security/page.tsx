"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Shield,
  Server,
  Key,
  Database,
  Eye,
  AlertTriangle,
  Mail,
  FileText,
  CloudCog,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SecurityPage() {
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

        {/* Security & Data Protection Section */}
        <Card className="border-slate-200 duration-500 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-8 pt-0 pb-6">
          <CardHeader className="pb-6 sm:pb-8 border-b border-slate-100 bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="space-y-2 flex-1 w-full">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                  Security & Data Protection
                  <span className="block text-base sm:text-lg md:text-xl mt-1 font-medium bg-clip-text text-transparent bg-linear-to-r from-slate-600 to-slate-500">
                    Cipher & Row v1.0
                  </span>
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Last Updated: </span>
                  <span className="font-medium">Dec 2025</span>
                </p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              We take the security of your data seriously. Cipher & Row is built
              using modern cloud infrastructure and follows common best practices
              for SaaS security.
            </p>
          </CardHeader>
          <CardContent className="pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Server className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Infrastructure & Access
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  Our application is hosted on reputable cloud providers with
                  strong physical and network security.
                </li>
                <li>
                  Access to production systems is limited to a small number of
                  authorized team members and is logged and audited where
                  possible.
                </li>
                <li>
                  Customer data is logically separated so one customer cannot
                  access another customer's information.
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Encryption
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  All traffic between your browser, the support widget, and our
                  servers is encrypted in transit using HTTPS/TLS.
                </li>
                <li>
                  Data at rest is stored on encrypted disks managed by our cloud
                  providers.
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Data We Store
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                We store only the data needed to provide the service, such as:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Account details (name, email, company, website)</li>
                <li>Knowledge base content you add</li>
                <li>
                  Support conversations between your visitors and the bot
                </li>
                <li>Basic usage and performance metrics</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 bg-blue-50 p-2.5 sm:p-3 rounded-lg border border-blue-100">
                Payment card information is handled directly by our payment
                provider and never touches our servers.
              </p>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Monitoring & Incident Response
                </h2>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>
                  We monitor the system for errors and unusual behavior to detect
                  issues early.
                </li>
                <li>
                  If we become aware of a security incident that affects your
                  data, we will investigate, mitigate, and notify affected
                  customers as appropriate.
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Your Responsibilities
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-2">
                You're responsible for:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1.5 ml-2">
                <li>Protecting your login credentials</li>
                <li>Limiting dashboard access to trusted team members</li>
                <li>
                  Letting us know promptly if you suspect unauthorized access
                </li>
              </ul>
            </section>

            <Separator className="my-6 sm:my-8" />

            <section className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3 pb-2">
                <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Contact
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-2 flex flex-wrap items-center gap-2">
                If you have a security question or need to report an issue,
                email:
              </p>
              <a
                href="mailto:security@cipherandrow.co"
                className="text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1.5 sm:gap-2 font-medium transition-colors duration-300 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                security@cipherandrow.co
              </a>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
