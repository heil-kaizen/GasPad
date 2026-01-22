
export interface Coin {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  creator: string;
  timestamp: number;
  socials: {
    telegram?: string;
    twitter?: string;
    website?: string;
  };
  aiScore: number;
  supply: string;
  decimals: number;
}

export type WalletType = 'phantom' | 'solflare' | null;

export interface WalletState {
  address: string | null;
  type: WalletType;
  isConnected: boolean;
}
