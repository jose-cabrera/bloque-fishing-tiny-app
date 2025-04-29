import { useState, useEffect } from "preact/hooks";
import "./app.css";
import { html } from "./utils/html.js";
import LeaderBoard from "./features/leaderboard/leaderboard.js";


const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 768);
      setIsMobile(true)
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
      ${(!isMobile || activeSection === null || activeSection === "leaderboard") &&
        html`
          <div onClick=${() => handleSectionClick("leaderboard")}>
            <section className=${`flex basis-auto ${activeSection ? 'min-h-[90vh] max-h-[90vh]' : 'min-h-[45vh] max-h-[45vh]'} overflow-y-auto cursor-pointer`}>
              <${LeaderBoard} />
            </section>
          </div>
        `}
      ${(!isMobile || activeSection === null || activeSection === "marketplace") &&
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
