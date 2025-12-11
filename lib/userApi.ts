export interface Subscription {
  id: string;
  user_id: string;
  status: "active" | "canceled" | "past_due" | "unpaid" | "incomplete";
  price_id: string;
  quantity: number;
  cancel_at_period_end: boolean;
  created_at: string;
  current_period_start: string;
  current_period_end: string;
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
  subscription: Subscription | null;
}

export interface TrialStatus {
  isActive: boolean;
  daysRemaining: number;
  isExpired: boolean;
  createdAt: string;
}

export interface SubscriptionStatus {
  isSubscribed: boolean;
  status: string | null;
  daysUntilNextBilling: number | null;
  currentPeriodEnd: string | null;
}

import axiosInstance from "./axiosInstance";

class UserApiService {
  private getClientId(): string | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.id || null;
    } catch {
      return null;
    }
  }

  async getUserProfile(): Promise<UserProfile> {
    const clientId = this.getClientId();
    if (!clientId) {
      throw new Error("Client ID not found in localStorage");
    }

    const response = await axiosInstance.get<UserProfile>("/user/profile", {
      params: { client_id: clientId },
    });

    return response.data;
  }

  calculateTrialStatus(createdAt: string): TrialStatus {
    const signupDate = new Date(createdAt);
    const today = new Date();
    const diffTime = today.getTime() - signupDate.getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const trialDays = 7;
    const remaining = trialDays - daysPassed;

    return {
      isActive: remaining > 0,
      daysRemaining: Math.max(0, remaining),
      isExpired: remaining <= 0,
      createdAt,
    };
  }

  calculateSubscriptionStatus(
    subscription: Subscription | null
  ): SubscriptionStatus {
    if (!subscription || subscription.status !== "active") {
      return {
        isSubscribed: false,
        status: subscription?.status || null,
        daysUntilNextBilling: null,
        currentPeriodEnd: null,
      };
    }

    const currentPeriodEnd = new Date(subscription.current_period_end);
    const today = new Date();
    const diffTime = currentPeriodEnd.getTime() - today.getTime();
    const daysUntilNextBilling = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      isSubscribed: true,
      status: subscription.status,
      daysUntilNextBilling: Math.max(0, daysUntilNextBilling),
      currentPeriodEnd: subscription.current_period_end,
    };
  }

  async getCompleteUserStatus() {
    const profile = await this.getUserProfile();
    const trialStatus = this.calculateTrialStatus(profile.created_at);
    const subscriptionStatus = this.calculateSubscriptionStatus(
      profile.subscription
    );

    return {
      profile,
      trialStatus,
      subscriptionStatus,
    };
  }
}

export const userApi = new UserApiService();
