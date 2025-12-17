"use client";

import { useEffect, useRef } from "react";
import { authService } from "@/lib/authService";

/**
 * React hook for proactive token refresh
 * Checks token expiration periodically and refreshes before expiration
 */
export function useTokenRefresh() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to check and refresh token if needed
    const checkAndRefreshToken = async () => {
      // Skip if not in browser
      if (typeof window === "undefined") return;

      // Check if token should be refreshed (5 minutes before expiration)
      if (authService.shouldRefreshToken()) {
        console.log("Token expiring soon, refreshing proactively...");
        try {
          await authService.refreshAccessToken();
          console.log("Token refreshed successfully");
        } catch (error) {
          console.error("Proactive token refresh failed:", error);
        }
      }
    };

    // Check immediately on mount
    checkAndRefreshToken();

    // Set up interval to check every 5 minutes (300000ms)
    intervalRef.current = setInterval(checkAndRefreshToken, 5 * 60 * 1000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
