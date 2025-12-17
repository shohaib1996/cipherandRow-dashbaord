import axios from "axios";
import { authService } from "./authService";

// Extend Axios config to support skipAuth option
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean; // Flag to prevent infinite retry loops
  }
}

// Create a configured Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // Fallback for local dev
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip authentication for public routes
    // Usage: axiosInstance.get('/public-endpoint', { skipAuth: true })
    if (config.skipAuth) {
      return config;
    }

    // Automatically attach auth_token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 and auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip refresh for auth endpoints to prevent loops
      if (
        originalRequest.url?.includes("/auth/signin") ||
        originalRequest.url?.includes("/auth/signup") ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      // Mark request as retried to prevent infinite loops
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const newToken = await authService.refreshAccessToken();

        if (newToken) {
          // Update the authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error("Token refresh failed:", refreshError);
        authService.clearAuthData();

        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }

        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default axiosInstance;
