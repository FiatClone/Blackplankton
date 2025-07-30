import { useState, useEffect } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import { formatDate } from '../../../utils/format';

export default function TokenLockManager() {
  const { tokenLocks, withdrawLockedTokens } = useWeb3();
  const [activeTab, setActiveTab] = useState('active');
  const [isWithdrawing, setIsWithdrawing] = useState({});

  const filteredLocks = tokenLocks.filter(lock => 
    activeTab === 'active' ? lock.unlockTime > Date.now() : lock.unlockTime <= Date.now()
  );

  const handleWithdraw = async (lockId) => {
    setIsWithdrawing(prev => ({ ...prev, [lockId]: true }));
    try {
      await withdrawLockedTokens(lockId);
      alert('Tokens withdrawn successfully!');
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsWithdrawing(prev => ({ ...prev, [lockId]: false }));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Manage Token Locks</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'active' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Active Locks
          </button>
          <button
            onClick={() => setActiveTab('unlocked')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'unlocked' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            Unlocked
          </button>
        </div>
      </div>
      
      {filteredLocks.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No {activeTab === 'active' ? 'active' : 'unlocked'} token locks found
        </p>
      ) : (
        <div className="space-y-3">
          {filteredLocks.map(lock => (
            <div key={lock.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {lock.amount} PLK
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  lock.unlockTime > Date.now() 
                    ? 'bg-blue-900 text-blue-400' 
                    : 'bg-green-900 text-green-400'
                }`}>
                  {lock.unlockTime > Date.now() 
                    ? `Unlocks in ${Math.ceil((lock.unlockTime - Date.now()) / (1000 * 60 * 60 * 24))}d` 
                    : 'Ready to withdraw'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>Locked on: {formatDate(lock.lockTime)}</span>
                <span>Unlocks on: {formatDate(lock.unlockTime)}</span>
              </div>
              
              {lock.unlockTime <= Date.now() && (
                <button
                  onClick={() => handleWithdraw(lock.id)}
                  disabled={isWithdrawing[lock.id]}
                  className={`w-full py-2 rounded-lg text-sm ${
                    isWithdrawing[lock.id] ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isWithdrawing[lock.id] ? 'Withdrawing...' : 'Withdraw'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}