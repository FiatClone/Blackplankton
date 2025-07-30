import { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export function useBalances() {
  const { address, tokenContract } = useWeb3();
  const [balances, setBalances] = useState({
    native: 0,
    token: 0,
    staked: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchBalances = async () => {
      if (!address || !tokenContract) return;
      
      try {
        // Fetch native token balance (ETH/MATIC)
        const nativeBalance = await tokenContract.provider.getBalance(address);
        
        // Fetch PLK token balance
        const tokenBalance = await tokenContract.balanceOf(address);
        
        // TODO: Fetch staked balance from staking contract
        
        setBalances({
          native: parseFloat(nativeBalance.toString()) / 1e18,
          token: parseFloat(tokenBalance.toString()) / 1e18,
          staked: 0, // Placeholder
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
        setBalances(prev => ({ ...prev, loading: false }));
      }
    };

    fetchBalances();
    
    // Set up polling or event listeners if needed
    const interval = setInterval(fetchBalances, 15000);
    return () => clearInterval(interval);
  }, [address, tokenContract]);

  return balances;
}