import { useState, useEffect } from 'react';
import { calculateAPY } from '../../../utils/defiMath';

export default function StakingRewardsCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [apy, setApy] = useState(12);
  const [duration, setDuration] = useState(30);
  const [compounding, setCompounding] = useState('daily');
  const [futureValue, setFutureValue] = useState(0);
  const [rewards, setRewards] = useState(0);

  const compoundingFreq = {
    daily: 365,
    weekly: 52,
    monthly: 12,
    yearly: 1
  };

  useEffect(() => {
    const periods = duration / 365 * compoundingFreq[compounding];
    const rate = apy / 100 / compoundingFreq[compounding];
    const calculatedValue = principal * Math.pow(1 + rate, periods);
    setFutureValue(calculatedValue);
    setRewards(calculatedValue - principal);
  }, [principal, apy, duration, compounding]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Staking Rewards Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">
              Principal Amount (PLK): {principal}
            </label>
            <input
              type="range"
              min="1"
              max="100000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-2">
              APY (%): {apy}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              step="0.1"
              value={apy}
              onChange={(e) => setApy(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-2">
              Duration (days): {duration}
            </label>
            <input
              type="range"
              min="1"
              max="3650"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-2">Compounding Frequency</label>
            <select
              value={compounding}
              onChange={(e) => setCompounding(e.target.value)}
              className="w-full bg-gray-700 p-3 rounded-lg"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-700 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-400 mb-1">Initial Investment</h4>
              <p className="text-2xl">{principal} PLK</p>
            </div>
            
            <div>
              <h4 className="text-gray-400 mb-1">Future Value</h4>
              <p className="text-2xl text-green-400">
                {futureValue.toFixed(2)} PLK
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-400 mb-1">Estimated Rewards</h4>
              <p className="text-2xl text-yellow-400">
                {rewards.toFixed(2)} PLK
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-400 mb-1">Effective APY</h4>
              <p className="text-xl">
                {calculateAPY(apy/100, compoundingFreq[compounding]).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}