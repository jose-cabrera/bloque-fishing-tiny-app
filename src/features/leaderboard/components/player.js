import { html } from "../../../utils/html"

export const Player = ({player}) => {
    return html`
    <div key=${player.username} class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex flex-col space-y-1">
        <div class="flex flex-row justify-between text-gray-900 dark:text-gray-100 font-semibold text-base">
            <span>#${player.rank} — ${player.username}</span><span>Level ${player.level}</span>
        </div>
        <div class="flex flex-row justify-between text-gray-600 dark:text-gray-400 text-sm">
            <span>💰: <span class="text-yellow-500">${player.gold.toLocaleString()}</span></span><span>🧠: ${player.xp.toLocaleString()}</span>
        </div>
        <div class="text-base">
            ${player.fishEmojis} <span class="text-xs text-gray-600 dark:text-gray-400">(${player.emojiDescription})</span>
            ${player.isInfected ? html`<span class="text-red-500 ml-2">☣️ Infected</span>` : ''}
        </div>
    </div>    
    `
}