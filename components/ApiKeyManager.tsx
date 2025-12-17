"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, Eye, EyeOff, RefreshCw, Plus, X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { userApi } from "@/lib/userApi";

interface UserData {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    better_user?: string;
  };
}

export default function ApiKeyManager() {
  const [apiKey, setApiKey] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [domains, setDomains] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get user ID from localStorage
    const userStr = localStorage.getItem("user");
    let currentUserId: string | null = null;

    if (userStr) {
      try {
        const userData: UserData = JSON.parse(userStr);
        currentUserId = userData.id;
        setUserId(currentUserId);
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    if (!currentUserId) {
      // No user ID available, use fallback
      const currentDomain = window.location.hostname;
      setDomains([currentDomain]);
      return;
    }

    // Load stored API key for this user
    const storedKey = localStorage.getItem(`api_key_${currentUserId}`);
    if (storedKey) {
      setApiKey(storedKey);
    }

    // Load stored domains for this user
    const storedDomains = localStorage.getItem(
      `api_key_domains_${currentUserId}`
    );
    if (storedDomains) {
      try {
        const parsedDomains = JSON.parse(storedDomains);
        if (Array.isArray(parsedDomains) && parsedDomains.length > 0) {
          setDomains(parsedDomains);
          return;
        }
      } catch (e) {
        console.error("Failed to parse stored domains:", e);
      }
    }

    // Get current domain without protocol as fallback
    const currentDomain = window.location.hostname;
    setDomains([currentDomain]);
  }, []);

  const addDomain = () => {
    setDomains([...domains, ""]);
  };

  const removeDomain = (index: number) => {
    if (domains.length > 1) {
      setDomains(domains.filter((_, i) => i !== index));
    }
  };

  const updateDomain = (index: number, value: string) => {
    // Remove protocol if user accidentally includes it
    let cleanValue = value.trim();
    cleanValue = cleanValue.replace(/^https?:\/\//, "");
    cleanValue = cleanValue.replace(/^www\./, "");

    const newDomains = [...domains];
    newDomains[index] = cleanValue;
    setDomains(newDomains);
  };

  const generateApiKey = async () => {
    // Validate domains
    const validDomains = domains.filter((d) => d.trim() !== "");
    if (validDomains.length === 0) {
      toast.error("Domain Required", {
        description: "Please enter at least one domain.",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Check trial status and subscription before generating API key
      const userStatus = await userApi.getCompleteUserStatus();

      // If trial is expired and user doesn't have an active subscription
      if (
        userStatus.trialStatus.isExpired &&
        !userStatus.subscriptionStatus.isSubscribed
      ) {
        toast.error("Trial Period Ended", {
          description:
            "Your trial period has ended. Please purchase a package to generate an API key.",
        });
        setIsGenerating(false);
        return;
      }

      // Get client_id from localStorage
      const userStr = localStorage.getItem("user");

      if (!userStr) {
        toast.error("User Data Missing", {
          description: "User data not found. Please sign in again.",
        });
        setIsGenerating(false);
        return;
      }

      const userData: UserData = JSON.parse(userStr);
      const clientId = userData.id;

      if (!clientId) {
        toast.error("Client ID Missing", {
          description: "Could not retrieve client ID from user data.",
        });
        setIsGenerating(false);
        return;
      }

      // Make API request to generate key (auth token automatically attached)
      const response = await axiosInstance.post("/keys/generate", {
        client_id: clientId,
        allowed_domains: validDomains,
      });

      const data = response.data;
      const newApiKey = data.apiKey || data.api_key || data.key;

      if (!newApiKey) {
        throw new Error("No API key returned from server");
      }

      // Store the API key and domains with user-specific keys
      setApiKey(newApiKey);
      if (clientId) {
        localStorage.setItem(`api_key_${clientId}`, newApiKey);
        localStorage.setItem(
          `api_key_domains_${clientId}`,
          JSON.stringify(validDomains)
        );
      }

      toast.success("API Key Generated", {
        description: "Your API key has been generated successfully!",
      });
    } catch (error: any) {
      console.error("Error generating API key:", error);

      // Get error message from axios response
      const backendError =
        error.response?.data?.error || error.response?.data?.message;
      const statusCode = error.response?.status;

      // Handle specific error cases
      if (statusCode === 401) {
        toast.error("Authentication Failed", {
          description:
            backendError || "Your session has expired. Please sign in again.",
        });
      } else if (statusCode === 403) {
        toast.error("Access Denied", {
          description:
            backendError ||
            "You need to complete payment before generating an API key.",
        });
      } else if (backendError === "No plan selected.") {
        toast.error("No Plan Selected", {
          description:
            "Please upgrade your plan first before generating an API key.",
        });
      } else {
        // Generic error with backend message
        toast.error("Failed to Generate API Key", {
          description:
            backendError ||
            error.message ||
            "An error occurred. Please try again.",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("Copied!", {
        description: "API key copied to clipboard",
      });
    }
  };

  const regenerateKey = async () => {
    // Validate domains before regenerating
    const validDomains = domains.filter((d) => d.trim() !== "");
    if (validDomains.length === 0) {
      toast.error("Domain Required", {
        description: "Please enter at least one domain before regenerating.",
      });
      return;
    }

    // Confirm before regenerating
    const confirmed = window.confirm(
      "Are you sure you want to regenerate your API key? The old key will stop working immediately."
    );

    if (confirmed) {
      // Clear existing key first
      setApiKey("");
      if (userId) {
        localStorage.removeItem(`api_key_${userId}`);
        localStorage.removeItem(`api_key_domains_${userId}`);
      }
      // Generate new key
      await generateApiKey();
    }
  };

  const maskedKey = apiKey
    ? `${apiKey.slice(0, 8)}${"*".repeat(20)}${apiKey.slice(-4)}`
    : "";

  return (
    <Card className="border-slate-200 shadow-sm rounded-sm bg-white">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 sm:pb-4 border-b border-slate-100 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="w-8 h-8 rounded-sm bg-purple-100 flex items-center justify-center shrink-0">
          <Key className="w-4 h-4 text-purple-600" />
        </div>
        <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
          API Key Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 px-4 sm:px-6 pb-4 sm:pb-6">
        {apiKey ? (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                Your API Key
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type={showKey ? "text" : "password"}
                  value={showKey ? apiKey : maskedKey}
                  readOnly
                  className="bg-slate-50 border-slate-200 rounded-sm font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowKey(!showKey)}
                  className="shrink-0 rounded-sm border-slate-200"
                >
                  {showKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="shrink-0 rounded-sm border-slate-200"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-700">
                Allowed Domains (without https://)
              </label>

              {domains.map((domain, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={domain}
                    onChange={(e) => updateDomain(index, e.target.value)}
                    placeholder="example.com"
                    className="bg-white border-slate-200 rounded-sm font-mono text-sm"
                  />
                  {domains.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeDomain(index)}
                      className="shrink-0 rounded-sm border-slate-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addDomain}
                className="w-full border-dashed border-slate-300 hover:border-slate-400 rounded-sm text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Domain
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={regenerateKey}
                disabled={isGenerating}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-sm px-6 h-9 sm:h-10 font-medium text-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isGenerating ? "Regenerating..." : "Regenerate Key"}
              </Button>
            </div>

            <div className="p-3 border border-slate-100 rounded-sm bg-slate-50">
              <p className="text-xs text-slate-600">
                <strong>Note:</strong> Keep your API key secure. Don't share it
                publicly or commit it to version control. Use it in the{" "}
                <code className="bg-slate-200 px-1 py-0.5 rounded">
                  x-api-key
                </code>{" "}
                header for API requests.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 sm:p-4 border border-slate-100 rounded-sm bg-slate-50">
              <p className="text-sm text-slate-600">
                Generate an API key to use the chatbot API. This key will be
                used to authenticate your requests.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-slate-700">
                Allowed Domains (without https://)
              </label>

              {domains.map((domain, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={domain}
                    onChange={(e) => updateDomain(index, e.target.value)}
                    placeholder="example.com"
                    className="bg-white border-slate-200 rounded-sm font-mono text-sm"
                  />
                  {domains.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeDomain(index)}
                      className="shrink-0 rounded-sm border-slate-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addDomain}
                className="w-full border-dashed border-slate-300 hover:border-slate-400 rounded-sm text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Domain
              </Button>
            </div>

            <div className="pt-2">
              <Button
                onClick={generateApiKey}
                disabled={isGenerating}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-sm px-6 h-9 sm:h-10 font-medium text-sm disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
