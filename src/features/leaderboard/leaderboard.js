import { html } from "../../utils/html";
import { fetchLeaderboard } from "./services/fetch";
import { useEffect, useState } from "preact/hooks";
import { saveToIndexedDB, loadFromIndexedDB } from "../../indexdb/db";
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
  const [filteredPlayers, setFilteredPlayers] = useState(null);

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
    setFilteredPlayers(
      data?.players?.filter((player) => {
        const term = searchTerm.toLowerCase();
        return (
          player.username.toLowerCase().includes(term) ||
          player.emojiDescription.toLowerCase().includes(term)
        );
      }),
    );
  }, [data, searchTerm]);

  return html`
    <div
      class="explicit-bg z-30 flex w-full max-w-sm min-w-full flex-1 flex-col overflow-hidden bg-white pb-2 shadow-lg transition-colors duration-300 lg:rounded-2xl dark:bg-gray-800"
    >
      <div
        class="z-25 mt-1 mb-0.5 flex flex-row items-center justify-between border-b-2 border-b-green-800 p-2 text-center shadow-blue-950"
      >
        <h2 class="mb-0 text-3xl font-bold text-gray-900 dark:text-gray-100">
          🎣 Ranking
        </h2>
        <div class="flex space-x-2">
          <${RefreshButton} refresh=${loadLeaderboard} />
          <button
            title="Info"
            class="h-8 w-10 rounded border border-green-800 bg-green-800 px-3 py-1 text-center text-base text-white transition-colors transition-transform duration-200 hover:scale-105 hover:bg-green-900 hover:opacity-90 focus:ring-2 focus:ring-green-800 focus:outline-none dark:border-green-700 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-700"
            onClick=${() => setShowLegend(true)}
          >
            📖
          </button>
        </div>
      </div>
      <div class="z-30 px-3 pt-2 shadow-lg">
        <${SearchBar}
          searchTerm=${searchTerm}
          setSearchTerm=${setSearchTerm}
          placeholder=${"Search by username or emoji description"}
        />
      </div>
      ${isFetching || !filteredPlayers
        ? html` <${Loading} /> `
        : html`
            <div class="scrollbar-none z-10 flex flex-col overflow-y-auto">
              ${filteredPlayers?.map(
                (player) => html` <${Player} player=${player} /> `,
              )}
            </div>
          `}
    </div>
    ${showLegend &&
    html` <${Legend} dataToUse=${dataToUse} setShowLegend=${setShowLegend} /> `}
  `;
};

export default LeaderBoard;
