import { html } from "../../utils/html";
import { useState, useEffect } from "preact/hooks";
import Loading from "../../components/loading";
import { MarketItem } from "./components/marketItem";
import { saveToIndexedDB, loadFromIndexedDB } from "../../indexdb/db";
import { LOCAL_MARKET_KEY } from "../../constants";
import RefreshButton from "../../components/refreshButton";
import SearchBar from "../../components/searchBar";
import { fetchMarket } from "./services/fetch";

export const Market = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);

  const marketPlace = async () => {
    setIsFetching(true);
    try {
      const result = await fetchMarket();
      setData(result);
      setError(null);
      saveToIndexedDB(LOCAL_MARKET_KEY, result);
    } catch (err) {
      setError(err);
      loadFromIndexedDB(LOCAL_MARKET_KEY, (result) => {
        if (result) setData(result);
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    marketPlace();
  }, []);

  useEffect(() => {
    if (error) {
      loadFromIndexedDB(LOCAL_LEADERBOARD_KEY, (result) => {
        if (result) setData(result);
      });
    }
  }, [error]);

  useEffect(() => {
    setFilteredItems(
      data?.items?.filter((item) => {
        const term = searchTerm.toLowerCase();
        return item.name.toLowerCase().includes(term);
      }),
    );
  }, [data, searchTerm]);

  return html`
    <div
      class="z-30 flex w-full max-w-sm min-w-full flex-1 flex-col overflow-hidden bg-white pb-2 shadow-lg transition-colors duration-300 lg:rounded-2xl dark:bg-gray-800"
    >
      <div
        class="z-25 mt-1 mb-0.5 flex flex-row items-center justify-between border-b-2 border-b-green-800 p-2 text-center shadow-blue-950"
      >
        <h2 class="mb-0 text-3xl font-bold text-gray-900 dark:text-gray-100">
          🪙 Market
        </h2>
        <div class="flex space-x-2">
          <${RefreshButton} refresh=${marketPlace} />
        </div>
      </div>
      <div class="z-30 px-3 pt-2 shadow-lg">
        <${SearchBar}
          searchTerm=${searchTerm}
          setSearchTerm=${setSearchTerm}
          placeholder=${"Search by item name"}
        />
      </div>
      ${isFetching || !filteredItems
        ? html` <${Loading} /> `
        : html`
            <div
              class="scrollbar-none max-h-[80vh] space-y-2 overflow-y-auto px-2 pt-2"
            >
              ${filteredItems.map(
                (item) => html` <${MarketItem} item=${item} /> `,
              )}
            </div>
          `}
    </div>
  `;
};
