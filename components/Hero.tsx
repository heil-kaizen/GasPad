
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onLaunchClick: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  const wordsRow1 = ["Launch", "Your"];
  const wordsRow3 = ["with", "AI"];
  const wordsRow4 = ["Precision"];

  // Updated to the new GasPad official logo URL
  const MASCOT_URL = "https://raw.githubusercontent.com/heil-kaizen/GasPad/main/GasPad.png";
  
  const [imgSrc, setImgSrc] = useState(MASCOT_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // If the high-quality mirror fails, use a secondary mirror
  const handleImageError = () => {
    if (imgSrc === MASCOT_URL) {
      // Primary fallback to a reliable AI mascot image if the repo link fails
      setImgSrc("https://r2.erweima.ai/ai_image/3f7e6f66-3d2b-4d7a-8f8d-6d8b9d2e1b9b.jpg");
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9A1F]/5 rounded-full blur-[140px] -z-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] bg-[#4FD1FF]/5 rounded-full blur-[120px] -z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="max-w-2xl">
            {/* CA Section REMOVED */}

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF9A1F]/30 bg-[#FF9A1F]/10 text-[#FF9A1F] text-[10px] font-orbitron mb-8 tracking-[0.2em] shadow-[0_0_15px_rgba(255,154,31,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FF9A1F] shadow-[0_0_8px_#FF9A1F] animate-pulse"></span>
              NEXT-GEN SOLANA INFRASTRUCTURE
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron leading-[1.1] mb-8 text-[#F8F9FA] tracking-tighter">
              <div className="flex flex-wrap gap-x-4">
                {wordsRow1.map((word, i) => (
                  <span key={i} className="tile-anim" style={{ animationDelay: `${i * 100}ms` }}>{word}</span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-x-4">
                <span className="tile-anim text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A1F] to-[#F8F9FA]" style={{ animationDelay: '250ms' }}>
                  Solana
                </span>
                <span className="tile-anim text-[#4FD1FF] drop-shadow-[0_0_10px_rgba(79,209,255,0.3)]" style={{ animationDelay: '350ms' }}>
                  Coin
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4">
                {wordsRow3.map((word, i) => (
                  <span key={i} className="tile-anim" style={{ animationDelay: `${450 + (i * 100)}ms` }}>{word}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-4">
                {wordsRow4.map((word, i) => (
                  <span key={i} className="tile-anim" style={{ animationDelay: `${650 + (i * 100)}ms` }}>{word}</span>
                ))}
              </div>
            </h1>

            <p className="text-lg text-[#9BA1A6] max-w-lg mb-12 font-medium leading-relaxed font-inter opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
              The world's first AI-curated launchpad. Privacy-focused, community-driven, and powered by <span className="text-white font-bold border-b border-[#FF9A1F]/30">Gas AI</span>.
            </p>

            <div className="flex flex-wrap gap-6 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
              <Link 
                to="/launch" 
                className="group relative px-10 py-4 rounded-xl bg-[#FF9A1F] text-black font-orbitron font-black text-lg transition-all shadow-[0_0_30px_rgba(255,154,31,0.3)] hover:shadow-[0_0_50px_rgba(255,154,31,0.5)] active:scale-95 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
                <span className="relative">Launch Coin</span> <span className="relative group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                to="/launches" 
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-[#F8F9FA] font-orbitron font-bold text-lg hover:bg-white/10 transition-all active:scale-95 hover:border-white/20"
              >
                Latest Launches
              </Link>
            </div>
          </div>

          {/* Right Section: Gas Mascot Portal */}
          <div className="relative flex justify-center items-center">
            {/* Holographic Frame */}
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border-2 border-[#FF9A1F]/20 shadow-[0_0_80px_rgba(255,154,31,0.15)] overflow-hidden group bg-[#0E0F13]">
              
              {/* Animated Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#FF9A1F_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] group-hover:opacity-15 transition-opacity duration-500"></div>
              
              {/* Neural Sync Loader */}
              {isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0E0F13]/80 backdrop-blur-md">
                  <div className="w-16 h-16 border-2 border-[#FF9A1F]/20 border-t-[#FF9A1F] rounded-full animate-spin mb-6"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-orbitron text-[#FF9A1F] tracking-[0.4em] animate-pulse">NEURAL SYNC</span>
                    <span className="text-[8px] font-mono text-white/30 mt-2 tracking-widest">ESTABLISHING CONNECTION...</span>
                  </div>
                </div>
              )}

              {/* Character Image (Cyberpunk Mascot) */}
              <img 
                src={imgSrc} 
                alt="GasPad Mascot" 
                onLoad={() => setIsLoading(false)}
                onError={handleImageError}
                className={`w-full h-full object-cover animate-mascot transition-all duration-1000 ${isLoading || isError ? 'opacity-0 scale-95 blur-2xl' : 'opacity-100 scale-100 blur-0'}`}
              />

              {/* Error State Fallback */}
              {isError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-[#0E0F13]">
                  <div className="text-[#FF9A1F] text-5xl mb-4 font-orbitron animate-pulse">⚠</div>
                  <div className="font-orbitron text-xs text-white/50 tracking-widest uppercase mb-2">Visual Matrix Disconnected</div>
                  <div className="text-[10px] text-white/20 font-mono">CODE: 0x8F_MASC0T_FAIL</div>
                  <button 
                    onClick={() => {setIsLoading(true); setImgSrc(MASCOT_URL + "?t=" + Date.now()); setIsError(false);}}
                    className="mt-6 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20 text-[10px] font-orbitron text-white/40 hover:text-white transition-all"
                  >
                    RE-SYNC MATRIX
                  </button>
                </div>
              )}

              {/* Holographic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F13] via-transparent to-transparent pointer-events-none z-10 opacity-60"></div>
              <div className="absolute inset-0 border-[20px] border-black/30 rounded-full pointer-events-none z-20"></div>
              
              {/* Scanline & CRT Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,4px_100%] animate-[pulse_8s_infinite]"></div>
            </div>

            {/* Orbiting Tech Rings */}
            <div className="absolute -z-10 w-[110%] h-[110%] rounded-full border border-[#FF9A1F]/10 animate-[spin_25s_linear_infinite] opacity-30"></div>
            <div className="absolute -z-10 w-[125%] h-[125%] rounded-full border border-[#4FD1FF]/10 animate-[spin_40s_linear_infinite_reverse] opacity-20"></div>
            
            {/* UI Decals around portal */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#FF9A1F]/30 rounded-tr-3xl -z-5 pointer-events-none translate-x-6 -translate-y-6"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-[#4FD1FF]/30 rounded-bl-3xl -z-5 pointer-events-none -translate-x-6 translate-y-6"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
