
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LaunchCoin from './components/LaunchCoin';
import LatestLaunches from './components/LatestLaunches';
import WalletModal from './components/WalletModal';
import Docs from './components/Docs';
import { Coin, WalletState, WalletType } from './types';

const DEFAULT_LAUNCHES: Coin[] = [
  {
    id: 'genesis-1',
    name: 'TEST PAD',
    ticker: 'TEST',
    description: 'TESTING GASPAD LAUNCH',
    imageUrl: 'https://raw.githubusercontent.com/heil-kaizen/GasPad/main/GasPad.png',
    creator: '8fGxGASPADv1kL9',
    timestamp: Date.now() - 3600000,
    socials: { twitter: 'https://x.com/gaspad_sol', telegram: 'https://t.me' },
    aiScore: 98,
    supply: '1000000000',
    decimals: 9
  },
  {
    id: 'genesis-2',
    name: 'GAS PAD',
    ticker: 'GAS',
    description: 'TESTING GASPAD LAUNCH',
    imageUrl: 'https://raw.githubusercontent.com/heil-kaizen/GasPad/main/GasPad.png',
    creator: '3vPrAGENCYmQ2',
    timestamp: Date.now() - 7200000,
    socials: { twitter: 'https://x.com/gaspad_sol', telegram: 'https://t.me' },
    aiScore: 94,
    supply: '1000000000',
    decimals: 9
  }
];

const PriceTicker: React.FC = () => {
  const [prices, setPrices] = useState({
    sol: 126.49,
    btc: 88856.00,
    eth: 2995.27
  });

  const fetchRealPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum&vs_currencies=usd');
      const data = await response.json();
      if (data.solana && data.bitcoin && data.ethereum) {
        setPrices({
          sol: data.solana.usd,
          btc: data.bitcoin.usd,
          eth: data.ethereum.usd
        });
      }
    } catch (err) {
      console.warn("Market data fetch failed, using internal simulation.", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRealPrices();

    // Poll real API every 60 seconds (respecting free tier limits)
    const apiInterval = setInterval(fetchRealPrices, 60000);

    // Visual Jitter: subtly update every 3 seconds for a "live" feel
    const jitterInterval = setInterval(() => {
      setPrices(prev => ({
        sol: prev.sol + (Math.random() - 0.5) * 0.02,
        btc: prev.btc + (Math.random() - 0.5) * 1,
        eth: prev.eth + (Math.random() - 0.5) * 0.1
      }));
    }, 3000);

    return () => {
      clearInterval(apiInterval);
      clearInterval(jitterInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="glass-card px-4 py-1.5 rounded-lg border border-white/10 flex items-center gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] animate-[fadeIn_0.5s_ease-out]">
        {/* Solana */}
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM6.5 102.7h317.4c3.5 0 6.8-1.4 9.2-3.8l62.7-62.7c4.1-4.1 1.2-11.1-4.6-11.1H73.8c-3.5 0-6.8 1.4-9.2 3.8L1.9 91.6c-4.1 4.1-1.2 11.1 4.6 11.1zM323.9 133.4c-2.4-2.4-5.7-3.8-9.2-3.8H37.3c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="url(#sol_grad_mini_right)"/>
            <defs>
              <linearGradient id="sol_grad_mini_right" x1="14.3" y1="13" x2="382.4" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFA3"/>
                <stop offset="1" stopColor="#DC1FFF"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-[#14F195] font-mono font-bold text-xs tracking-tight">
            ${prices.sol.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="w-px h-3 bg-white/10"></div>

        {/* Bitcoin */}
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#F7931A] flex items-center justify-center text-[8px] font-bold text-black">₿</div>
          <span className="text-[#FFB800] font-mono font-bold text-xs tracking-tight">
            ${prices.btc.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>

        <div className="w-px h-3 bg-white/10"></div>

        {/* Ethereum */}
        <div className="flex items-center gap-1.5">
          <svg width="8" height="12" viewBox="0 0 784 1277" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M392.07 0L383.5 29.11V870.39L392.07 879L784.13 647.38L392.07 0Z" fill="#C0C0C0"/>
            <path d="M392.07 0L0 647.38L392.07 879V470.19V0Z" fill="white"/>
            <path d="M392.07 950.51L387.26 956.36V1265.46L392.07 1277L784.37 723.1L392.07 950.51Z" fill="#C0C0C0"/>
            <path d="M392.07 1277V950.51L0 723.1L392.07 1277Z" fill="white"/>
          </svg>
          <span className="text-[#4FD1FF] font-mono font-bold text-xs tracking-tight">
            ${prices.eth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    type: null,
    isConnected: false,
  });
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [launches, setLaunches] = useState<Coin[]>([]);

  // ---------------------------------------------------------------------------
  // PUT YOUR TWITTER LINK HERE
  // ---------------------------------------------------------------------------
  const TWITTER_LINK = "https://x.com/GasPad";

  // Load launches from localStorage or use defaults
  useEffect(() => {
    // Changed storage key to gaspad_launches
    const saved = localStorage.getItem('gaspad_launches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLaunches(parsed);
        } else {
          setLaunches(DEFAULT_LAUNCHES);
        }
      } catch (e) {
        setLaunches(DEFAULT_LAUNCHES);
      }
    } else {
      setLaunches(DEFAULT_LAUNCHES);
      localStorage.setItem('gaspad_launches', JSON.stringify(DEFAULT_LAUNCHES));
    }
  }, []);

  const connectWallet = async (type: WalletType) => {
    const win = window as any;
    
    try {
      if (type === 'phantom') {
        const provider = win.phantom?.solana || win.solana;
        if (provider?.isPhantom) {
          const response = await provider.connect();
          setWallet({
            address: response.publicKey.toString(),
            type: 'phantom',
            isConnected: true,
          });
          setIsWalletModalOpen(false);
          return;
        }
      }

      if (type === 'solflare') {
        const provider = win.solflare;
        if (provider) {
          await provider.connect();
          setWallet({
            address: provider.publicKey.toString(),
            type: 'solflare',
            isConnected: true,
          });
          setIsWalletModalOpen(false);
          return;
        }
      }

      const mockAddress = '8fGx' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'kL9';
      setWallet({
        address: mockAddress,
        type: type || 'phantom',
        isConnected: true
      });
      setIsWalletModalOpen(false);
      
    } catch (err: any) {
      console.error("Wallet connection error:", err);
      if (err?.code === 4001) {
        setIsWalletModalOpen(false);
      } else {
        const mockAddress = '8fGx' + Math.random().toString(36).substring(2, 8).toUpperCase() + 'kL9';
        setWallet({ address: mockAddress, type: type || 'phantom', isConnected: true });
        setIsWalletModalOpen(false);
      }
    }
  };

  const disconnectWallet = () => {
    setWallet({ address: null, type: null, isConnected: false });
  };

  const handleNewLaunch = (coin: Coin) => {
    const updated = [coin, ...launches];
    setLaunches(updated);
    localStorage.setItem('gaspad_launches', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="min-h-screen relative bg-[#0E0F13] pb-24">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF9A1F]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4FD1FF]/5 rounded-full blur-[120px]"></div>
        </div>

        <Navbar 
          wallet={wallet} 
          onConnect={() => setIsWalletModalOpen(true)} 
          onDisconnect={disconnectWallet}
        />

        <main className="relative z-10 pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Hero onLaunchClick={() => {}} />
                <LatestLaunches launches={launches.slice(0, 6)} />
              </>
            } />
            <Route path="/launch" element={
              <LaunchCoin 
                wallet={wallet} 
                onConnect={() => setIsWalletModalOpen(true)} 
                onSuccess={handleNewLaunch}
              />
            } />
            <Route path="/launches" element={
              <div className="container mx-auto px-4 py-12">
                <LatestLaunches launches={launches} title="All Gas-Verified Launches" />
              </div>
            } />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>

        <footer className="relative z-10 py-12 border-t border-white/5 bg-black/20 backdrop-blur-md mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center gap-6 mb-8">
               <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="text-[#9BA1A6] hover:text-[#FF9A1F] transition-colors">
                 <span className="text-xl font-bold">𝕏</span>
               </a>
            </div>
            <p className="text-[#9BA1A6] text-sm font-orbitron">
              GASPAD © 2024 • AI-CURATED SOLANA ECOSYSTEM
            </p>
            <p className="text-xs text-white/10 mt-2">
              Cyberpunk Alpha Environment • Persistent Storage Enabled
            </p>
          </div>
        </footer>

        <PriceTicker />

        {isWalletModalOpen && (
          <WalletModal 
            onClose={() => setIsWalletModalOpen(false)} 
            onSelect={connectWallet} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;
