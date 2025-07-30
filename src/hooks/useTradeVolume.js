import { useEffect, useState } from 'react';
import { useContract } from '@thirdweb-dev/react';

export function useTradeVolume() {
  const [volumeData, setVolumeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { contract } = useContract(process.env.REACT_APP_DEX_CONTRACT);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        // Simulate fetching trade volume from contract events
        const events = await contract.events.getEvents('TradeExecuted');
        
        const dailyVolumes = events.reduce((acc, event) => {
          const date = new Date(event.data.timestamp * 1000).toDateString();
          acc[date] = (acc[date] || 0) + parseFloat(event.data.amount);
          return acc;
        }, {});

        const formattedData = Object.entries(dailyVolumes).map(([date, volume]) => ({
          timestamp: new Date(date).getTime(),
          volume
        })).slice(-30); // Last 30 days

        setVolumeData(formattedData);
      } catch (error) {
        console.error('Error fetching volume data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumeData();
  }, [contract]);

  return { volumeData, loading };
}