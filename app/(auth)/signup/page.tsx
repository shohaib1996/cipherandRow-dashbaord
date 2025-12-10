"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import login from "../../../public/Login.json";
import Lottie from "lottie-react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate full name - check if it's empty or contains only whitespace
    if (!formData.full_name.trim()) {
      setError("Please enter a valid full name");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError(
        "You must agree to the Terms and Conditions to create an account"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/auth/signup",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Extract error message from API response (could be in 'error' or 'message' field)
        const errorMessage =
          errorData.error || errorData.message || "Signup failed";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // console.log("Signup successful:", data);

      // // Store authentication token
      // const authToken = data.token || data.access_token;
      // if (authToken) {
      //   localStorage.setItem("auth_token", authToken);
      //   document.cookie = `auth_token=${authToken}; path=/; max-age=2592000; SameSite=Lax`;
      // }

      // // Store user data
      // if (data.user) {
      //   localStorage.setItem("user", JSON.stringify(data.user));
      // }

      // // Store additional data if provided by backend
      // if (data.client_id) {
      //   localStorage.setItem("client_id", data.client_id);
      // }
      // if (data.bot_id) {
      //   localStorage.setItem("bot_id", data.bot_id);
      // }
      // if (data.publishable_key) {
      //   localStorage.setItem("publishable_key", data.publishable_key);
      // }

      // Show success toast
      if (data.id) {
        toast.success("Account created! successfully...");
        router.push("/verify-email");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

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
            Welcome to Cipher & Row
          </h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 text-center max-w-md px-4">
            Create your account and start building amazing AI-powered chat
            experiences for your customers.
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-slate-50">
        <Card className="w-full max-w-md border-slate-200 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Create Account
              </h2>
              <p className="text-slate-600">
                Sign up to get started with your dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="full_name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="pl-10 h-11 border-slate-300 focus:border-[#8A06E6] focus:ring-[#8A06E6]"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 h-11 border-slate-300 focus:border-[#8A06E6] focus:ring-[#8A06E6]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 pr-10 h-11 border-slate-300 focus:border-[#8A06E6] focus:ring-[#8A06E6]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#8A06E6] focus:ring-[#8A06E6]"
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I have read and agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#8A06E6] hover:bg-[#7505C7] text-white font-medium text-base mt-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
