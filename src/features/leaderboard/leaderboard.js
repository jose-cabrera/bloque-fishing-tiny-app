import { html } from "../../utils/html";
import { useLeaderboard } from "./queries/useLeaderBoard";
import { SECTION_LEADERBOARD, LOCAL_LEADERBOARD_KEY } from "./constants";
import { useEffect, useState } from "preact/hooks";
import { saveToIndexedDB, loadFromIndexedDB } from "./indexdb/db"

const LeaderBoard = ({ isMobile, active, handleSelection }) => {
  const { data, isLoading, error, refetch } = useLeaderboard();  
  const [searchTerm, setSearchTerm] = useState("");
  const [savedData, setSavedData] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
    
  useEffect(() => {
    if (data) {
      saveToIndexedDB(LOCAL_LEADERBOARD_KEY, data);
    }
  }, [data]);


  useEffect(() => {
    loadFromIndexedDB(LOCAL_LEADERBOARD_KEY, (result) => {
      if (result) setSavedData(result);
    });
  }, [error]);

  const dataToUse = error ? savedData : data

  const filteredPlayers = dataToUse?.players?.filter((player) => {
    const term = searchTerm.toLowerCase();
    return player.username.toLowerCase().includes(term) || player.emojiDescription.toLowerCase().includes(term);
  });

  return html` 
    <div class="flex flex-1 flex-col max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full min-w-full transition-colors duration-300 z-30 pb-2 " >
      <div class="flex flex-row justify-between shadow-blue-950 border-b-green-800 items-center p-2 z-25 mb-0.5 border-b-2  mt-1 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-0">🎣 Ranking</h2>
        <div class="flex space-x-2">
          <button 
            title="Reload"
            class="text-base px-3 py-1 rounded h-8 w-10 text-center text-white focus:outline-none bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800 transition-colors duration-200 outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 border border-green-800 dark:border-green-700"
            onClick=${() => {
              refetch()
              setSearchTerm("")
            }}
          >
            ↺ 
          </button>
          <button
            title="Info"
            class="text-base px-3 py-1 rounded h-8 w-10 text-center text-white focus:outline-none bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800 transition-colors duration-200 focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 border border-green-800 dark:border-green-700"
            onClick=${() => setShowLegend(true)}
          >
            📖
          </button>
        </div>
      </div>
      <div class="px-3 pt-2 shadow-lg z-30">
        <input 
          type="text" 
          placeholder="Search by username or emoji description" 
          class="text-base w-full p-2 rounded-md border border-green-800 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
          value=${searchTerm}
          onInput=${(e) => setSearchTerm(e.target.value)}
        />
      </div>
      ${
        isLoading ? (
          html`
            <div class="flex z-10 justify-center items-center h-full w-full">
              <div class="flex items-center justify-center bg-gray-500/30 rounded-full w-32 h-32">
                <img src="icons/bloque.svg" alt="Loading" class="loader " />
              </div>
            </div>  
          `
        ) : (
          html`
            <div class="flex flex-col overflow-y-auto z-10" onClick=${() =>  {
                if (isMobile) {
                  handleSelection(SECTION_LEADERBOARD);
                }
            }}>
              ${filteredPlayers.map((player) => html`
                <div key=${player.username} class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex flex-col space-y-1">
                  <div class="flex flex-row justify-between text-gray-900 dark:text-gray-100 font-semibold text-base">
                    <span>#${player.rank} — ${player.username}</span><span>Level ${player.level}</span>
                  </div>
                  <div class="text-gray-600 dark:text-gray-400 text-sm">
                    🧠 XP: ${player.xp} · 💰 Gold: <span class="text-yellow-500">${player.gold}</span>
                  </div>
                  <div class="text-base">
                    ${player.fishEmojis} <span class="text-xs text-gray-600 dark:text-gray-400">(${player.emojiDescription})</span>
                    ${player.isInfected ? html`<span class="text-red-500 ml-2">☣️ Infected</span>` : ''}
                  </div>
                </div>
              `)}
            </div>
          `
        )
      }            
    </div> 
    ${showLegend && html`
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-[90vw] max-w-md shadow-lg">
          <h3 class="text-lg font-semibold mb-2">🐟 Tiers</h3>
          <ul class="space-y-2 text-sm">
            ${dataToUse?.legend?.tiers?.map(tier => html`
              <li>
                <strong>${tier.range}</strong> — ${tier.representation}: <span>${tier.example}</span>
              </li>
            `)}
          </ul>
          <div class="text-right mt-4">
            <button
              class="text-sm px-3 py-1 rounded text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 border border-gray-300 dark:border-gray-600"
              onClick=${() => setShowLegend(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    `}
  `;
};

export default LeaderBoard;
