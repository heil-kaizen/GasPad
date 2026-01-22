
import React from 'react';
import { WalletType } from '../types';

interface WalletModalProps {
  onClose: () => void;
  onSelect: (type: WalletType) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative glass-card w-full max-w-sm rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(255,154,31,0.1)] bg-[#0E0F13]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-orbitron font-black text-[#F8F9FA] uppercase tracking-tighter">Connect Wallet</h3>
          <button onClick={onClose} className="text-[#9BA1A6] hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onSelect('phantom')}
            className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#FF9A1F]/50 hover:bg-[#FF9A1F]/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#AB9FF2]/20 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://avatars.githubusercontent.com/u/78782331?v=4" 
                  alt="Phantom" 
                  className="w-full h-full object-cover scale-110" 
                />
              </div>
              <span className="font-orbitron text-[#F8F9FA]">Phantom</span>
            </div>
            <span className="text-[10px] font-orbitron text-[#9BA1A6]/40 group-hover:text-[#FF9A1F]">AUTO-DETECT</span>
          </button>

          <button 
            onClick={() => onSelect('solflare')}
            className="w-full group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#4FD1FF]/50 hover:bg-[#4FD1FF]/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FC8B19]/20 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg" 
                  alt="Solflare" 
                  className="w-full h-full object-contain p-1.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://solflare.com/favicon.ico';
                  }}
                />
              </div>
              <span className="font-orbitron text-[#F8F9FA]">Solflare</span>
            </div>
            <span className="text-[10px] font-orbitron text-[#9BA1A6]/40 group-hover:text-[#4FD1FF]">SUPPORTED</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-[#9BA1A6]/40 font-orbitron uppercase mt-8 tracking-widest leading-loose">
          By connecting your wallet, you agree to GasPad's <br />
          <span className="text-[#9BA1A6] underline cursor-pointer">Terms of Service</span> and <span className="text-[#9BA1A6] underline cursor-pointer">Privacy Protocol</span>.
        </p>
      </div>
    </div>
  );
};

export default WalletModal;
