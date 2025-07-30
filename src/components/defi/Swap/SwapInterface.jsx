import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenSelectModal from './TokenSelectModal';
import SlippageSettings from './SlippageSettings';

export default function SwapInterface() {
  const { tokenBalance } = useWeb3();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('PLK');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  const handleSwap = () => {
    // Swap logic will be implemented here
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Swap</h3>
          <SlippageSettings slippage={slippage} setSlippage={setSlippage} />
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">From</span>
            <span>Balance: {tokenBalance || '0'} PLK</span>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl w-full outline-none"
              placeholder="0.0"
            />
            <TokenSelectModal 
              selectedToken={fromToken} 
              onSelect={setFromToken} 
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-gray-600 p-2 rounded-full">
            ↓
          </button>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="mb-2 text-gray-400">To</div>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              className="bg-transparent text-2xl w-full outline-none"
              placeholder="0.0"
            />
            <TokenSelectModal 
              selectedToken={toToken} 
              onSelect={setToToken} 
            />
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg text-lg font-semibold"
        >
          Swap
        </button>
      </div>
    </div>
  );
}