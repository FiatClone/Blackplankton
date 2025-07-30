import React from 'react';

const BuyPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Buy Token</h1>
      <p className="mb-4 text-gray-600">Purchase tokens using your connected wallet.</p>
      <div className="max-w-md bg-white shadow rounded p-4 space-y-4">
        <input
          type="number"
          placeholder="Amount in USDT"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyPage;