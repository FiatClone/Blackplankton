import { useState } from 'react';
import { useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export function useTokenBridge() {
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  
  const { mutateAsync: bridgeTokens } = useContractWrite(
    process.env.REACT_APP_BRIDGE_CONTRACT,
    'bridgeTokens'
  );

  const estimateBridgeTime = (fromChain, toChain) => {
    // Simple estimation based on chain pairs
    if (fromChain === 1 || toChain === 1) {
      // Mainnet bridges take longer
      setEstimatedTime(20 * 60 * 1000); // 20 minutes
    } else {
      // L2 to L2 bridges are faster
      setEstimatedTime(5 * 60 * 1000); // 5 minutes
    }
  };

  const bridge = async (amount, fromChain, toChain) => {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount');
    }

    setIsLoading(true);
    try {
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      const tx = await bridgeTokens({
        args: [
          amountWei,
          fromChain,
          toChain
        ]
      });
      return tx;
    } catch (error) {
      console.error('Bridging failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bridge,
    estimateBridgeTime,
    estimatedTime,
    isLoading
  };
}