import { useState, useEffect } from 'react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export function useTokenLocks() {
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { contract } = useContract(process.env.REACT_APP_TOKEN_LOCKER_CONTRACT);
  const { mutateAsync: lockTokens } = useContractWrite(contract, 'lockTokens');
  const { mutateAsync: withdrawTokens } = useContractWrite(contract, 'withdraw');
  
  // Get user's locks
  const { data: userLocks } = useContractRead(
    contract,
    'getUserLocks',
    [address]
  );

  useEffect(() => {
    const parseLockData = (lockData) => {
      return lockData.map(lock => ({
        id: lock.id.toNumber(),
        amount: parseFloat(ethers.utils.formatUnits(lock.amount, 18)),
        lockTime: lock.lockTime.toNumber() * 1000,
        unlockTime: lock.unlockTime.toNumber() * 1000,
        withdrawn: lock.withdrawn
      }));
    };

    if (userLocks) {
      setLocks(parseLockData(userLocks));
      setLoading(false);
    }
  }, [userLocks]);

  const createLock = async (amount, unlockTimestamp) => {
    try {
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      const tx = await lockTokens({ args: [amountWei, unlockTimestamp] });
      return tx;
    } catch (error) {
      console.error('Token lock failed:', error);
      throw error;
    }
  };

  const withdrawLock = async (lockId) => {
    try {
      const tx = await withdrawTokens({ args: [lockId] });
      return tx;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw error;
    }
  };

  return {
    locks,
    loading,
    createLock,
    withdrawLock
  };
}