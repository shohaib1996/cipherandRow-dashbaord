"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Zap,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Calendar,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ApiKeyManager from "@/components/ApiKeyManager";
import {
  getUserSettings,
  saveUserSettings,
  getCurrentUserId,
} from "@/lib/userSettings";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();

  // State for user data
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Load user data from localStorage on mount
  React.useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        const currentUserId = userData?.id;
        setUserId(currentUserId);

        // Load settings (custom or default from user metadata)
        const settings = getUserSettings(currentUserId);
        setFullName(settings.fullName || "");
        setEmail(settings.email || "");
        setCompanyName(settings.companyName || "");
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  // Handle save profile settings
  const handleSaveProfileSettings = () => {
    if (!userId) {
      toast.error("Error", {
        description: "User ID not found. Please sign in again.",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Save settings to localStorage
      saveUserSettings(userId, {
        fullName: fullName.trim(),
        email: email.trim(),
        companyName: companyName.trim(),
      });

      toast.success("Settings Saved", {
        description: "Your profile settings have been saved successfully!",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Save Failed", {
        description: "Failed to save settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle security features
  const handleChangePassword = () => {
    toast.info("Coming Soon", {
      description: "Password change feature will be available in v1.1",
    });
  };

  const handleEnable2FA = () => {
    toast.info("Coming Soon", {
      description: "Two-Factor Authentication will be available in v1.1",
    });
  };

  // State for toggles
  const [autoResolve, setAutoResolve] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [newMsgAlerts, setNewMsgAlerts] = useState(true);
  const [escalationAlerts, setEscalationAlerts] = useState(true);
  const [emailToConv, setEmailToConv] = useState(false);

  // State for delete account flow
  const [showFirstWarning, setShowFirstWarning] = useState(false);
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

  const handleDeleteClick = () => {
    setShowFirstWarning(true);
  };

  const handleFirstWarningContinue = () => {
    setShowFirstWarning(false);
    setShowSecondConfirmation(true);
  };

  const handleSecondConfirmation = () => {
    setShowSecondConfirmation(false);
    setShowGoodbyeMessage(true);
  };

  const handleGoodbyeClose = () => {
    setShowGoodbyeMessage(false);

    // Clear all authentication data to simulate account deletion
    // Remove localStorage items
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    // Clear auth cookie
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";

    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/signin");
    }, 500);
  };

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("auth_token");
      console.log("Auth token:", authToken);

      if (!authToken) {
        throw new Error("Authentication required. Please sign in again.");
      }

      // Get user id from user data
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        throw new Error("User data not found. Please sign in again.");
      }

      const userData = JSON.parse(userStr);
      const clientId = userData?.id;

      if (!clientId) {
        throw new Error("User ID not found. Please sign in again.");
      }

      // Make request to create checkout session
      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/billing/checkout-session",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            client_id: clientId,
            return_url: window.location.origin + "/dashboard/settings",
            plan_slug: "pro",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.message ||
            "Failed to create checkout session"
        );
      }

      const data = await response.json();

      // Redirect to Stripe checkout URL
      if (data.url || data.checkout_url) {
        window.location.href = data.url || data.checkout_url;
      } else {
        throw new Error("No checkout URL returned from API");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast.error("Checkout Failed", {
        description:
          error.message || "Failed to start checkout. Please try again.",
      });
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Settings
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Manage your account and bot configuration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Profile Settings */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Email Address
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Company Name
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="pt-2">
                <Button
                  onClick={handleSaveProfileSettings}
                  disabled={isSaving}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-sm px-6 h-9 sm:h-10 font-medium text-sm disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bot Configuration */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white relative">
            {/* Coming Soon Banner */}
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-sm z-10 flex items-center justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-lg border-2 border-purple-500">
                <p className="text-lg font-bold text-slate-900">Coming Soon</p>
              </div>
            </div>
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Bot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Bot Name
                </label>
                <Input
                  defaultValue="Support Bot"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Response Tone
                </label>
                <Input
                  placeholder="e.g. Professional, Friendly"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Max Response Length
                </label>
                <Input
                  placeholder="e.g. 150 words"
                  className="bg-white border-slate-200 rounded-sm focus-visible:ring-purple-500 h-9 sm:h-10 text-sm"
                />
              </div>
              <div className="flex items-center justify-between pt-2 bg-[#E9DFFC33] px-3 py-2 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    Auto-resolve
                  </label>
                  <span className="text-xs text-slate-500">
                    After 24h inactivity
                  </span>
                </div>
                <Switch
                  checked={autoResolve}
                  onCheckedChange={setAutoResolve}
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white lg:col-span-2">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    Email notifications
                  </label>
                  <span className="text-xs text-slate-500">
                    Receive email alerts for new conversations
                  </span>
                </div>
                <Switch
                  checked={emailNotifs}
                  onCheckedChange={setEmailNotifs}
                  className="shrink-0"
                />
              </div>
              <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    Weekly reports
                  </label>
                  <span className="text-xs text-slate-500">
                    Receive weekly performance summaries
                  </span>
                </div>
                <Switch
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div
                onClick={handleChangePassword}
                className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-purple-700">
                  Change Password
                </span>
              </div>
              <div
                onClick={handleEnable2FA}
                className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-purple-700">
                  Enable Two-Factor Authentication
                </span>
              </div>
            </CardContent>
          </Card>

          {/* API Key Management */}
          <ApiKeyManager />

          {/* Billing & Plan */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white lg:col-span-2">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-green-100 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-green-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Billing & Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="p-3 sm:p-4 border border-slate-100 rounded-sm bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-slate-900">
                    Current Plan: Professional
                  </div>
                  <div className="text-xs text-slate-500 mt-1">$79/month</div>
                </div>
                <Button
                  onClick={handleUpgrade}
                  disabled={isUpgrading}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs h-8 rounded-sm shrink-0 disabled:opacity-50"
                >
                  {isUpgrading ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Upgrade"
                  )}
                </Button>
              </div>

              <div className="space-y-2 sm:space-y-3 pt-2">
                <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
                  <span className="text-xs sm:text-sm font-medium text-purple-700">
                    View Invoices
                  </span>
                </div>
                <div className="group flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-sm cursor-pointer transition-colors">
                  <span className="text-xs sm:text-sm font-medium text-purple-700">
                    Update Payment Method
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Integrations */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Email Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    New message alerts
                  </label>
                  <span className="text-xs text-slate-500">
                    Get notified instantly
                  </span>
                </div>
                <Switch
                  checked={newMsgAlerts}
                  onCheckedChange={setNewMsgAlerts}
                  className="shrink-0"
                />
              </div>
              <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    Escalation alerts
                  </label>
                  <span className="text-xs text-slate-500">
                    High-priority issues
                  </span>
                </div>
                <Switch
                  checked={escalationAlerts}
                  onCheckedChange={setEscalationAlerts}
                  className="shrink-0"
                />
              </div>
              <div className="flex items-center justify-between bg-[#E9DFFC33] p-3 rounded-sm gap-3">
                <div className="space-y-0.5 flex-1 min-w-0">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                    Email-to-conversation
                  </label>
                  <span className="text-xs text-slate-500">
                    Create chats from emails
                  </span>
                </div>
                <Switch
                  checked={emailToConv}
                  onCheckedChange={setEmailToConv}
                  className="shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Scheduling Integrations */}
          <Card className="border-slate-200 shadow-sm rounded-sm bg-white relative">
            {/* Coming Soon Banner */}
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-sm z-10 flex items-center justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-lg border-2 border-purple-500">
                <p className="text-lg font-bold text-slate-900">Coming Soon</p>
              </div>
            </div>
            <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
              <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
                Scheduling Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="p-3 sm:p-4 border border-slate-100 rounded-sm">
                <div className="mb-3">
                  <div className="text-xs sm:text-sm font-medium text-slate-900">
                    Calendly
                  </div>
                  <div className="text-xs text-slate-500">Not connected</div>
                </div>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 rounded-sm text-xs sm:text-sm">
                  Connect Calendly
                </Button>
              </div>

              <div className="p-3 sm:p-4 border border-slate-100 rounded-sm">
                <div className="mb-3">
                  <div className="text-xs sm:text-sm font-medium text-slate-900">
                    Google Calendar
                  </div>
                  <div className="text-xs text-slate-500">Not connected</div>
                </div>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 rounded-sm text-xs sm:text-sm">
                  Connect Google Calendar
                </Button>
              </div>

              <div className="px-1">
                <p className="text-[10px] text-slate-400">
                  Booking details will appear directly in conversations once
                  connected
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-200 rounded-sm bg-white overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-red-100 bg-red-50/30">
            <h3 className="text-sm sm:text-base font-semibold text-red-600">
              Danger Zone
            </h3>
          </div>
          <div className="p-4 sm:p-6 w-full">
            <Button
              onClick={handleDeleteClick}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-sm h-9 sm:h-10 px-6 text-sm"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* First Warning Dialog */}
      <AlertDialog open={showFirstWarning} onOpenChange={setShowFirstWarning}>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <AlertDialogTitle className="text-xl font-semibold text-slate-900">
                Delete Account & Cancel Subscription
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base text-slate-600 pt-2">
              <span className="font-semibold text-red-600 block mb-2">
                ⚠️ WARNING: This action cannot be undone!
              </span>
              Deleting your account will:
              <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                <li>Permanently delete all your data and conversations</li>
                <li>
                  <strong className="text-red-600">
                    Immediately cancel your subscription
                  </strong>
                </li>
                <li>Remove access to all bot features</li>
                <li>Delete all integrations and settings</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-sm">Cancel</AlertDialogCancel>
            <Button
              onClick={handleFirstWarningContinue}
              className="bg-red-500 hover:bg-red-600 text-white rounded-sm"
            >
              I Understand, Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Second Confirmation Dialog */}
      <AlertDialog
        open={showSecondConfirmation}
        onOpenChange={setShowSecondConfirmation}
      >
        <AlertDialogContent className="sm:max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-slate-900">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-slate-600 pt-2">
              This will permanently delete your account and cancel your
              subscription. You will lose access immediately and all your data
              will be erased.
              <p className="mt-3 text-sm font-medium text-slate-700">
                This action is final and cannot be reversed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-sm">
              No, Keep My Account
            </AlertDialogCancel>
            <Button
              onClick={handleSecondConfirmation}
              className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
            >
              Yes, Delete Everything
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Goodbye Message Dialog */}
      <AlertDialog
        open={showGoodbyeMessage}
        onOpenChange={setShowGoodbyeMessage}
      >
        <AlertDialogContent className="sm:max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-slate-900 text-center">
              Sorry to see you leave
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-slate-600 pt-4 text-center">
              Your account has been successfully deleted and your subscription
              has been canceled.
              <p className="mt-4 text-sm text-slate-500">
                Thank you for using our service. We hope to see you again in the
                future.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 sm:justify-center">
            <Button
              onClick={handleGoodbyeClose}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-sm w-full sm:w-auto"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// onClick={async () => {
//   try {
//     const res = await fetch("/api/stripe/checkout", {
//       method: "POST",
//     });
//     const data = await res.json();
//     if (data.url) {
//       window.location.href = data.url;
//     } else {
//       console.error("No URL returned from checkout API");
//     }
//   } catch (error) {
//     console.error("Error starting checkout:", error);
//   }
// }}
