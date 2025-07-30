import { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/format';

export default function TokenLockingSchedule({ lockData }) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!lockData || lockData.length === 0) {
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-gray-400">No token locks found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Token Locking Schedule</h3>
      
      <div className="space-y-3">
        {lockData.map((lock, index) => {
          const isUnlocked = currentTime >= lock.unlockTime;
          const unlockDate = new Date(lock.unlockTime);
          const now = new Date(currentTime);
          const daysRemaining = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {lock.amount} {lock.tokenSymbol}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  isUnlocked ? 'bg-green-900 text-green-400' : 'bg-blue-900 text-blue-400'
                }`}>
                  {isUnlocked ? 'Unlocked' : `Unlocks in ${daysRemaining}d`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>Locked on: {formatDate(lock.lockTime)}</span>
                <span>Unlocks on: {formatDate(lock.unlockTime)}</span>
              </div>
              
              {isUnlocked && (
                <button className="w-full mt-3 bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-sm">
                  Claim Tokens
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}