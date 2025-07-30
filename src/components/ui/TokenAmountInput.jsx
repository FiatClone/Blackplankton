import { useState } from 'react';

export default function TokenAmountInput({
  value,
  onChange,
  tokenBalance,
  tokenSymbol = 'PLK',
  onMax
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`bg-gray-700 p-4 rounded-lg border ${
      isFocused ? 'border-blue-500' : 'border-transparent'
    }`}>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Amount</span>
        <span className="text-sm">
          Balance: {tokenBalance ? parseFloat(tokenBalance).toFixed(4) : '0'} {tokenSymbol}
        </span>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-transparent text-2xl w-full outline-none"
          placeholder="0.0"
        />
        <button
          onClick={onMax}
          className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
        >
          Max
        </button>
      </div>
    </div>
  );
}