import { ethers } from 'ethers';

export const parseLockData = (contractData) => {
  return contractData.map(lock => ({
    id: lock.id.toNumber(),
    amount: parseFloat(ethers.utils.formatUnits(lock.amount, 18)),
    tokenSymbol: lock.tokenSymbol,
    lockTime: lock.lockTime.toNumber() * 1000,
    unlockTime: lock.unlockTime.toNumber() * 1000,
    claimed: lock.claimed
  }));
};

export const calculateVestingSchedule = (locks) => {
  const now = Date.now();
  const unlocked = locks.filter(lock => lock.unlockTime <= now && !lock.claimed);
  const locked = locks.filter(lock => lock.unlockTime > now);
  const claimed = locks.filter(lock => lock.claimed);
  
  return {
    unlocked,
    locked,
    claimed,
    totalUnlocked: unlocked.reduce((sum, lock) => sum + lock.amount, 0),
    totalLocked: locked.reduce((sum, lock) => sum + lock.amount, 0),
    totalClaimed: claimed.reduce((sum, lock) => sum + lock.amount, 0)
  };
};

export const simulateTokenLock = (amount, durationDays, cliffDays = 0) => {
  const now = Math.floor(Date.now() / 1000);
  const unlockTime = now + (durationDays * 86400);
  const cliffTime = now + (cliffDays * 86400);
  
  return {
    amount: ethers.utils.parseUnits(amount.toString(), 18),
    unlockTime,
    cliffTime
  };
};