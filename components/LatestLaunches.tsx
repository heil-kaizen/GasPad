
import React, { useState, useEffect, useMemo } from 'react';
import { Coin } from '../types';

interface LatestLaunchesProps {
  launches: Coin[];
  title?: string;
}

const TradingChart: React.FC<{ color: string }> = ({ color }) => {
  const [points, setPoints] = useState<number[]>([]);
  
  useEffect(() => {
    const initialPoints = Array.from({ length: 40 }, (_, i) => 
      30 + Math.random() * 40 + (i * 0.5)
    );
    setPoints(initialPoints);

    const interval = setInterval(() => {
      setPoints(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(10, last + (Math.random() - 0.45) * 5);
        return [...prev.slice(1), next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const pathData = useMemo(() => {
    if (points.length === 0) return "";
    const width = 1000;
    const height = 200;
    const step = width / (points.length - 1);
    
    return points.reduce((acc, p, i) => {
      const x = i * step;
      const y = height - (p / 100) * height;
      return acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }, "");
  }, [points]);

  return (
    <div className="relative w-full h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden group">
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
      </div>
      <div className="absolute inset-0 flex justify-between p-4 opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => <div key={i} className="h-full w-px bg-white"></div>)}
      </div>

      <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={`${pathData} L 1000 200 L 0 200 Z`}
          fill="url(#chartGradient)"
          className="transition-all duration-1000 ease-linear"
        />
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          filter="url(#glow)"
          className="transition-all duration-1000 ease-linear"
        />
        {points.length > 0 && (
          <circle 
            cx="1000" 
            cy={200 - (points[points.length - 1] / 100) * 200} 
            r="4" 
            fill={color}
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
};

const ProtocolModal: React.FC<{ coin: Coin; onClose: () => void }> = ({ coin, onClose }) => {
  const stats = useMemo(() => ({
    price: (0.000042 + Math.random() * 0.0001).toFixed(8),
    mcap: (Math.random() * 50000 + 15000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    holders: Math.floor(Math.random() * 400 + 12),
    volume: (Math.random() * 10000 + 500).toLocaleString(undefined, { maximumFractionDigits: 2 }),
  }), [coin.id]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-card w-full max-w-4xl rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(79,209,255,0.1)]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-[#16171D] relative">
               <div className="absolute inset-0 bg-[radial-gradient(#FF9A1F_1px,transparent_1px)] [background-size:10px_10px] opacity-10"></div>
               <img 
                src={coin.imageUrl} 
                alt={coin.name} 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-black font-orbitron text-[#F8F9FA] leading-none mb-1">{coin.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-[#FF9A1F] font-mono font-black tracking-widest uppercase text-sm">${coin.ticker}</span>
                <span className="px-2 py-0.5 rounded bg-[#4FD1FF]/10 text-[#4FD1FF] text-[10px] font-bold border border-[#4FD1FF]/20">AI AUDITED</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#9BA1A6] hover:text-white transition-all">✕</button>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono font-bold text-[#F8F9FA]">${stats.price}</div>
                <div className="text-xs font-bold text-[#4FD1FF] bg-[#4FD1FF]/10 px-2 py-1 rounded">+12.4%</div>
              </div>
              <div className="flex gap-2">
                {['1H', '4H', '1D', '1W'].map(t => (
                  <button key={t} className={`px-3 py-1 rounded text-[10px] font-orbitron border ${t === '1H' ? 'border-[#FF9A1F] text-[#FF9A1F]' : 'border-white/5 text-[#9BA1A6]'}`}>{t}</button>
                ))}
              </div>
            </div>
            <TradingChart color={Math.random() > 0.5 ? "#FF9A1F" : "#4FD1FF"} />
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-[#9BA1A6] font-orbitron uppercase mb-1">Market Cap</p>
                <p className="text-lg font-mono font-bold text-white">${stats.mcap}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-[#9BA1A6] font-orbitron uppercase mb-1">24h Volume</p>
                <p className="text-lg font-mono font-bold text-white">${stats.volume}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-[#9BA1A6] font-orbitron uppercase mb-1">Holders</p>
                <p className="text-lg font-mono font-bold text-white">{stats.holders}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#FF9A1F]/5 border border-[#FF9A1F]/10">
              <h4 className="text-xs font-orbitron font-bold text-[#FF9A1F] mb-4 uppercase tracking-widest">Gas Intelligence Report</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/60 font-orbitron">Safety Score</span>
                  <span className="text-sm font-mono font-bold text-[#FF9A1F]">{coin.aiScore}/100</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9A1F]" style={{ width: `${coin.aiScore}%` }}></div>
                </div>
                <p className="text-[11px] text-[#9BA1A6] italic leading-relaxed">
                  "Core protocol architecture remains stable. Social sentiment shows organic clustering patterns. Verified for cross-chain liquidity deployment."
                </p>
              </div>
            </div>
            <div className="space-y-3">
               <p className="text-[10px] text-[#9BA1A6] font-orbitron uppercase tracking-widest">Protocol Links</p>
               <button className="w-full p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-[#F8F9FA] hover:bg-white/10 transition-all">
                <span>View on Solscan</span>
                <span className="opacity-40">↗</span>
               </button>
            </div>
            <div className="pt-4">
               <button className="w-full py-4 rounded-xl bg-[#4FD1FF] text-black font-orbitron font-black text-sm uppercase shadow-[0_0_30px_rgba(79,209,255,0.2)] hover:scale-[1.02] transition-all active:scale-95">
                  Swap Tokens
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestLaunches: React.FC<LatestLaunchesProps> = ({ launches, title = "Latest Gas-Verified Launches" }) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  return (
    <section className="container mx-auto px-4 py-24" id="launches">
      <div className="flex items-center gap-6 mb-16 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-black font-orbitron uppercase tracking-tighter text-[#F8F9FA] whitespace-nowrap">
          {title}
        </h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-[#FF9A1F] to-transparent"></div>
      </div>

      {launches.length === 0 ? (
        <div className="glass-card p-24 rounded-3xl text-center border-dashed border-2 border-white/5 bg-black/40">
          <p className="text-[#9BA1A6]/40 font-orbitron text-xl italic tracking-widest">
            WAITING FOR NEURAL SIGNALS...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {launches.map((coin) => (
            <div 
              key={coin.id} 
              className="group relative glass-card rounded-2xl overflow-hidden hover:translate-y-[-8px] transition-all duration-500 border border-white/5 hover:border-[#FF9A1F]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Image Container with Fallback CSS Grid */}
              <div className="h-56 overflow-hidden relative bg-[#16171D]">
                {/* Cyberpunk Grid Fallback */}
                <div className="absolute inset-0 bg-[radial-gradient(#FF9A1F_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9A1F]/5 via-transparent to-[#4FD1FF]/5"></div>
                
                <img 
                  src={coin.imageUrl} 
                  alt={coin.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 relative z-10" 
                  onError={(e) => {
                    // If image fails, hide it and show the grid
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F13] via-transparent to-transparent z-20"></div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-30">
                   <span className="bg-black/80 backdrop-blur-md border border-[#FF9A1F]/30 px-3 py-1 rounded-sm text-[10px] font-orbitron text-[#FF9A1F] font-bold">
                    GAS SCORE: {coin.aiScore}/100
                  </span>
                  <span className="bg-[#FF9A1F] px-2 py-0.5 rounded-sm text-[9px] font-orbitron text-black font-black tracking-tighter">
                    VERIFIED
                  </span>
                </div>
              </div>

              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-orbitron font-black text-[#F8F9FA] leading-none mb-2 uppercase tracking-tight group-hover:text-[#FF9A1F] transition-colors">{coin.name}</h3>
                    <p className="text-sm text-[#FF9A1F] font-mono font-black tracking-[0.2em] uppercase">${coin.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#9BA1A6]/60 font-orbitron tracking-widest uppercase">STAMP</p>
                    <p className="text-xs text-[#F8F9FA]/60 font-mono">
                      {new Date(coin.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#9BA1A6] mb-8 line-clamp-2 font-inter leading-relaxed italic opacity-80 h-10">
                  {coin.description}
                </p>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#9BA1A6]/40 font-orbitron uppercase tracking-widest mb-1">Architect</span>
                    <span className="text-xs font-mono text-[#4FD1FF] font-bold">{coin.creator.slice(0, 6)}...{coin.creator.slice(-4)}</span>
                  </div>
                  <div className="flex gap-3">
                    {coin.socials.twitter && (
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-[#9BA1A6] hover:text-[#FF9A1F] hover:bg-[#FF9A1F]/10 transition-all cursor-pointer text-lg font-bold">
                        𝕏
                      </div>
                    )}
                    {coin.socials.telegram && (
                      <div className="w-9 h-9 p-2 rounded-lg bg-white/5 border border-white/10 text-[#9BA1A6] hover:text-[#4FD1FF] hover:bg-[#4FD1FF]/10 transition-all cursor-pointer flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.235 8.16l-1.802 8.49c-.135.61-.497.758-1.006.474l-2.744-2.022-1.324 1.274c-.146.146-.269.269-.553.269l.197-2.793 5.084-4.593c.221-.197-.048-.306-.344-.11l-6.284 3.957-2.706-.845c-.588-.184-.6-.588.123-.871l10.569-4.072c.489-.184.917.11.789.846z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedCoin(coin)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-orbitron text-xs font-black text-[#F8F9FA] tracking-[0.2em] uppercase hover:bg-[#FF9A1F] hover:text-black hover:border-transparent transition-all active:scale-95 shadow-xl"
                >
                  Inspect Protocol
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCoin && <ProtocolModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />}
    </section>
  );
};

export default LatestLaunches;
