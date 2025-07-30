export const TOKENS = {
  PLK: {
    name: 'Plankton Token',
    symbol: 'PLK',
    decimals: 18,
    address: {
      1: '0x123...', // Mainnet
      5: '0x456...', // Goerli
      137: '0x789...', // Polygon
      80001: '0xabc...', // Mumbai
    },
    logo: '/images/tokens/plk.png',
  },
  WETH: {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      5: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      80001: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    },
    logo: '/images/tokens/weth.png',
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: {
      1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      80001: '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
    },
    logo: '/images/tokens/usdc.png',
  },
};
