import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';

export default function StakeForm() {
  const { tokenBalance } = useWeb3();
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(true);

  const handleAction = () => {
    // Stake/unstake logic will be implemented here
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setIsStaking(true)}
          className={`flex-1 py-2 rounded-lg ${isStaking ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Stake
        </button>
        <button
          onClick={() => setIsStaking(false)}
          className={`flex-1 py-2 rounded-lg ${!isStaking ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Unstake
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Amount</span>
            <span>Balance: {tokenBalance || '0'} PLK</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent text-2xl w-full outline-none"
            placeholder="0.0"
          />
        </div>

        <button
          onClick={handleAction}
          className="w-full bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg text-lg font-semibold"
        >
          {isStaking ? 'Stake' : 'Unstake'}
        </button>
      </div>
    </div>
  );
}