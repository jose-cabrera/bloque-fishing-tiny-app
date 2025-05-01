import { API_URL } from "../../../api";

export const fetchLeaderboard = async ({ signal } = {}) => {
    const controller = signal ? null : new AbortController();
    const timeoutId = signal
      ? null
      : setTimeout(() => controller.abort(), 5000); // ⏱️ 5 second timeout
  
    try {
      const response = await fetch(
        `${API_URL}/leaderboard`,
        {
          signal: signal || controller.signal,
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();      
      return data;
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      throw error;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };