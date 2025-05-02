import { html } from "../../utils/html"

export const SearchBar = ({searchTerm, setSearchTerm, placeholder}) => {
    return html`
    <input 
        type="text" 
        placeholder=${placeholder} 
        class="text-base w-full p-2 rounded-md border border-green-800 dark:border-green-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
        value=${searchTerm}
        onInput=${(e) => setSearchTerm(e.target.value)}
    />
    `
}