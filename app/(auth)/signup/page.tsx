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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      console.log("Signup successful:", data);

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
        toast.success("You have successfully signed up! Check email to confirm.");

        // Set success state to show success message
        setSuccess(true);

        // Use router.push with a small delay to ensure cookie is set
        setTimeout(() => {
          router.push("/dashboard/overview");
        }, 2000);
      } else {
        // If no token, just show success message
        toast.success("You have successfully signed up! Check email to confirm.");
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
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
            <Lottie animationData={login} loop={true} />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome to Cipher & Row
          </h1>
          <p className="text-lg opacity-90 text-center max-w-md">
            Create your account and start building amazing AI-powered chat
            experiences for your customers.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-green-800 mb-1">
                      Account Created Successfully!
                    </h3>
                    <p className="text-sm text-green-700">
                      Please check your email to confirm your account before
                      signing in.
                    </p>
                  </div>
                </div>
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
