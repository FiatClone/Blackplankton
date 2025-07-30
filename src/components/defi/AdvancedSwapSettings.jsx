import { useState } from 'react';

export default function AdvancedSwapSettings({
  slippage,
  setSlippage,
  deadline,
  setDeadline,
  isExpertMode,
  setIsExpertMode
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-white text-sm flex items-center"
      >
        ⚙️ Advanced
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg z-10 p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slippage Tolerance (%)</label>
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded"
              min="0"
              max="50"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Transaction Deadline (mins)</label>
            <input
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded"
              min="1"
              max="30"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="expertMode"
              checked={isExpertMode}
              onChange={() => setIsExpertMode(!isExpertMode)}
              className="mr-2"
            />
            <label htmlFor="expertMode" className="text-sm text-gray-300">
              Expert Mode
            </label>
          </div>
          
          {isExpertMode && (
            <p className="text-xs text-red-400">
              Expert mode allows high slippage trades that may result in significant losses.
              Use at your own risk.
            </p>
          )}
        </div>
      )}
    </div>
  );
}