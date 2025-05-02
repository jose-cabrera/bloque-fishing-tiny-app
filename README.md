# 🐟 Bloque Fishing Leader Market

A lightweight PWA web app that displays the **leaderboard** and **marketplace** for the [Bloque Fishing Game](https://bloque.app).  
Designed to be **ultra-small**, fast, and mobile-friendly.

![Live App](https://img.shields.io/website?url=https%3A%2F%2Fbloque-fishing.web.app&label=Live%20App)
![License](https://img.shields.io/github/license/josecabrera/bloque-fishing-leader-market)
![Preact](https://img.shields.io/badge/Preact-10.x-blue.svg?logo=preact)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.x-yellow?logo=vite)
![Firebase](https://img.shields.io/badge/Hosted%20on-Firebase-orange?logo=firebase)
![PWA](https://img.shields.io/badge/PWA-enabled-green?logo=pwa)

---

## 🛠 Tech Stack

- ⚛️ [Preact](https://preactjs.com/) — tiny React alternative
- 💡 [HTM](https://github.com/developit/htm) — JSX-like templating for Preact
- 🎨 [TailwindCSS](https://tailwindcss.com/) — utility-first styling
- ⚡ [Vite](https://vitejs.dev/) — lightning-fast dev/build tool
- 🧱 Firebase Hosting — deploy & serve as a PWA

---

## 🎯 Features

- 🏆 Leaderboard with real-time data and offline fallback (IndexedDB)
- 🛒 Marketplace view with search
- 🔁 Manual refresh support
- 📱 Fully responsive design
- 🚀 PWA support for offline access and installability
- 🎯 Fully optimized for minimal size
- 🌓 Supports both light and dark mode automatically

---

## 📦 Current Bundle Size

| File                          | Size     | Gzipped    |
|------------------------------|----------|------------|
| `dist/registerSW.js`         | 0.13 kB  | —          |
| `dist/manifest.webmanifest`  | 0.34 kB  | —          |
| `dist/index.html`            | 1.12 kB  | 0.51 kB    |
| `dist/assets/index.css`      | 19.17 kB | 4.61 kB    |
| `dist/assets/index.js`       | 24.82 kB | 9.23 kB    |

> 🎯 **Total gzipped size:** ~14.58 KB  
> One of the smallest full-featured PWA UIs 🚀

---

## 🚀 Deployment

The app is deployed and served via [Firebase Hosting](https://firebase.google.com/products/hosting).  
✅ **Live demo:** [https://bloque-fishing.web.app](https://bloque-fishing.web.app)

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```