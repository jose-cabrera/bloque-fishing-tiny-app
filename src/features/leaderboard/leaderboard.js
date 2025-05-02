import { html } from "../../utils/html";
import { fetchLeaderboard } from "./services/fetch";
import { useEffect, useState } from "preact/hooks";
import { saveToIndexedDB, loadFromIndexedDB } from "../../indexdb/db"
import { Player } from "./components/player";
import { Legend } from "./components/legend";
import Loading from "../../components/loading";
import { LOCAL_LEADERBOARD_KEY } from "../../constants";
import RefreshButton from "../../components/refreshButton";
import SearchBar from "../../components/searchBar";

const LeaderBoard = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");  
  const [showLegend, setShowLegend] = useState(false);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const loadLeaderboard = async () => {
    setIsFetching(true);
    try {
      const result = await fetchLeaderboard();
      setData(result);
      setError(null);
      saveToIndexedDB(LOCAL_LEADERBOARD_KEY, result);
    } catch (err) {
      setError(err);      
      loadFromIndexedDB(LOCAL_LEADERBOARD_KEY, (result) => {
        if (result) setData(result);
      });
    } finally {      
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();    
  }, []);
  
  useEffect(() => {
    if (error) {
      loadFromIndexedDB(LOCAL_LEADERBOARD_KEY, (result) => {
        if (result) setData(result);
      });
    }
  }, [error]);

  useEffect(() => {        
    setFilteredPlayers(data?.players?.filter((player) => {
        const term = searchTerm.toLowerCase();
        return player.username.toLowerCase().includes(term) || player.emojiDescription.toLowerCase().includes(term);
      }))
  }, [data]);

  return html` 
    <div class="flex flex-1 flex-col max-w-sm lg:rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full min-w-full transition-colors duration-300 z-30 pb-2 explicit-bg" >
      <div class="flex flex-row justify-between shadow-blue-950 border-b-green-800 items-center p-2 z-25 mb-0.5 border-b-2  mt-1 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-0">🎣 Ranking</h2>
        <div class="flex space-x-2">
          <${RefreshButton} refresh=${loadLeaderboard} />
          <button
            title="Info"
            class="text-base px-3 py-1 rounded h-8 w-10 text-center text-white focus:outline-none bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800 transition-colors duration-200 focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 border border-green-800 dark:border-green-700 hover:scale-105 hover:opacity-90 transition-transform"
            onClick=${() => setShowLegend(true)}
          >
            📖
          </button>
        </div>
      </div>
      <div class="px-3 pt-2 shadow-lg z-30">
        <${SearchBar} searchTerm=${searchTerm} setSearchTerm=${setSearchTerm} placeholder=${"Search by username or emoji description"}/>
      </div>
      ${
        isFetching ? (
          html`
            <${Loading} /> 
          `
        ) : (
          html`
            <div class="flex flex-col overflow-y-auto z-10 scrollbar-none">
              ${filteredPlayers?.map((player) => html`
                 <${Player} player=${player} />
              `)}
            </div>
          `
        )
      }            
    </div> 
    ${showLegend && html`
      <${Legend} dataToUse=${dataToUse} setShowLegend=${setShowLegend} />
    `}
  `;
};

export default LeaderBoard;
