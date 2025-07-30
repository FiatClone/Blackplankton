import React from 'react';

const GavernancePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Governance</h1>
      <div className="bg-white shadow rounded p-4 max-w-2xl">
        <p className="text-gray-600 mb-4">
          Participate in governance by submitting or voting on proposals.
        </p>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
          Create Proposal
        </button>
      </div>
    </div>
  );
};

export default GavernancePage;