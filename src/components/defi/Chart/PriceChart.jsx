import { useEffect, useRef } from 'react';
import { usePrices } from '../../../hooks/usePrices';

export default function PriceChart() {
  const { priceHistory, loading } = usePrices();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!priceHistory.length || !chartRef.current) return;

    // Initialize chart using a library like Chart.js or D3.js
    // This is a placeholder for actual chart implementation
    const ctx = chartRef.current.getContext('2d');
    
    // Clean up previous chart if exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Example using Chart.js (would need to install and import)
    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: priceHistory.map(item => new Date(item.timestamp).toLocaleDateString()),
        datasets: [{
          label: 'PLK Price',
          data: priceHistory.map(item => item.price),
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          }
        }
      }
    });
  }, [priceHistory]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Price Chart</h3>
      {loading ? (
        <div className="h-64 bg-gray-700 rounded animate-pulse"></div>
      ) : (
        <canvas ref={chartRef} height="300"></canvas>
      )}
    </div>
  );
}
