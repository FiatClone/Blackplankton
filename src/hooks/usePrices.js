import { useEffect, useState } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';

export function usePrices() {
  const [priceHistory, setPriceHistory] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const { contract } = useContract(process.env.REACT_APP_PRICE_ORACLE_CONTRACT);

  const { data: priceData } = useContractRead(contract, 'getLatestPrice');

  useEffect(() => {
    const fetchPriceHistory = async () => {
      // Simulate fetching from API
      const mockHistory = Array.from({ length: 30 }, (_, i) => ({
        timestamp: Date.now() - (i * 86400000),
        price: (Math.random() * 0.2 + 0.9).toFixed(4)
      })).reverse();
      
      setPriceHistory(mockHistory);
    };

    fetchPriceHistory();
  }, []);

  useEffect(() => {
    if (priceData) {
      setCurrentPrice(parseFloat(priceData.toString()) / 1e8);
    }
  }, [priceData]);

  return {
    currentPrice,
    priceHistory,
    loading: !priceHistory.length
  };
}