import { useState, useEffect } from 'react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { useWeb3 } from '../contexts/Web3Context';

export function useAirdrop() {
  const { address } = useWeb3();
  const { contract } = useContract(process.env.REACT_APP_AIRDROP_CONTRACT);
  const [hasNewAirdrop, setHasNewAirdrop] = useState(false);
  
  // Read contract data
  const { data: eligibility } = useContractRead(contract, 'isEligible', [address]);
  const { data: totalRewards } = useContractRead(contract, 'getTotalRewards', [address]);
  const { data: claimed } = useContractRead(contract, 'getClaimedAmount', [address]);
  
  // Write contract functions
  const { mutateAsync: claim } = useContractWrite(contract, 'claim');

  // Check for new airdrops periodically
  useEffect(() => {
    const checkAirdrop = async () => {
      if (address) {
        const lastChecked = localStorage.getItem(`airdropChecked-${address}`);
        const isNew = await contract.call('isNewAirdropAvailable', [address, lastChecked]);
        setHasNewAirdrop(isNew);
      }
    };

    checkAirdrop();
    const interval = setInterval(checkAirdrop, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [address, contract]);

  const claimAirdrop = async () => {
    await claim({ args: [] });
    localStorage.setItem(`airdropChecked-${address}`, Date.now());
    setHasNewAirdrop(false);
  };

  return {
    eligibility,
    totalRewards: totalRewards ? parseFloat(totalRewards.toString()) / 1e18 : 0,
    claimed: claimed ? parseFloat(claimed.toString()) / 1e18 : 0,
    claimAirdrop,
    hasNewAirdrop,
  };
}