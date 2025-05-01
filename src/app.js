import { useState } from "preact/hooks";
import "./app.css";
import { html } from "./utils/html.js";
import LeaderBoard from "./features/leaderboard";
import Market from "./features/market";
import { SECTION_LEADERBOARD, SECTION_MARKET } from "./constants.js";

const App = () => {
  const [activeSection, setActiveSection] = useState(SECTION_LEADERBOARD);

  return html`
   <main className="flex flex-col lg:flex-row min-h-[100vh] max-h-[100vh] min-w-[100vw]">
    <div className="flex flex-col lg:flex-row space-y-2 xl:space-x-5 lg:justify-between lg:p-5 lg:pt-10 xl:pt-5 h-full w-full ">
      <section className=${`flex basis-auto lg:basis-full ${activeSection !== SECTION_LEADERBOARD ? 'hidden lg:hidden xl:flex' : ''} min-h-[95vh] lg:min-h-[92vh] xl:min-h-[95vh] max-h-[95vh] md:min-h-[90vh] md:max-h-[90vh] overflow-y-auto`}>
        <${LeaderBoard} />
      </section>
      <section className=${`flex basis-auto lg:basis-full ${activeSection !== SECTION_MARKET ? 'hidden lg:hidden xl:flex' : ''} min-h-[95vh] lg:min-h-[92vh] xl:min-h-[95vh] max-h-[95vh] md:min-h-[90vh] md:max-h-[90vh] overflow-y-auto`}>
        <${Market} />
      </section>
    </div>    
    <div className="xl:hidden fixed bottom-0 left-0 right-0 lg:top-0 lg:left-0 lg:right-0 rounded-t-md lg:rounded-none lg:rounded-b-md  bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex  justify-around h-8 z-100">
      <button className=${`text-sm font-semibold ${activeSection === SECTION_LEADERBOARD ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} border-r-2 border-r-green-700 dark:border-r-gray-700 w-full h-full`} onClick=${() => setActiveSection(SECTION_LEADERBOARD)}>Leaderboard</button>
      <button className=${`text-sm font-semibold ${activeSection === SECTION_MARKET ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} w-full h-full`} onClick=${() => setActiveSection(SECTION_MARKET)}>Marketplace</button>
    </div>    
  </main>
  `;
};

export default App;
