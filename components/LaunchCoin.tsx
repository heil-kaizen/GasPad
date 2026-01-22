
import React, { useState, useRef, useMemo } from 'react';
import { Coin, WalletState } from '../types';

interface LaunchCoinProps {
  wallet: WalletState;
  onConnect: () => void;
  onSuccess: (coin: Coin) => void;
}

const LaunchCoin: React.FC<LaunchCoinProps> = ({ wallet, onConnect, onSuccess }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [step, setStep] = useState(0); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    image: null as File | null,
    imageUrl: '',
    telegram: '',
    twitter: '',
    website: '',
    supply: '1000000000',
    decimals: 9,
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const scoreMetrics = useMemo(() => {
    const metadata = (formData.name ? 15 : 0) + (formData.ticker ? 10 : 0) + (formData.description.length > 10 ? 20 : 0);
    const visuals = formData.image ? 25 : 0;
    const socials = (formData.twitter ? 10 : 0) + (formData.telegram ? 10 : 0) + (formData.website ? 10 : 0);
    
    return {
      metadata,
      visuals,
      socials,
      total: metadata + visuals + socials
    };
  }, [formData]);

  const recommendations = useMemo(() => {
    const list = [];
    if (!formData.name || !formData.ticker) list.push("Initialize core naming protocol (Name/Ticker).");
    if (formData.description.length < 20) list.push("Expand project manifesto to increase neural resonance.");
    if (!formData.image) list.push("Upload visual identity asset for retinal verification.");
    if (!formData.twitter || !formData.telegram) list.push("Bridge social uplinks (X/TG) to establish community swarm.");
    if (list.length === 0) return ["All systems nominal. Ready for decentralized deployment."];
    return list;
  }, [formData]);

  const aiMessage = useMemo(() => {
    const score = scoreMetrics.total;
    if (score < 20) return "Awaiting neural sync... Please input core metadata.";
    if (score < 50) return "Signatures detected. Processing tokenomics hierarchy...";
    if (score < 80) return "Structural integrity verified. Analyzing community reach...";
    if (score < 100) return "Launch vectors aligned. Finalizing AI audit reports...";
    return "Maximum resonance achieved. Gas AI recommends immediate deployment.";
  }, [scoreMetrics.total]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ 
        ...formData, 
        image: file, 
        imageUrl: URL.createObjectURL(file) 
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.isConnected) {
      onConnect();
      return;
    }

    if (!formData.image) {
      alert("Please upload a token image.");
      return;
    }

    setIsLaunching(true);
    setStep(1);

    try {
      // Convert to base64 for persistence
      const base64Image = await fileToBase64(formData.image);
      
      setTimeout(() => {
        setStep(2);
        setTimeout(() => {
          const newCoin: Coin = {
            id: Math.random().toString(36).substring(7),
            name: formData.name,
            ticker: formData.ticker.toUpperCase(),
            description: formData.description,
            imageUrl: base64Image,
            creator: wallet.address!,
            timestamp: Date.now(),
            socials: {
              telegram: formData.telegram,
              twitter: formData.twitter,
              website: formData.website,
            },
            aiScore: 85 + Math.floor(Math.random() * 15),
            supply: formData.supply,
            decimals: formData.decimals,
          };
          onSuccess(newCoin);
          setStep(3);
          setIsLaunching(false);
        }, 2000);
      }, 1500);
    } catch (err) {
      console.error("Image processing failed", err);
      setIsLaunching(false);
      setStep(0);
    }
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto glass-card p-12 rounded-3xl neon-border-anim">
          <div className="neon-border-inner flex flex-col items-center p-8">
            <div className="w-20 h-20 bg-[#FF9A1F]/20 text-[#FF9A1F] rounded-full flex items-center justify-center mb-6 neon-glow-amber text-4xl">
              ✓
            </div>
            <h2 className="text-3xl font-black font-orbitron mb-4 text-[#F8F9FA]">SUCCESSFULLY DEPLOYED</h2>
            <p className="text-[#9BA1A6] mb-8 font-orbitron text-sm">
              Your coin has been verified by Gas AI and launched on GasPad.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#9BA1A6] uppercase font-orbitron mb-1">Mint Address</p>
                <p className="text-xs text-[#4FD1FF] break-all font-mono">GAS{Math.random().toString(36).substring(2, 18).toUpperCase()}pad</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#9BA1A6] uppercase font-orbitron mb-1">Launch Time</p>
                <p className="text-xs text-white/80 font-mono">{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-[#FF9A1F]/10 border border-[#FF9A1F]/30 p-4 rounded-xl text-[#FF9A1F] text-xs mb-8 text-center">
              🛡️ PROJECT SAVED TO LOCAL STORAGE PERSISTENCE
            </div>

            <button 
              onClick={() => window.location.hash = '#/'}
              className="w-full py-4 rounded-xl bg-[#FF9A1F] font-orbitron font-bold text-black hover:opacity-90 transition-all active:scale-95"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1 || step === 2) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto glass-card p-12 rounded-3xl">
          <div className="mb-8">
            <div className="w-16 h-16 border-4 border-[#FF9A1F] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-orbitron font-bold mb-2 text-[#F8F9FA]">
              {step === 1 ? 'GAS AI VALIDATING...' : 'MINTING TOKEN...'}
            </h3>
            <p className="text-[#9BA1A6] text-sm">
              {step === 1 ? 'Running security audits and metadata check.' : 'Finalizing decentralized launch on GasPad.'}
            </p>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
            <div className="bg-[#FF9A1F] h-full transition-all duration-500" style={{ width: step === 1 ? '40%' : '85%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-3xl font-black font-orbitron mb-8 flex items-center gap-3">
            <span className="text-[#FF9A1F]">01</span> Launch New Token
          </h2>

          <form onSubmit={handleLaunch} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-orbitron text-[#9BA1A6] uppercase mb-2">Coin Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[#F8F9FA] focus:outline-none focus:border-[#FF9A1F] transition-colors"
                  placeholder="e.g. Gas AI"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-orbitron text-[#9BA1A6] uppercase mb-2">Ticker (Max 5)</label>
                <input 
                  type="text" 
                  required
                  maxLength={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[#F8F9FA] focus:outline-none focus:border-[#FF9A1F] transition-colors font-mono"
                  placeholder="GAS"
                  value={formData.ticker}
                  onChange={e => setFormData({...formData, ticker: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-[#9BA1A6] uppercase mb-2">Description</label>
              <textarea 
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[#F8F9FA] focus:outline-none focus:border-[#FF9A1F] transition-colors"
                placeholder="Tell us about your project..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-orbitron text-[#9BA1A6] uppercase mb-2">Token Image</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-6 py-2.5 rounded-full bg-[#FF9A1F]/10 border border-[#FF9A1F]/30 text-[#FF9A1F] font-orbitron text-xs font-bold hover:bg-[#FF9A1F]/20 transition-all active:scale-95"
                >
                  Choose File
                </button>
                <span className="text-xs text-[#9BA1A6] font-inter truncate max-w-[200px]">
                  {formData.image ? formData.image.name : 'No file chosen'}
                </span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-orbitron text-[#9BA1A6] uppercase mb-2">Twitter (X)</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-[#F8F9FA]" placeholder="https://..." value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-orbitron text-[#9BA1A6] uppercase mb-2">Telegram</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-[#F8F9FA]" placeholder="https://..." value={formData.telegram} onChange={e => setFormData({...formData, telegram: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-orbitron text-[#9BA1A6] uppercase mb-2">Website</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-[#F8F9FA]" placeholder="https://..." value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLaunching}
              className="w-full py-4 rounded-xl bg-[#FF9A1F] text-black font-orbitron font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,154,31,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLaunching ? 'Deploying...' : wallet.isConnected ? 'Create Coin' : 'Connect Wallet to Launch'}
            </button>
          </form>
        </div>

        <div className="sticky top-28 space-y-6">
          <h2 className="text-3xl font-black font-orbitron mb-8 flex items-center gap-3">
            <span className="text-[#4FD1FF]">02</span> Live Preview
          </h2>

          <div className="glass-card rounded-3xl p-1 bg-gradient-to-br from-[#FF9A1F]/20 to-[#4FD1FF]/20">
            <div className="bg-[#0E0F13] rounded-[22px] overflow-hidden">
              <div className="relative h-80 bg-black/20 flex items-center justify-center overflow-hidden">
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="text-white/5 text-6xl font-orbitron font-bold tracking-tighter opacity-20 rotate-[-15deg]">
                    GASPAD
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-orbitron text-[#FF9A1F]">
                  GAS SCORE: {scoreMetrics.total}/100
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-orbitron font-black text-[#F8F9FA]">{formData.name || 'Token Name'}</h3>
                    <p className="text-[#FF9A1F] font-mono font-bold tracking-widest uppercase">${formData.ticker || 'TICKER'}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span 
                      className={`transition-all duration-300 text-3xl font-bold ${formData.twitter ? 'text-[#FF9A1F] scale-110 drop-shadow-[0_0_8px_rgba(255,154,31,0.6)]' : 'text-white/5 opacity-40'}`}
                      title="Twitter / X"
                    >
                      𝕏
                    </span>
                    <div 
                      className={`transition-all duration-300 w-8 h-8 ${formData.telegram ? 'text-[#FF9A1F] scale-110 drop-shadow-[0_0_8px_rgba(255,154,31,0.6)]' : 'text-white/5 opacity-40'}`}
                      title="Telegram"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0C5.346 0 0 5.346 0 11.944s5.346 11.944 11.944 11.944 11.944-5.346 11.944-11.944S18.542 0 11.944 0zm5.235 8.16l-1.802 8.49c-.135.61-.497.758-1.006.474l-2.744-2.022-1.324 1.274c-.146.146-.269.269-.553.269l.197-2.793 5.084-4.593c.221-.197-.048-.306-.344-.11l-6.284 3.957-2.706-.845c-.588-.184-.6-.588.123-.871l10.569-4.072c.489-.184.917.11.789.846z"/>
                      </svg>
                    </div>
                    <span 
                      className={`transition-all duration-300 text-3xl ${formData.website ? 'text-[#FF9A1F] scale-110 drop-shadow-[0_0_8px_rgba(255,154,31,0.6)]' : 'text-white/5 opacity-40'}`}
                      title="Website"
                    >
                      🌐
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#9BA1A6] line-clamp-3 italic">
                  "{formData.description || 'Enter a description to see how your project will appear to potential investors.'}"
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/5 bg-[#0E0F13]/40 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron text-xs font-bold text-[#4FD1FF] uppercase tracking-widest">Gas AI Insights</h3>
              </div>
              <span className="font-mono text-xs text-[#FF9A1F]">{scoreMetrics.total}% RESONANCE</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
               <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-orbitron text-[#9BA1A6] uppercase">
                    <span>Metadata</span>
                    <span>{Math.round((scoreMetrics.metadata / 45) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4FD1FF] transition-all duration-500" style={{ width: `${(scoreMetrics.metadata / 45) * 100}%` }}></div>
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-orbitron text-[#9BA1A6] uppercase">
                    <span>Visuals</span>
                    <span>{Math.round((scoreMetrics.visuals / 25) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF9A1F] transition-all duration-500" style={{ width: `${(scoreMetrics.visuals / 25) * 100}%` }}></div>
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-orbitron text-[#9BA1A6] uppercase">
                    <span>Socials</span>
                    <span>{Math.round((scoreMetrics.socials / 30) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 transition-all duration-500" style={{ width: `${(scoreMetrics.socials / 30) * 100}%` }}></div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#FF9A1F]/5 border border-[#FF9A1F]/10 text-[11px] font-mono leading-relaxed">
                <span className="text-[#FF9A1F] animate-pulse mr-2">▶</span>
                <span className="text-[#F8F9FA] italic">{aiMessage}</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-[9px] font-orbitron text-[#9BA1A6] uppercase tracking-widest border-b border-white/5 pb-1">Recommendations</p>
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className={`text-[10px] ${scoreMetrics.total === 100 ? 'text-[#4FD1FF]' : 'text-[#FF9A1F]'}`}>◈</span>
                    <p className="text-[10px] text-white/60 font-inter">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchCoin;
