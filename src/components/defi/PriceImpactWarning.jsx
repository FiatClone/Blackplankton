export default function PriceImpactWarning({ impact }) {
  if (!impact || impact < 0.01) return null;

  const severity = impact > 5 ? 'high' : impact > 1 ? 'medium' : 'low';
  
  const config = {
    high: {
      color: 'text-red-400',
      message: 'High price impact (>5%). Consider splitting your trade.'
    },
    medium: {
      color: 'text-yellow-400',
      message: 'Medium price impact (1-5%). Your trade may affect the price.'
    },
    low: {
      color: 'text-green-400',
      message: 'Low price impact (<1%). Minimal effect on price.'
    }
  };

  return (
    <div className={`bg-gray-800 p-3 rounded-lg border ${config[severity].color} border-opacity-30 mb-4`}>
      <div className="flex items-start">
        <span className={`mr-2 ${config[severity].color}`}>⚠️</span>
        <div>
          <p className={`text-sm ${config[severity].color}`}>
            {config[severity].message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Price impact: {impact.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}