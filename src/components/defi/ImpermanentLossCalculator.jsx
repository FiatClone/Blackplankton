import { useState } from 'react';
import { calculateImpermanentLoss } from '../../../utils/defiMath';

export default function ImpermanentLossCalculator() {
  const [priceChange, setPriceChange] = useState(100);
  const [initialPriceRatio, setInitialPriceRatio] = useState(1);
  
  const il = calculateImpermanentLoss(priceChange / 100, initialPriceRatio);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Impermanent Loss Calculator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            Price Change: {priceChange}%
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={priceChange}
            onChange={(e) => setPriceChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block mb-2">
            Initial Price Ratio (TokenA/TokenB): {initialPriceRatio.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={initialPriceRatio}
            onChange={(e) => setInitialPriceRatio(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Impermanent Loss</h4>
          <p className={`text-2xl ${
            il < 0 ? 'text-red-400' : 'text-green-400'
          }`}>
            {il.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Compared to holding the tokens separately
          </p>
        </div>
      </div>
    </div>
  );
}