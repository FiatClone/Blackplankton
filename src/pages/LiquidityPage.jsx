import React from 'react';

const LiquidityPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Liquidity</h1>
      <div className="max-w-md bg-white shadow rounded p-4 space-y-4">
        <input
          type="number"
          placeholder="Token A Amount"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Token B Amount"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Provide Liquidity
        </button>
      </div>
    </div>
  );
};

export default LiquidityPage;