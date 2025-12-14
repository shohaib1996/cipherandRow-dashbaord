import axiosInstance from "./axiosInstance";

export interface Conversation {
  id: string;
  created_at: string;
  client_id: string;
  bot_id: string;
  session_id: string;
  page_url: string;
}

export interface Message {
  id: string;
  created_at: string;
  session_id: string;
  sender: "user" | "bot";
  message: string;
  client_id: string;
  bot_id: string;
}

export interface GetMessagesResponse {
  messages: Message[];
}

export interface GetConversationsResponse {
  conversations: Conversation[];
  limit: number;
  offset: number;
}

export interface GetConversationsParams {
  limit?: number;
  offset?: number;
}

class ConversationsApiService {
  /**
   * Fetch conversations with pagination
   * @param params - { limit, offset }
   */
  async getConversations(
    params: GetConversationsParams = {}
  ): Promise<GetConversationsResponse> {
    const { limit = 10, offset = 0 } = params;

    // Using axiosInstance to automatically handle Authorization if token exists
    const response = await axiosInstance.get<GetConversationsResponse>(
      "/conversations",
      {
        params: {
          limit,
          offset,
        },
      }
    );

    return response.data;
  }

  /**
   * Fetch messages for a specific session
   * @param sessionId - The session ID to fetch messages for
   * @param params - { limit, offset }
   */
  async getMessages(
    sessionId: string,
    params: { limit?: number; offset?: number } = {}
  ): Promise<GetMessagesResponse> {
    const { limit = 100, offset = 0 } = params;
    const response = await axiosInstance.get<GetMessagesResponse>(
      `/conversations/${sessionId}/messages`,
      {
        params: {
          limit,
          offset,
        },
      }
    );
    return response.data;
  }
}

export const conversationsApi = new ConversationsApiService();
