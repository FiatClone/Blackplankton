import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '../../../utils/format';

export default function TokenVestingSchedule({ schedule }) {
  const [unlockedAmount, setUnlockedAmount] = useState(0);
  const [nextUnlock, setNextUnlock] = useState(null);

  useEffect(() => {
    const calculateUnlocked = () => {
      const now = Date.now();
      const startTime = new Date(schedule.startTime).getTime();
      const endTime = new Date(schedule.endTime).getTime();
      const cliffTime = new Date(schedule.cliffTime).getTime();

      if (now < cliffTime) {
        setUnlockedAmount(0);
        setNextUnlock(cliffTime);
        return;
      }

      if (now >= endTime) {
        setUnlockedAmount(schedule.totalAmount);
        setNextUnlock(null);
        return;
      }

      const elapsed = now - startTime;
      const totalDuration = endTime - startTime;
      const unlocked = (schedule.totalAmount * elapsed) / totalDuration;
      setUnlockedAmount(unlocked);

      // Calculate next unlock (monthly)
      const monthsElapsed = Math.floor(elapsed / (30 * 86400000));
      const nextUnlockTime = startTime + (monthsElapsed + 1) * 30 * 86400000;
      setNextUnlock(Math.min(nextUnlockTime, endTime));
    };

    calculateUnlocked();
    const interval = setInterval(calculateUnlocked, 86400000); // Update daily
    return () => clearInterval(interval);
  }, [schedule]);

  const handleClaim = (amount) => {
    // TODO: Implement claim logic
    alert(`Claiming ${formatCurrency(amount)} ${schedule.tokenSymbol}`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Vesting Schedule</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-gray-400 mb-2">Summary</h4>
          <div className="bg-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span>Total Allocation:</span>
              <span>{formatCurrency(schedule.totalAmount)} {schedule.tokenSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Unlocked:</span>
              <span className="text-green-400">
                {formatCurrency(unlockedAmount)} {schedule.tokenSymbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Claimed:</span>
              <span>{formatCurrency(schedule.claimedAmount)} {schedule.tokenSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span>
                {formatCurrency(schedule.totalAmount - schedule.claimedAmount)} {schedule.tokenSymbol}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => handleClaim(unlockedAmount - schedule.claimedAmount)}
            disabled={unlockedAmount <= schedule.claimedAmount}
            className={`w-full mt-4 py-3 rounded-lg font-semibold ${
              unlockedAmount <= schedule.claimedAmount 
                ? 'bg-gray-700 text-gray-500' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Claim Available Tokens
          </button>
        </div>
        
        <div>
          <h4 className="text-gray-400 mb-2">Schedule</h4>
          <div className="bg-gray-700 p-4 rounded-lg space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Start Date:</span>
                <span>{formatDate(schedule.startTime)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ 
                    width: `${(unlockedAmount / schedule.totalAmount) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>End Date:</span>
                <span>{formatDate(schedule.endTime)}</span>
              </div>
            </div>
            
            {nextUnlock && (
              <div className="text-center py-2 bg-gray-600 rounded">
                <p className="text-sm">
                  Next unlock: {formatDate(nextUnlock)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {Math.ceil((nextUnlock - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                </p>
              </div>
            )}
            
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Cliff Period:</span>
                <span>{schedule.cliffMonths} months</span>
              </div>
              <div className="flex justify-between">
                <span>Vesting Duration:</span>
                <span>{schedule.vestingMonths} months</span>
              </div>
              <div className="flex justify-between">
                <span>Unlock Frequency:</span>
                <span>Monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}