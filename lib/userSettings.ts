// Utility functions for managing user settings in localStorage

interface UserSettings {
  fullName?: string;
  email?: string;
  companyName?: string;
}

/**
 * Get user settings from localStorage
 * Falls back to user metadata if no custom settings are saved
 */
export function getUserSettings(userId: string): UserSettings {
  try {
    // First, try to get custom saved settings
    const savedSettings = localStorage.getItem(`user_settings_${userId}`);
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    // Fall back to user metadata from auth
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      return {
        fullName: userData?.user_metadata?.full_name || "",
        email: userData?.email || "",
        companyName: userData?.user_metadata?.company_name || "",
      };
    }

    return {};
  } catch (error) {
    console.error("Error getting user settings:", error);
    return {};
  }
}

/**
 * Save user settings to localStorage
 */
export function saveUserSettings(userId: string, settings: UserSettings): void {
  try {
    localStorage.setItem(`user_settings_${userId}`, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving user settings:", error);
  }
}

/**
 * Clear user settings from localStorage
 */
export function clearUserSettings(userId: string): void {
  try {
    localStorage.removeItem(`user_settings_${userId}`);
  } catch (error) {
    console.error("Error clearing user settings:", error);
  }
}

/**
 * Get current user ID from localStorage
 */
export function getCurrentUserId(): string | null {
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      return userData?.id || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting current user ID:", error);
    return null;
  }
}
