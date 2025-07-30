import { useState } from 'react';
import { useWeb3 } from '../../../../contexts/Web3Context';
import { formatCrypto } from '../../../utils/format';

export default function RemoveLiquidity() {
  const { liquidityPositions } = useWeb3();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [amount, setAmount] = useState('');

  const handleRemove = () => {
    // Logic to remove liquidity
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Remove Liquidity</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2">Select Position</label>
          <select
            value={selectedPosition?.id || ''}
            onChange={(e) => {
              const position = liquidityPositions.find(p => p.id === e.target.value);
              setSelectedPosition(position);
            }}
            className="w-full bg-gray-600 p-3 rounded"
          >
            <option value="">Select a position</option>
            {liquidityPositions.map(position => (
              <option key={position.id} value={position.id}>
                {position.pair} - {formatCrypto(position.amount)}
              </option>
            ))}
          </select>
        </div>

        {selectedPosition && (
          <>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Amount to Remove</span>
                <span>Max: {formatCrypto(selectedPosition.amount)}</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-xl w-full outline-none"
                placeholder="0.0"
                max={selectedPosition.amount}
              />
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-gray-400 mb-2">You Will Receive</h4>
              <div className="space-y-2">
                <p>{formatCrypto(amount * selectedPosition.token0Ratio, selectedPosition.token0)}</p>
                <p>{formatCrypto(amount * selectedPosition.token1Ratio, selectedPosition.token1)}</p>
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleRemove}
          disabled={!selectedPosition || !amount}
          className="w-full bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          Remove Liquidity
        </button>
      </div>
    </div>
  );
}