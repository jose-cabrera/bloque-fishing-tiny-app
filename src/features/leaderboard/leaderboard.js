import { html } from "../../utils/html";
import { useLeaderboard } from "./queries/useLeaderBoard";

const LeaderBoard = (isMobile, active) => {
  const { data, isLoading, error, refetch } = useLeaderboard();  
 
  if (isLoading) {
    return html` <img src="https://www.bloque.app/images/Yv0Xxq3LlMSU5WiWyNQU4GqN4o.svg" alt="Loading" class="loader" /> `
  }
  return html` 
    <div class="flex flex-1 flex-col max-w-sm rounded overflow-hidden shadow-lg bg-surface-light dark:bg-surface-dark ${isMobile && active ? 'min-h-[85vh] max-h-[85vh]' : 'min-h-full h-full'} w-full min-w-full transition-colors duration-300">
      <div class="flex flex-row justify-between shadow-sm items-center px-2">
        <h1 class="text-xl font-bold mb-2 text-textPrimary-light dark:text-textPrimary-dark">Leaderboard</h2>
        <button 
          title="Reload"
          class="text-lg px-3 py-1 rounded h-8 text-center text-white bg-buttonPrimary-light dark:bg-buttonPrimary-dark hover:bg-buttonPrimaryHover-light dark:hover:bg-buttonPrimaryHover-dark transition-colors duration-200"
          onClick=${() => refetch()}
        >
          ↺ 
        </button>
      </div>
      <div class="flex flex-col overflow-y-auto max-h-full">
        ${data.players.map((player) => html`
          <div key=${player.username} class="bg-surface-light dark:bg-surface-dark border-b border-divider-light dark:border-divider-dark p-3 flex flex-col space-y-1">
            <div class="text-textPrimary-light dark:text-textPrimary-dark font-semibold text-base">
              #${player.rank} — ${player.username}
            </div>
            <div class="text-textSecondary-light dark:text-textSecondary-dark text-sm">
              Level ${player.level} · XP: ${player.xp} · Gold: <span class="text-gold-light dark:text-gold-dark">${player.gold}</span>
            </div>
            <div class="text-base">
              ${player.fishEmojis} <span class="text-xs text-textSecondary-light dark:text-textSecondary-dark">(${player.emojiDescription})</span>
              ${player.isInfected ? html`<span class="text-danger-light dark:text-danger-dark ml-2">☣️ Infected</span>` : ''}
            </div>
          </div>
        `)}
      </div>
    </div> `;
};

export default LeaderBoard;
