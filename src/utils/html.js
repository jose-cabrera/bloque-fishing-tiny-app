import { h } from "preact";
import htm from "htm";

// Bind htm to preact's h function (singleton)
export const html = htm.bind(h);
