import { html } from "../../utils/html";
import { useState, useEffect } from "preact/hooks";
import Loading from "../../components/loading";
import { MarketItem } from "./components/marketItem";
import { saveToIndexedDB, loadFromIndexedDB } from "../../indexdb/db"
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
        setFilteredItems(data?.items?.filter((item) => {
            const term = searchTerm.toLowerCase();
            return item.name.toLowerCase().includes(term);
          }))
    }, [data]);  
    
    return html`
        <div class="flex flex-1 flex-col max-w-sm lg:rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full min-w-full transition-colors duration-300 z-30 pb-2 " >
            <div class="flex flex-row justify-between shadow-blue-950 border-b-green-800 items-center p-2 z-25 mb-0.5 border-b-2  mt-1 text-center">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-0">🪙 Market</h2>
                <div class="flex space-x-2">
                    <${RefreshButton} refresh=${marketPlace}/>              
                </div>
            </div>
            <div class="px-3 pt-2 shadow-lg z-30">
                <${SearchBar} searchTerm=${searchTerm} setSearchTerm=${setSearchTerm} placeholder=${"Search by item name"}/>                
            </div>
            ${
                isFetching || !filteredItems ? (
                    html`
                        <${Loading} />
                    `
                ) : (
                    html`
                        <div class="overflow-y-auto max-h-[80vh] space-y-2 px-2 pt-2 scrollbar-none">
                        ${filteredItems.map((item) => html`
                            <${MarketItem} item=${item}/>
                        `)}
                        </div>
                    `
                )
                }            
        </div>
    `
}