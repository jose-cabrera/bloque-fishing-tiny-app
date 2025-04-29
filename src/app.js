import { useState } from "preact/hooks";
import "./app.css";
import { html } from "./utils/html.js";

const App = () => {
  const [count, setCount] = useState(0);

  return html`
    <main className="p-6 bg-gray-100 min-h-screen">
      <section className="mb-4">
        <h1 className="text-2xl font-bold text-blue-600">leaderboard</h1>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick=${() => setCount(count + 1)}
        >
          Increase Count (${count})
        </button>
      </section>
      <section>
        <h1 className="text-2xl font-bold text-green-600">marketplace</h1>
      </section>
    </main>
  `;
};

export default App;
