
# GasPad | AI-Curated Solana Launchpad

![GasPad Banner](https://raw.githubusercontent.com/heil-kaizen/GasPad/main/GasPad.png)

**GasPad** is a next-generation Solana launchpad simulation featuring a high-fidelity **Cyberpunk / Anime aesthetic**. It simulates the experience of launching and trading tokens with an AI-driven verification layer ("Gas AI").

## ⚡ Features

- **AI Verification Protocol**: Simulates real-time AI analysis of token metadata, visuals, and social signals.
- **Launch Simulation**: Step-by-step process to deploy a token, including image upload, ticker generation, and AI scoring.
- **Live Market Data**: Real-time crypto price ticker (SOL, BTC, ETH) powered by CoinGecko (with fallback simulation).
- **Interactive Dashboard**: Glassmorphic UI with animated charts, holographic effects, and neon glowing borders.
- **Wallet Integration**: Simulated connection flow for Phantom and Solflare wallets.
- **Responsive Design**: Fully optimized for desktop and mobile with a fluid, app-like experience.

## 🎨 Aesthetic & Design

The UI is built around a **"Cyberpunk 2077 meets Anime"** theme:

- **Typography**: *Plus Jakarta Sans* (Headings) & *Inter* (Body).
- **Palette**: Neon Purple (`#D946EF`), Electric Cyan (`#06B6D4`), and Deep Zinc (`#0E0F13`).
- **Effects**: Glassmorphism (backdrop-blur), CSS animations (float, pulse, glow), and holographic grid backgrounds.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Routing**: React Router DOM
- **Bundling**: ES Modules (via `esm.sh` - no build step required for dev)

## 🚀 Getting Started

This project is designed to run directly in the browser using ES Modules.

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox).
- (Optional) VS Code with "Live Server" extension or Node.js.

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gaspad.git
   cd gaspad
   ```

2. **Serve the files**
   You can use any static file server.

   *Using Python:*
   ```bash
   python3 -m http.server 8000
   ```

   *Using Node.js (npx):*
   ```bash
   npx serve
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8000` (or the port shown in your terminal).

## 📂 Project Structure

```
├── components/       # UI Components (Hero, Navbar, WalletModal, etc.)
├── types.ts          # TypeScript interfaces
├── App.tsx           # Main application logic
├── index.tsx         # Entry point
└── index.html        # HTML shell & Import maps
```

## 🛡️ License

This project is licensed under the MIT License.

---


