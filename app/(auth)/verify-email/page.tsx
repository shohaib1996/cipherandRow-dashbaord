"use client";

import Link from "next/link";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Lottie from "lottie-react";
import login from "../../../public/Login.json";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lottie Animation Section - Visible on all screens */}
      <div className="w-full lg:w-1/2 bg-linear-to-br from-[#8A06E6] via-[#7A05D0] to-[#6A04B8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-6 sm:p-8 lg:p-12 text-white min-h-[40vh] lg:min-h-screen">
          {/* Lottie Animation */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
            <Lottie animationData={login} loop={true} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-center">
            Almost There!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 text-center max-w-md px-4">
            We've sent you a verification email. Please check your inbox to
            complete your registration.
          </p>
        </div>
      </div>

      {/* Verification Message */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-slate-50">
        <Card className="w-full max-w-md border-slate-200 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#8A06E6] rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Check Your Email
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We've sent a verification link to your email address. Please
                click the link in the email to verify your account and complete
                your registration.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">
                    Didn't receive the email?
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Check your spam or junk folder</li>
                    <li>Make sure you entered the correct email</li>
                    <li>Wait a few minutes and check again</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link href="/signin" className="block">
                <Button className="w-full h-11 bg-[#8A06E6] hover:bg-[#7505C7] text-white font-medium text-base">
                  Go to Sign In
                </Button>
              </Link>

              <Link href="/signup" className="block">
                <Button
                  variant="outline"
                  className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-base"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign Up
                </Button>
              </Link>
            </div>

            {/* Support Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Need help?{" "}
                <a
                  href="mailto:support@cipherandrow.com"
                  className="font-medium text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
