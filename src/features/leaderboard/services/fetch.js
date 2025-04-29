export const fetchLeaderboard = async () => {
  try {
    const response = await fetch(
      "https://api-game.bloque.app/game/leaderboard",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Leaderboard data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    throw error; // optional: rethrow if you want to handle it elsewhere
  }
};
