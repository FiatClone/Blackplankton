import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const speedLabels = {
  slow: { label: 'Slow', color: 'text-gray-400' },
  average: { label: 'Average', color: 'text-yellow-400' },
  fast: { label: 'Fast', color: 'text-green-400' }
};

export default function GasPriceTracker() {
  const [gasPrices, setGasPrices] = useState({
    slow: 0,
    average: 0,
    fast: 0,
    loading: true
  });
  const [selectedSpeed, setSelectedSpeed] = useState('average');

  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const feeData = await provider.getFeeData();
        
        // Convert from wei to gwei
        setGasPrices({
          slow: Math.round(Number(ethers.utils.formatUnits(feeData.gasPrice.mul(80).div(100), 'gwei')),
          average: Math.round(Number(ethers.utils.formatUnits(feeData.gasPrice, 'gwei'))),
          fast: Math.round(Number(ethers.utils.formatUnits(feeData.gasPrice.mul(120).div(100), 'gwei'))),
          loading: false
        });
      } catch (error) {
        console.error('Error fetching gas prices:', error);
        setGasPrices(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGasPrices();
    const interval = setInterval(fetchGasPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h4 className="text-gray-400">Gas Price</h4>
        
        <div className="flex space-x-3">
          {Object.entries(speedLabels).map(([speed, { label, color }]) => (
            <button
              key={speed}
              onClick={() => setSelectedSpeed(speed)}
              className={`text-sm ${selectedSpeed === speed ? color + ' font-bold' : 'text-gray-500'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-2">
        {gasPrices.loading ? (
          <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <div className="flex items-end space-x-1">
            <span className="text-2xl font-bold">
              {gasPrices[selectedSpeed]}
            </span>
            <span className="text-gray-400 mb-1">Gwei</span>
          </div>
        )}
      </div>
    </div>
  );
}