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

const API_BASE_URL = "https://cr-engine.jnowlan21.workers.dev/api/kb";

class KBApiService {
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

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

  private getHeaders(): HeadersInit {
    const token = this.getAuthToken();
    return {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async getAllArticles(): Promise<KBArticle[]> {
    const clientId = this.getClientId();
    if (!clientId) {
      throw new Error("Client ID not found in localStorage");
    }

    const response = await fetch(`${API_BASE_URL}?client_id=${clientId}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data = await response.json();
    // The API returns data in an "entries" array
    return data.entries || [];
  }

  async createArticle(data: CreateKBRequest): Promise<KBArticle> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create article: ${response.statusText}`);
    }

    return response.json();
  }

  async updateArticle(data: UpdateKBRequest): Promise<KBArticle> {
    const response = await fetch(API_BASE_URL, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update article: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteArticle(id: string): Promise<void> {
    // Use Next.js API route to avoid CORS issues with DELETE
    const response = await fetch(`/api/kb?id=${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete article: ${response.statusText}`);
    }
  }
}

export const kbApi = new KBApiService();
