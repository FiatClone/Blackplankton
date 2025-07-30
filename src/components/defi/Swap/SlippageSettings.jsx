import { useState } from 'react';

const slippageOptions = [0.1, 0.5, 1.0];

export default function SlippageSettings({ slippage, setSlippage }) {
  const [isCustom, setIsCustom] = useState(false);
  const [customSlippage, setCustomSlippage] = useState('');

  const handleCustomSlippage = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 5)) {
      setCustomSlippage(value);
      if (value !== '') {
        setSlippage(Number(value));
      }
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center text-sm text-gray-400 hover:text-white">
        ⚙️ Slippage: {slippage}%
      </button>
      
      <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 p-3">
        <h4 className="text-sm font-bold mb-2">Slippage Tolerance</h4>
        <div className="flex space-x-2 mb-3">
          {slippageOptions.map(option => (
            <button
              key={option}
              onClick={() => {
                setSlippage(option);
                setIsCustom(false);
              }}
              className={`flex-1 py-1 text-xs rounded ${
                slippage === option && !isCustom 
                  ? 'bg-blue-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {option}%
            </button>
          ))}
        </div>
        
        <div className="flex items-center">
          <input
            type="number"
            value={isCustom ? customSlippage : ''}
            onChange={handleCustomSlippage}
            onFocus={() => setIsCustom(true)}
            placeholder="Custom"
            className="w-full bg-gray-700 p-2 rounded text-sm"
          />
          <span className="ml-2 text-xs">%</span>
        </div>
        
        {slippage < 0.5 && (
          <p className="text-xs text-yellow-400 mt-2">
            Low slippage may cause failed transactions
          </p>
        )}
        {slippage > 2 && (
          <p className="text-xs text-red-400 mt-2">
            High slippage increases price impact
          </p>
        )}
      </div>
    </div>
  );
}