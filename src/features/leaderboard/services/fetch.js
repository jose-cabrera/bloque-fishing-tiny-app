export const fetchLeaderboard = async ({ signal } = {}) => {
    const controller = signal ? null : new AbortController();
    const timeoutId = signal
      ? null
      : setTimeout(() => controller.abort(), 5000); // ⏱️ 5 second timeout
  
    try {
      const response = await fetch(
        "https://api-game.bloque.app/game/leaderboard",
        {
          signal: signal || controller.signal,
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Leaderboard data:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      throw error;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };