import { html } from "../../../utils/html"

export const MarketItem = ({item}) => { 
    return html`
        <div key=${item.id} class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-md">
            <div class="flex justify-between items-center mb-1">
                <span class="font-semibold text-gray-900 dark:text-gray-100 text-base">${item.name}</span>
                <span class="text-yellow-500 font-semibold">💰 ${item.cost.toLocaleString()}</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm">${item.description}</p>
        </div>
    `
}