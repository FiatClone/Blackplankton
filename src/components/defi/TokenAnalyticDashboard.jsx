import { useState } from 'react';
import { useTokenMetrics } from '../../../hooks/useTokenMetrics';
import PriceChart from '../Chart/PriceChart';
import VolumeChart from '../Chart/VolumeChart';
import HolderDistributionChart from '../Chart/HolderDistributionChart';

const timeRanges = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '1y', label: '1 Year' },
  { value: 'all', label: 'All Time' }
];

export default function TokenAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const { priceData, volumeData, holdersData, loading } = useTokenMetrics(timeRange);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Token Analytics</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-700 p-2 rounded"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-700 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-xl">
            <h4 className="text-gray-400 mb-4">Price History</h4>
            <PriceChart data={priceData} />
          </div>
          
          <div className="bg-gray-700 p-4 rounded-xl">
            <h4 className="text-gray-400 mb-4">Trading Volume</h4>
            <VolumeChart data={volumeData} />
          </div>
          
          <div className="lg:col-span-2 bg-gray-700 p-4 rounded-xl">
            <h4 className="text-gray-400 mb-4">Holder Distribution</h4>
            <HolderDistributionChart data={holdersData} />
          </div>
        </div>
      )}
    </div>
  );
}