import { render } from "preact";
import "./index.css";
import App from "./app.js";
import { html } from "./utils/html.js";
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

render(html`
    <${QueryClientProvider} client=${queryClient}>
        <${App} />
    <//>
    `, document.getElementById("app"));

