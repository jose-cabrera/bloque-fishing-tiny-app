import { html } from "../../../utils/html";

export const Legend = ({dataToUse, setShowLegend}) => {
    return html`
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
            class="text-sm px-3 py-1 rounded text-gray-900 dark:text-gray-100 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 border border-gray-300 dark:border-gray-600 hover:scale-105 hover:opacity-90 transition-transform"
            onClick=${() => setShowLegend(false)}
            >
            Close
            </button>
        </div>
        </div>
    </div>
    `
}