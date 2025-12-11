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
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

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
      const response = await axiosInstance.post("/auth/signin", formData, {
        skipAuth: true,
      });

      const data = response.data;
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
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password. Please try again.";
      setError(errorMessage);
    } finally {
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
            Sign in to access your dashboard and manage your AI-powered chat
            experiences.
          </p>
        </div>
      </div>

      {/* Signin Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-slate-50">
        <Card className="w-full max-w-md border-slate-200 shadow-xl">
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            <div className="flex justify-start mb-6 items-center gap-2">
              <Image
                src="/images/logo.jpg"
                alt="Cipher & Row Logo"
                width={50}
                height={50}
                className="rounded-lg shadow-md"
              />
              <span className="text-2xl font-bold">Cipher & Row</span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Sign In
              </h2>
              <p className="text-slate-600">
                Please enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              action="#"
              method="post"
            >
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
                  <button
                    type="button"
                    onClick={() =>
                      toast.info(
                        "Please email support@cipherandrow.com if you've forgotten your password"
                      )
                    }
                    className="text-xs text-[#8A06E6] hover:text-[#7505C7] hover:underline"
                  >
                    Forgot password?
                  </button>
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
