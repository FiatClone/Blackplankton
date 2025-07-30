import { useState, useEffect } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { useWeb3 } from '../contexts/Web3Context';

export function useLiquidity(pairAddress) {
  const { address } = useWeb3();
  const [liquidity, setLiquidity] = useState({
    reserves: { token0: 0, token1: 0 },
    userLpTokens: 0,
    totalSupply: 0,
    loading: true
  });

  const { contract: pairContract } = useContract(pairAddress);
  
  // Get reserves
  const { data: reserves } = useContractRead(pairContract, 'getReserves');
  
  // Get user LP balance
  const { data: userLpBalance } = useContractRead(
    pairContract,
    'balanceOf',
    [address]
  );
  
  // Get total supply
  const { data: lpTotalSupply } = useContractRead(pairContract, 'totalSupply');

  useEffect(() => {
    if (reserves && userLpBalance !== undefined && lpTotalSupply !== undefined) {
      setLiquidity({
        reserves: {
          token0: parseFloat(reserves[0].toString()) / 1e18,
          token1: parseFloat(reserves[1].toString()) / 1e18
        },
        userLpTokens: parseFloat(userLpBalance.toString()) / 1e18,
        totalSupply: parseFloat(lpTotalSupply.toString()) / 1e18,
        loading: false
      });
    }
  }, [reserves, userLpBalance, lpTotalSupply]);

  return liquidity;
}