export const AIRDROP_TASKS = [
  {
    id: 'connect_wallet',
    name: 'Connect Wallet',
    description: 'Connect your wallet to the platform',
    points: 100,
    action: 'connect',
    validator: (address) => !!address
  },
  {
    id: 'first_swap',
    name: 'Complete First Swap',
    description: 'Perform your first token swap',
    points: 200,
    action: 'swap',
    validator: (txs) => txs.some(tx => tx.type === 'swap')
  },
  {
    id: 'stake_tokens',
    name: 'Stake PLK Tokens',
    description: 'Stake any amount of PLK tokens',
    points: 300,
    action: 'stake',
    validator: (txs) => txs.some(tx => tx.type === 'stake')
  },
  {
    id: 'add_liquidity',
    name: 'Provide Liquidity',
    description: 'Add liquidity to any pool',
    points: 400,
    action: 'add_liquidity',
    validator: (txs) => txs.some(tx => tx.type === 'add_liquidity')
  },
  {
    id: 'invite_friends',
    name: 'Invite Friends',
    description: 'Invite friends using your referral link',
    points: 500,
    action: 'invite',
    validator: (refs) => refs.length >= 3
  }
];