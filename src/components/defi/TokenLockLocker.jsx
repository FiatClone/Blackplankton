import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenAmountInput from '../ui/TokenAmountInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TokenLockLocker() {
  const { tokenBalance, lockTokens } = useWeb3();
  const [amount, setAmount] = useState('');
  const [unlockDate, setUnlockDate] = useState(new Date(Date.now() + 30 * 86400000));
  const [isLocking, setIsLocking] = useState(false);

  const handleLockTokens = async () => {
    if (!amount || isNaN(amount)) return;
    
    setIsLocking(true);
    try {
      await lockTokens(amount, Math.floor(unlockDate.getTime() / 1000));
      alert(`${amount} PLK locked until ${unlockDate.toLocaleDateString()}`);
      setAmount('');
    } catch (error) {
      console.error('Token locking failed:', error);
    } finally {
      setIsLocking(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Lock Tokens</h3>
      
      <div className="space-y-4">
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenBalance={tokenBalance}
          tokenSymbol="PLK"
          onMax={() => setAmount(tokenBalance)}
        />
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2">Unlock Date</label>
          <DatePicker
            selected={unlockDate}
            onChange={date => setUnlockDate(date)}
            minDate={new Date(Date.now() + 86400000)} // Tomorrow
            maxDate={new Date(Date.now() + 365 * 86400000)} // 1 year from now
            className="w-full bg-gray-600 p-2 rounded text-white"
          />
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Lock Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tokens to Lock:</span>
              <span>{amount || 0} PLK</span>
            </div>
            <div className="flex justify-between">
              <span>Unlock Date:</span>
              <span>{unlockDate.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Lock Duration:</span>
              <span>
                {Math.ceil((unlockDate - new Date()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLockTokens}
          disabled={!amount || isLocking}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !amount ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLocking ? 'Locking...' : 'Lock Tokens'}
        </button>
      </div>
    </div>
  );
}