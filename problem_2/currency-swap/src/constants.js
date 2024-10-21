// src/constants.js

export const dummyWallets = [
  {
    name: 'MetaMask',
    id: 'metamask',
    balance: {
      'USDC': 100, // Dummy balance for USDT
      'ETH': 0.5,  // Dummy balance for ETH
    },
  },
  {
    name: 'WalletConnect',
    id: 'walletconnect',
    balance: {
      'USDT': 50,  // Dummy balance for USDT
      'ETH': 1,    // Dummy balance for ETH
    },
  },
  {
    name: 'Coinbase Wallet',
    id: 'coinbase',
    balance: {
      'USDT': 200, // Dummy balance for USDT
      'ETH': 0.1,  // Dummy balance for ETH
    },
  },
  // Add more wallets with balances as needed
];
