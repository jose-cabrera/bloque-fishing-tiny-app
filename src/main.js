import { render } from "preact";
import "./index.css";
import App from "./app.js";
import { html } from "./utils/html.js";

render(html`<${App} />`, document.getElementById("app"));
