
import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
        {/* Background elements for docs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9A1F]/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4FD1FF]/5 rounded-full blur-[100px] -z-10"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4FD1FF]/30 bg-[#4FD1FF]/10 text-[#4FD1FF] text-[10px] font-orbitron mb-8 tracking-[0.2em]">
          PROTOCOL DOCUMENTATION V2.1.0
        </div>

        <h1 className="text-4xl md:text-5xl font-black font-orbitron mb-12 text-[#F8F9FA] tracking-tight leading-tight uppercase">
          GasPad Technical <br />
          <span className="text-[#FF9A1F]">Documentation</span> & Standards
        </h1>

        <div className="space-y-16 text-[#9BA1A6] font-inter leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#FF9A1F]">01</span> The Gas AI Curation Framework
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                The Gas AI engine serves as the foundational security and verification layer of the GasPad ecosystem. Unlike traditional permissionless launchpads, GasPad implements an autonomous auditing process powered by the GasOS framework.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Autonomous Metadata Analysis:</strong> The system performs real-time linguistic and structural analysis on token descriptions and project names to identify patterns associated with low-effort deployments or known rug-pull templates.</li>
                <li><strong className="text-white/80">Social Graph Integration:</strong> Gas agents monitor X and Telegram to distinguish between organic community growth and artificial bot activity. This ensures that only projects with genuine human engagement reach the upper tiers of the launchpad.</li>
                <li><strong className="text-white/80">Dynamic Safety Scoring:</strong> Each project is assigned a real-time score from 1 to 100 based on creator wallet history, contract transparency, and liquidity parameters. This score is displayed prominently to provide users with instant risk assessment.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#4FD1FF]">02</span> Token Lifecycle and Bonding Curve Mechanics
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                The transition of a token from initial minting to decentralized exchange listing is governed by a strict, automated protocol to prevent manual manipulation.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">The Incubation Phase:</strong> Upon creation, tokens are placed in a monitored sandbox. During this period, GasPad observes the initial buy and sell pressure to verify that no single entity is attempting to corner the supply through sybil attacks.</li>
                <li><strong className="text-white/80">The AI Gatekeeper:</strong> Before a token can graduate to a major liquidity pool, it must pass a final automated audit. This audit confirms that the total supply, decimals, and metadata align with the initial launch specifications.</li>
                <li><strong className="text-white/80">Automated Liquidity Migration:</strong> When the predetermined bonding curve threshold is reached, the protocol automatically migrates liquidity to decentralized exchanges like Raydium. The associated LP tokens are permanently burned by the protocol to ensure long-term stability.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#FF9A1F]">03</span> Developer Standards and Launch Requirements
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                To maintain a high-quality ecosystem, GasPad enforces specific standards for all developers wishing to launch on the platform.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Visual Asset Requirements:</strong> Developers must provide high-fidelity visual assets. This includes a clear token logo and a high-resolution banner. The use of low-resolution or copyrighted materials is flag by the AI for manual review.</li>
                <li><strong className="text-white/80">Verified Social Linkage:</strong> A token is only eligible for the featured Latest Launches section if it provides valid links to a Telegram community, an X account, and a dedicated project website.</li>
                <li><strong className="text-white/80">Anti-Bot and Fair Launch Protocols:</strong> GasPad utilizes a combination of wallet age verification and rate-limiting to prevent sniper bots from dominating the initial supply. This ensures a fairer distribution for community participants.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#4FD1FF]">04</span> Technical Architecture and Infrastructure
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                The GasPad demo is built using a modern frontend stack designed to simulate a full-scale blockchain environment.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Frontend Framework:</strong> The application is built using React.js and styled with Tailwind CSS to ensure a responsive and high-performance user interface.</li>
                <li><strong className="text-white/80">Solana Wallet Integration:</strong> The platform utilizes the Solana Wallet Adapter library to facilitate real connections with browser extensions like Phantom and Solflare. This allows for genuine address verification and user authentication.</li>
                <li><strong className="text-white/80">State Management and Persistence:</strong> For the demo environment, project data and user-created tokens are managed via browser LocalStorage. This allows the demo to persist across sessions without requiring a centralized database, making it ideal for local presentations.</li>
                <li><strong className="text-white/80">GasOS Logic:</strong> The logic for autonomous monitoring and community sentiment is designed around the GasOS agent framework, allowing for future expansion into real-time on-chain logic.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#FF9A1F]">05</span> Advanced Security Protocols and Risk Mitigation
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                The GasPad architecture prioritizes user safety through a multi-layered defensive strategy. Beyond simple contract audits, the platform implements behavioral analysis to detect sophisticated malicious patterns.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Creator Reputation Scoring:</strong> The system tracks the historical performance of deployment wallets across the Solana network. Wallets associated with previous rug-pulls or "pump-and-dump" schemes are automatically blacklisted or flagged with a high-risk warning.</li>
                <li><strong className="text-white/80">Liquidity Locking Mechanisms:</strong> To prevent "liquidity pulls," GasPad enforces a mandatory lock-up period for the initial liquidity pool. This lock is managed by a decentralized smart contract, ensuring that developers cannot withdraw the foundational funds until the project has reached established maturity milestones.</li>
                <li><strong className="text-white/80">Slippage and MEV Protection:</strong> The Gas AI monitoring system provides real-time alerts on Maximum Extractable Value (MEV) bot activity. This allows the platform to suggest optimal slippage settings to retail users, protecting them from front-running and sandwich attacks during high-volatility launch phases.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#4FD1FF]">06</span> The GasPad Bonding Curve Model
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                The economic foundation of GasPad relies on a mathematical bonding curve designed to incentivize early participation while maintaining long-term price stability.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Algorithmic Pricing:</strong> As tokens are purchased from the initial supply, the price increases along a predefined curve. This ensures that the token price is a direct function of the total supply in circulation, providing full transparency to all participants.</li>
                <li><strong className="text-white/80">Initial Market Cap Targets:</strong> Each launch is configured with a "Graduation Goal." Once the bonding curve reaches a specific market capitalization—typically 69,000 USD on the Solana mainnet—the remaining supply and liquidity are prepared for migration to a decentralized exchange (DEX).</li>
                <li><strong className="text-white/80">Fair Distribution Checks:</strong> The protocol monitors the distribution of tokens during the bonding phase. If a single entity acquires more than a specific percentage of the supply (e.g., 5%), the Gas AI identifies the wallet as a potential "whale" risk, informing the community of the concentration of power.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#FF9A1F]">07</span> Governance and Community Autonomy
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                While GasPad is driven by AI, the ultimate direction of the protocol is steered by its community through decentralized governance.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">The Spotlight Voting System:</strong> Users who hold the native GasPad utility token can participate in the "Spotlight" selection process. This allows the community to vote on which AI-verified projects receive premium placement on the homepage.</li>
                <li><strong className="text-white/80">Decentralized Dispute Resolution:</strong> In the event of a project dispute, the GasPad DAO (Decentralized Autonomous Organization) can initiate a review. AI agents provide the data and forensics, but the final decision to delist or flag a project rests with the community voters.</li>
                <li><strong className="text-white/80">Revenue Sharing and Burn:</strong> A portion of the platform's launch fees is directed back into the ecosystem. This capital is either used to buy back and burn the native utility token or is distributed to active participants who contribute to the AI's data training and project auditing.</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-orbitron font-bold text-[#F8F9FA] mb-4 flex items-center gap-3">
              <span className="text-[#4FD1FF]">08</span> Implementation Roadmap (2026 Strategy)
            </h2>
            <div className="pl-8 border-l border-white/10 space-y-4">
              <p>
                As the project scales from a demo environment to a production-grade infrastructure, several key milestones define the development path.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white/80">Phase 1: High-Fidelity Prototyping:</strong> Development of the interactive UI/UX, including real wallet integration and simulated launch flows for investor demonstrations.</li>
                <li><strong className="text-white/80">Phase 2: GasOS Agent Deployment:</strong> Integration of the GasOS framework to handle live social media monitoring and autonomous contract auditing on the Solana Devnet.</li>
                <li><strong className="text-white/80">Phase 3: Mainnet Beta Launch:</strong> Limited release for verified developers to launch tokens under the supervision of the AI Curation Engine, with a focus on community-led memecoins.</li>
                <li><strong className="text-white/80">Phase 4: Full Ecosystem Expansion:</strong> Integration with advanced Solana primitives such as Meteora Dynamic Vaults and the implementation of cross-chain AI verification for other SVM (Solana Virtual Machine) chains.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;
