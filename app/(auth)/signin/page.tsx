"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import login from "../../../public/Login.json";
import Lottie from "lottie-react";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/auth/signin",
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
          errorData.error || errorData.message || "Sign in failed";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // console.log("Sign in successful:", data);

      // Store token if provided (supports both 'token' and 'access_token')
      const authToken = data.token || data.access_token;

      if (authToken) {
        // Store token in localStorage
        localStorage.setItem("auth_token", authToken);

        // Store user info if available
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Also set as cookie for proxy
        document.cookie = `auth_token=${authToken}; path=/; max-age=2592000; SameSite=Lax`;

        // Show success toast
        toast.success("Successfully logged in! Redirecting to dashboard...");

        // Use router.push with a small delay to ensure cookie is set
        setTimeout(() => {
          router.push("/dashboard/overview");
        }, 500);
      } else {
        throw new Error("No authentication token received");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Lottie Animation Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#8A06E6] via-[#7A05D0] to-[#6A04B8] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          {/* Placeholder for Lottie Animation */}
          <div className="w-full max-w-md aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center mb-8">
            {/* <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full animate-pulse" />
              <p className="text-lg font-medium opacity-80">Lottie Animation</p>
              <p className="text-sm opacity-60">Placeholder</p>
            </div> */}
            <Lottie animationData={login} loop={true} />;
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back!</h1>
          <p className="text-lg opacity-90 text-center max-w-md">
            Sign in to access your dashboard and manage your AI-powered chat
            experiences.
          </p>
        </div>
      </div>

      {/* Right Side - Signin Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-slate-50">
        <Card className="w-full max-w-md border-slate-200 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Sign In
              </h2>
              <p className="text-slate-600">
                Welcome back! Please enter your credentials
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#8A06E6] hover:bg-[#7505C7] text-white font-medium text-base mt-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
