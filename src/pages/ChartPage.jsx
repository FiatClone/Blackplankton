import React from 'react';

const ChartPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Token Price Chart</h1>
      <div className="bg-white shadow rounded p-4">
        {/* Replace with real chart component */}
        <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
          <span className="text-gray-500">[Chart Placeholder]</span>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;