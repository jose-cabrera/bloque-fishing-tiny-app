import { html } from "../../utils/html"

export const Loading = () => {
    return html`
    <div class="flex z-10 justify-center items-center h-full w-full">
        <div class="flex items-center justify-center bg-gray-500/30 rounded-full w-32 h-32">
            <img src="icons/bloque.svg" alt="Loading" class="loader " />
        </div>
    </div> 
    `
}