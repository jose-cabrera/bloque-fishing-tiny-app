import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { html } from "./utils/html.js";
import LeaderBoard from "./features/leaderboard";
import Market from "./features/market";
import { SECTION_LEADERBOARD, SECTION_MARKET } from "./constants.js";
import AppSection from "./components/appSection";

const App = () => {
  const [activeSection, setActiveSection] = useState(SECTION_LEADERBOARD);

  const isIOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;    
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  useEffect(() => {
    if (isIOS) {
      setViewportHeight();
    }    
  }, []);
  
  window.addEventListener('resize', setViewportHeight);  
  
  return html`
   <main className="flex flex-col lg:flex-row min-w-[100vw] overflow-hidden" style=${{ height: 'calc(var(--vh, 1vh) * 100)' }}>
    <div className="flex flex-col lg:flex-row space-y-2 xl:space-x-5 lg:justify-between lg:p-5 lg:pt-10 xl:pt-5 h-full w-full overflow-hidden">
      <${AppSection} activeSection=${activeSection} section=${SECTION_LEADERBOARD} isIOS=${isIOS}>
        <${LeaderBoard} />
      <//>
      <${AppSection} activeSection=${activeSection} section=${SECTION_MARKET} isIOS=${isIOS}>
        <${Market} />
      <//>
    </div>    
    <div className="xl:hidden fixed bottom-0 left-0 right-0 lg:top-0 lg:left-0 lg:right-0 rounded-t-md lg:rounded-none lg:rounded-b-md  bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex  justify-around h-8 z-100">
      <button className=${`text-sm font-semibold ${activeSection === SECTION_LEADERBOARD ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} border-r-2 border-r-green-700 dark:border-r-gray-700 w-full h-full`} onClick=${() => setActiveSection(SECTION_LEADERBOARD)}>Leaderboard</button>
      <button className=${`text-sm font-semibold ${activeSection === SECTION_MARKET ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} w-full h-full`} onClick=${() => setActiveSection(SECTION_MARKET)}>Marketplace</button>
    </div>    
  </main>
  `;
};

export default App;
