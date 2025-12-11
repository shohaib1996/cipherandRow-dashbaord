export interface KBArticle {
  id: string;
  client_id: string;
  title: string;
  text: string;
  type: "manual";
  created_at: string;
}

export interface CreateKBRequest {
  title: string;
  text: string;
  type: "manual";
}

export interface UpdateKBRequest {
  id: string;
  title: string;
  text: string;
  type: "manual";
}

import axiosInstance from "./axiosInstance";

class KBApiService {
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

  async getAllArticles(): Promise<KBArticle[]> {
    const clientId = this.getClientId();
    if (!clientId) {
      throw new Error("Client ID not found in localStorage");
    }

    const response = await axiosInstance.get<{ entries: KBArticle[] }>("/kb", {
      params: { client_id: clientId },
    });

    // The API returns data in an "entries" array
    return response.data.entries || [];
  }

  async createArticle(data: CreateKBRequest): Promise<KBArticle> {
    const response = await axiosInstance.post<KBArticle>("/kb", data);
    return response.data;
  }

  async updateArticle(data: UpdateKBRequest): Promise<KBArticle> {
    const response = await axiosInstance.patch<KBArticle>("/kb", data);
    return response.data;
  }

  async deleteArticle(id: string): Promise<void> {
    await axiosInstance.delete("/kb", {
      params: { id },
    });
  }
}

export const kbApi = new KBApiService();
