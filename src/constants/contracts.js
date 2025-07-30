export const CONTRACTS = {
  MAINNET: {
    TOKEN: '0x123...',
    STAKING: '0x456...',
    COMIC_NFT: '0x789...',
    AIRDROP: '0xabc...'
  },
  TESTNET: {
    TOKEN: '0xdef...',
    STAKING: '0xghi...',
    COMIC_NFT: '0xjkl...',
    AIRDROP: '0xmno...'
  }
};

export const ABI = {
  TOKEN: require('../contracts/abis/PlanktonToken.json'),
  STAKING: require('../contracts/abis/PlanktonStaking.json'),
  COMIC_NFT: require('../contracts/abis/ComicNFT.json'),
  AIRDROP: require('../contracts/abis/Airdrop.json')
};