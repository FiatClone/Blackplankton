import React from 'react';

const SwapPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Swap Tokens</h1>
      <div className="max-w-md bg-white shadow rounded p-4 space-y-4">
        <input
          type="text"
          placeholder="From Token (e.g. ETH)"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="To Token (e.g. PLK)"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Swap Now
        </button>
      </div>
    </div>
  );
};

export default SwapPage;