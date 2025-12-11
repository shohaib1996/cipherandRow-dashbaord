import axios from "axios";

// Extend Axios config to support skipAuth option
declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

/**
 * Automatically determine the correct API URL based on the environment
 */
const getApiUrl = (): string => {
  // Check if we have an explicit NEXT_PUBLIC_API_URL set
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Vercel provides VERCEL_ENV: 'production' | 'preview' | 'development'
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") {
    // Production deployment
    return "https://cr-engine.jnowlan21.workers.dev";
  } else if (vercelEnv === "preview") {
    // Preview/staging deployment
    return "https://cr-engine-staging.jnowlan21.workers.dev";
  }

  // Local development fallback
  return "http://localhost:3000/api";
};

// Create a configured Axios instance
const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for request/response handling
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (e.g., redirect to login on 401)
    return Promise.reject(error);
  }
);

export default axiosInstance;
