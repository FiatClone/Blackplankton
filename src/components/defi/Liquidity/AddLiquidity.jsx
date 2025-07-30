import { useState } from 'react';
import { useWeb3 } from '../../../../contexts/Web3Context';
import TokenSelectModal from '../Swap/TokenSelectModal';

export default function AddLiquidity() {
  const { tokenBalance } = useWeb3();
  const [tokenA, setTokenA] = useState('ETH');
  const [tokenB, setTokenB] = useState('PLK');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');

  const handleAddLiquidity = () => {
    // Logic to add liquidity to the pool
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Add Liquidity</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Token A</span>
            <span>Balance: {tokenBalance || '0'}</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={amountA}
              onChange={(e) => setAmountA(e.target.value)}
              className="bg-transparent text-xl w-full outline-none"
              placeholder="0.0"
            />
            <TokenSelectModal 
              selectedToken={tokenA} 
              onSelect={setTokenA} 
            />
          </div>
        </div>

        <div className="flex justify-center">
          <span className="text-gray-400">+</span>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Token B</span>
            <span>Balance: {tokenBalance || '0'}</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={amountB}
              onChange={(e) => setAmountB(e.target.value)}
              className="bg-transparent text-xl w-full outline-none"
              placeholder="0.0"
            />
            <TokenSelectModal 
              selectedToken={tokenB} 
              onSelect={setTokenB} 
            />
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Pool Share</h4>
          <p className="text-lg">0%</p>
        </div>

        <button
          onClick={handleAddLiquidity}
          className="w-full bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg text-lg font-semibold"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  );
}