"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

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

  useEffect(() => {
    // Load stored API key
    const storedKey = localStorage.getItem("generated_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const generateApiKey = async () => {
    setIsGenerating(true);

    try {
      // Get auth token and client_id from localStorage
      const authToken = localStorage.getItem("auth_token");
      const userStr = localStorage.getItem("user");

      if (!authToken) {
        toast.error("Authentication Error", {
          description: "No authentication token found. Please sign in again.",
        });
        return;
      }

      if (!userStr) {
        toast.error("User Data Missing", {
          description: "User data not found. Please sign in again.",
        });
        return;
      }

      const userData: UserData = JSON.parse(userStr);
      const clientId = userData.id;

      if (!clientId) {
        toast.error("Client ID Missing", {
          description: "Could not retrieve client ID from user data.",
        });
        return;
      }

      // Make API request to generate key
      const response = await fetch(
        "https://cr-engine.jnowlan21.workers.dev/api/keys/generate",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            client_id: clientId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Get error message from backend
        const backendError = errorData.error || errorData.message;

        // Handle specific error cases
        if (response.status === 401) {
          toast.error("Authentication Failed", {
            description: backendError || "Your session has expired. Please sign in again.",
          });
          setIsGenerating(false);
          return;
        }

        if (response.status === 403) {
          toast.error("Access Denied", {
            description: backendError || "You need to complete payment before generating an API key.",
          });
          setIsGenerating(false);
          return;
        }

        if (backendError === "No plan selected.") {
          toast.error("No Plan Selected", {
            description: "Please upgrade your plan first before generating an API key.",
          });
          setIsGenerating(false);
          return;
        }

        // Generic error with backend message
        toast.error("Failed to Generate API Key", {
          description: backendError || "An error occurred. Please try again.",
        });
        setIsGenerating(false);
        return;
      }

      const data = await response.json();
      const newApiKey = data.api_key || data.key;

      if (!newApiKey) {
        throw new Error("No API key returned from server");
      }

      // Store the API key
      setApiKey(newApiKey);
      localStorage.setItem("generated_api_key", newApiKey);

      toast.success("API Key Generated", {
        description: "Your API key has been generated successfully!",
      });
    } catch (error: any) {
      console.error("Error generating API key:", error);
      toast.error("Generation Failed", {
        description: error.message || "Failed to generate API key. Please try again.",
      });
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
    // Confirm before regenerating
    const confirmed = window.confirm(
      "Are you sure you want to regenerate your API key? The old key will stop working immediately."
    );

    if (confirmed) {
      // Clear existing key first
      setApiKey("");
      localStorage.removeItem("generated_api_key");
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

            <div className="flex gap-2 pt-2">
              <Button
                onClick={regenerateKey}
                disabled={isGenerating}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-sm px-6 h-9 sm:h-10 font-medium text-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Key
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
                Generate an API key to use the chatbot API. This key will be used to authenticate your requests.
              </p>
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
