import React from 'react';

const StakePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Stake Tokens</h1>
      <div className="max-w-md bg-white shadow rounded p-4 space-y-4">
        <input
          type="number"
          placeholder="Amount to Stake"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Stake
        </button>
      </div>
    </div>
  );
};

export default StakePage;