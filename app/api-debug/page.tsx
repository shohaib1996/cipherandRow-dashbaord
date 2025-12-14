"use client";

export default function ApiDebugPage() {
  // This will show what the environment variable was at BUILD TIME
  const buildTimeApiUrl = process.env.NEXT_PUBLIC_API_URL;

  // This will show what's actually in the browser
  const runtimeApiUrl =
    typeof window !== "undefined" ? (window as any).NEXT_PUBLIC_API_URL : "N/A";

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Configuration Debug</h1>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Build-Time API URL:</h2>
          <code className="text-sm break-all">
            {buildTimeApiUrl || "NOT SET"}
          </code>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Runtime Check:</h2>
          <code className="text-sm break-all">{runtimeApiUrl}</code>
        </div>

        <div className="p-4 bg-blue-50 rounded border border-blue-200">
          <h2 className="font-semibold mb-2">Expected Values:</h2>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Staging:</strong>{" "}
              https://cr-engine-staging.jnowlan21.workers.dev
            </li>
            <li>
              <strong>Production:</strong>{" "}
              https://cr-engine.jnowlan21.workers.dev
            </li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
          <h2 className="font-semibold mb-2">⚠️ Important:</h2>
          <p className="text-sm">
            The build-time value is what gets baked into your code during
            deployment. If this shows the wrong URL, you need to redeploy after
            fixing your Vercel environment variables.
          </p>
        </div>
      </div>
    </div>
  );
}
