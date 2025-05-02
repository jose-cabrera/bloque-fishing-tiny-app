import { html } from "../../utils/html"

export const RefreshButton = ({refresh}) => {
    return html`
    <button 
        title="Reload"
        class="text-base px-3 py-1 rounded h-8 w-10 text-center text-white focus:outline-none bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800 transition-colors duration-200 outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 border border-green-800 dark:border-green-700 hover:scale-105 hover:opacity-90 transition-transform"
        onClick=${() => {
            refresh()              
        }}
    >
        🔄 
    </button>
    `
}