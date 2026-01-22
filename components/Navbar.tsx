
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletState } from '../types';

interface NavbarProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ wallet, onConnect, onDisconnect }) => {
  const location = useLocation();

  // ---------------------------------------------------------------------------
  // PUT YOUR TWITTER LINK HERE
  // ---------------------------------------------------------------------------
  const TWITTER_LINK = "https://x.com/gaspad_sol"; 

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0F13]/60 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A1F] to-[#4FD1FF]">
              GASPAD
            </span>
            <span className="text-[10px] text-[#9BA1A6] uppercase tracking-widest -mt-1 font-medium">
              AI-Curated Solana Launchpad
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/launch" 
              className={`text-sm font-orbitron transition-colors ${location.pathname === '/launch' ? 'text-[#FF9A1F]' : 'text-[#9BA1A6] hover:text-white'}`}
            >
              Launch Coin
            </Link>
            <Link 
              to="/launches" 
              className={`text-sm font-orbitron transition-colors ${location.pathname === '/launches' ? 'text-[#FF9A1F]' : 'text-[#9BA1A6] hover:text-white'}`}
            >
              Latest Launches
            </Link>
            <Link 
              to="/docs" 
              className={`text-sm font-orbitron transition-colors ${location.pathname === '/docs' ? 'text-[#4FD1FF]' : 'text-[#9BA1A6] hover:text-white'}`}
            >
              Docs
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-2 mr-2">
            <a 
              href={TWITTER_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F8F9FA] hover:text-[#FF9A1F] hover:border-[#FF9A1F]/30 hover:bg-[#FF9A1F]/5 transition-all group"
              title="Follow us on X"
            >
              <span className="text-xl font-bold group-hover:scale-110 transition-transform">𝕏</span>
            </a>
          </div>

          {wallet.isConnected ? (
            <button 
              onClick={onDisconnect}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF9A1F]/30 bg-[#FF9A1F]/10 text-[#FF9A1F] font-orbitron text-sm hover:bg-[#FF9A1F]/20 transition-all neon-glow-amber"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF9A1F] animate-pulse"></div>
              {wallet.address?.slice(0, 4)}...{wallet.address?.slice(-3)}
            </button>
          ) : (
            <button 
              onClick={onConnect}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF9A1F] to-[#FF9A1F]/80 text-black font-orbitron text-sm font-bold hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
