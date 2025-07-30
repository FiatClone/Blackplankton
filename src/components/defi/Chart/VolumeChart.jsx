import { useRef, useEffect } from 'react';
import { useTradeVolume } from '../../../hooks/useTradeVolume';

export default function VolumeChart() {
  const { volumeData, loading } = useTradeVolume();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!volumeData.length || !chartRef.current) return;

    // Initialize chart with volume data
    const ctx = chartRef.current.getContext('2d');
    
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: volumeData.map(item => new Date(item.timestamp).toLocaleDateString()),
        datasets: [{
          label: 'Trading Volume (PLK)',
          data: volumeData.map(item => item.volume),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + ' PLK';
              }
            }
          }
        }
      }
    });
  }, [volumeData]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Trading Volume (24h)</h3>
      {loading ? (
        <div className="h-64 bg-gray-700 rounded animate-pulse"></div>
      ) : (
        <canvas ref={chartRef} height="300"></canvas>
      )}
    </div>
  );
}