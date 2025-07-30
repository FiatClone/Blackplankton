import { useState } from 'react';
import { useStakingActions } from '../../../../services/contracts/stakingService';

const stakeOptions = [
  { id: '30', name: '30 Days', apy: '5%' },
  { id: '90', name: '90 Days', apy: '8%' },
  { id: '180', name: '180 Days', apy: '12%' },
];

export default function StakeOptions() {
  const [selectedOption, setSelectedOption] = useState(stakeOptions[0].id);
  const [amount, setAmount] = useState('');
  const { stakeTokens } = useStakingActions();

  const handleStake = async () => {
    if (!amount) return;
    await stakeTokens(amount, selectedOption);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Staking Options</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stakeOptions.map(option => (
          <div
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`p-3 rounded-lg cursor-pointer text-center ${
              selectedOption === option.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <p className="font-bold">{option.name}</p>
            <p className="text-sm text-green-400">{option.apy} APY</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <label className="block text-gray-400 mb-2">Amount to Stake</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent text-xl w-full outline-none"
          placeholder="0.0 PLK"
        />
      </div>

      <button
        onClick={handleStake}
        disabled={!amount}
        className="w-full bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
      >
        Stake PLK
      </button>
    </div>
  );
}