import { useState, useEffect } from 'react';

export function useTokenMetrics(timeRange) {
  const [metrics, setMetrics] = useState({
    priceData: [],
    volumeData: [],
    holdersData: [],
    loading: true
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // TODO: Replace with actual API calls
        const mockPriceData = generateMockData(timeRange, 100, 200);
        const mockVolumeData = generateMockData(timeRange, 10000, 50000);
        const mockHoldersData = [
          { range: '1-100 PLK', holders: 45, percentage: 45 },
          { range: '100-1K PLK', holders: 30, percentage: 30 },
          { range: '1K-10K PLK', holders: 15, percentage: 15 },
          { range: '10K+ PLK', holders: 10, percentage: 10 }
        ];
        
        setMetrics({
          priceData: mockPriceData,
          volumeData: mockVolumeData,
          holdersData: mockHoldersData,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching token metrics:', error);
        setMetrics(prev => ({ ...prev, loading: false }));
      }
    };

    setMetrics(prev => ({ ...prev, loading: true }));
    fetchMetrics();
  }, [timeRange]);

  return metrics;
}

// Helper function to generate mock data
function generateMockData(range, min, max) {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 86400000),
    value: min + Math.random() * (max - min)
  }));
}