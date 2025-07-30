import React from 'react';

const AirdropPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Claim Airdrop</h1>
      <div className="max-w-md bg-white shadow rounded p-4 space-y-4">
        <p className="text-gray-600">Check if you're eligible for the current airdrop.</p>
        <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Check & Claim
        </button>
      </div>
    </div>
  );
};

export default AirdropPage;