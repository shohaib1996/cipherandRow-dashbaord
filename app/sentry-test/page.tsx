"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function SentryTestPage() {
  const throwClientError = () => {
    throw new Error(
      "🧪 TEST_CLIENT_ERROR - This is a test error from the client side"
    );
  };

  const throwAsyncError = async () => {
    throw new Error("🧪 TEST_ASYNC_ERROR - This is a test async error");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <Card className="w-full max-w-2xl border-slate-200 shadow-xl">
        <CardHeader className="bg-linear-to-r from-[#8A06E6] to-[#7A05D0] text-white">
          <CardTitle className="text-2xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6" />
            Sentry Integration Test
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-8 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              How to Test Sentry
            </h3>
            <ol className="text-sm text-blue-800 space-y-2 ml-6 list-decimal">
              <li>Click one of the buttons below to trigger a test error</li>
              <li>The page will crash (this is expected!)</li>
              <li>
                Go to your Sentry dashboard at{" "}
                <a
                  href="https://sentry.io"
                  target="_blank"
                  className="underline font-medium"
                >
                  sentry.io
                </a>
              </li>
              <li>
                Check the "Issues" tab - you should see the test error appear
              </li>
              <li>Once confirmed, come back and delete this test page</li>
            </ol>
          </div>

          {/* Test Buttons */}
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Test #1: Client-Side Error
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  This will throw an error immediately when you click the
                  button.
                </p>
                <Button
                  onClick={throwClientError}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  🧪 Trigger Client Error
                </Button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  Test #2: Async Error
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  This will throw an async error (simulates API failures).
                </p>
                <Button
                  onClick={throwAsyncError}
                  variant="destructive"
                  className="w-full sm:w-auto"
                >
                  🧪 Trigger Async Error
                </Button>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Important:</strong> After confirming Sentry is working,
              delete this test page at{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">
                app/sentry-test/page.tsx
              </code>
            </p>
          </div>

          {/* Back Link */}
          <div className="pt-4 border-t border-slate-200">
            <a
              href="/dashboard/overview"
              className="text-[#8A06E6] hover:text-[#7505C7] font-medium text-sm hover:underline"
            >
              ← Back to Dashboard
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
