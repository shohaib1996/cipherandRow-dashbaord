import axios from "axios";

interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: any;
}

class AuthService {
  /**
   * Check if the current access token is expired
   */
  isTokenExpired(): boolean {
    if (typeof window === "undefined") return false;

    const expiresAt = localStorage.getItem("token_expires_at");
    if (!expiresAt) return false;

    const expirationTime = parseInt(expiresAt, 10);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return currentTime >= expirationTime;
  }

  /**
   * Check if token should be refreshed (5 minutes before expiration)
   */
  shouldRefreshToken(): boolean {
    if (typeof window === "undefined") return false;

    const expiresAt = localStorage.getItem("token_expires_at");
    if (!expiresAt) return false;

    const expirationTime = parseInt(expiresAt, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = expirationTime - currentTime;

    // Refresh if less than 5 minutes (300 seconds) until expiration
    return timeUntilExpiry <= 300 && timeUntilExpiry > 0;
  }

  /**
   * Update localStorage with new auth tokens
   */
  updateAuthTokens(data: RefreshTokenResponse): void {
    if (typeof window === "undefined") return;

    const authToken = data.access_token;

    // Store new tokens
    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("token_expires_at", data.expires_at.toString());

    // Update user info if provided
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    // Update cookie
    document.cookie = `auth_token=${authToken}; path=/; max-age=2592000; SameSite=Lax`;
  }

  /**
   * Refresh the access token using the refresh token
   */
  async refreshAccessToken(): Promise<string | null> {
    if (typeof window === "undefined") return null;

    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      console.error("No refresh token found");
      return null;
    }

    try {
      const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

      const response = await axios.post<RefreshTokenResponse>(
        `${baseURL}/auth/refresh`,
        { refresh_token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Update tokens in storage
      this.updateAuthTokens(data);

      return data.access_token;
    } catch (error: any) {
      console.error("Token refresh failed:", error);

      // If refresh fails, clear auth data and redirect to login
      this.clearAuthData();

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }

      return null;
    }
  }

  /**
   * Clear all auth data from storage
   */
  clearAuthData(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
    localStorage.removeItem("user");

    // Clear cookie
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  /**
   * Get the current access token
   */
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  /**
   * Get the current refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  }
}

export const authService = new AuthService();
