import { useState, useEffect } from "preact/hooks";
import "./app.css";
import { html } from "./utils/html.js";
import LeaderBoard from "./features/leaderboard/leaderboard.js";
import { SECTION_LEADERBOARD, SECTION_MARKET } from "./features/leaderboard/constants.js";
import { MOBILE_WIDTH } from "./constants.js";

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_WIDTH);      
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionClick = (section) => {
    if (isMobile) {
      setActiveSection(activeSection ? null : section);
    }
  };

  return html`
   <main className="flex flex-col space-y-2 min-h-[90vh] max-h-[90vh] min-w-[100vw] p-5" onClick=${(e) => {
      if (isMobile && e.target === e.currentTarget) {
        e.stopPropagation();
        setActiveSection(null);
      }
    }}>
      ${(!isMobile || activeSection === null || activeSection === SECTION_LEADERBOARD) &&
        html`
          <div>
            <section className=${`flex basis-auto ${activeSection ? 'min-h-[90vh] max-h-[90vh]' : 'min-h-[45vh] max-h-[45vh]'} overflow-y-auto cursor-pointer`}>
              <${LeaderBoard} isMobile=${isMobile} active=${activeSection === SECTION_LEADERBOARD} handleSelection=${handleSectionClick} />
            </section>
          </div>
        `}
      ${(!isMobile || activeSection === null || activeSection === SECTION_MARKET) &&
        html`
          <div onClick=${() => handleSectionClick("marketplace")}>
            <section className=${`flex basis-auto ${activeSection ? 'min-h-[90vh] max-h-[90vh]' : 'min-h-[45vh] max-h-[45vh]'} overflow-y-auto cursor-pointer`}>
              <h1 className="text-2xl font-bold text-green-600">marketplace</h1>
            </section>
          </div>
        `}
    </main>
  `;
};

export default App;
