import { useEffect, useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import { usePrices } from '../../../hooks/usePrices';
import { formatCurrency } from '../../../utils/format';

export default function PortfolioValue() {
  const { tokenBalance, stakedBalance, liquidityPositions } = useWeb3();
  const { currentPrice } = usePrices();
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (!currentPrice) return;

    const calculatedAssets = [];
    let totalValue = 0;

    // Token balance
    const tokenValue = tokenBalance * currentPrice;
    calculatedAssets.push({
      name: 'PLK Balance',
      value: tokenValue,
      percentage: 0
    });
    totalValue += tokenValue;

    // Staked balance
    const stakedValue = stakedBalance * currentPrice;
    calculatedAssets.push({
      name: 'Staked PLK',
      value: stakedValue,
      percentage: 0
    });
    totalValue += stakedValue;

    // Liquidity positions
    liquidityPositions.forEach(position => {
      const positionValue = position.amount * position.price;
      calculatedAssets.push({
        name: `${position.pair} LP`,
        value: positionValue,
        percentage: 0
      });
      totalValue += positionValue;
    });

    // Calculate percentages
    calculatedAssets.forEach(asset => {
      asset.percentage = totalValue > 0 ? (asset.value / totalValue) * 100 : 0;
    });

    setAssets(calculatedAssets);
    setPortfolioValue(totalValue);
  }, [tokenBalance, stakedBalance, liquidityPositions, currentPrice]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Portfolio Value</h3>
      
      <div className="text-3xl font-bold mb-6">
        {formatCurrency(portfolioValue)}
      </div>

      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span>{asset.name}</span>
              <span>{formatCurrency(asset.value)} ({asset.percentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${asset.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}