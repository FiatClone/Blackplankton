import { useBalances } from '../../hooks/useBalances';
import { usePrices } from '../../hooks/usePrices';

export default function DashboardStats() {
  const { native, token, staked, loading } = useBalances();
  const { currentPrice } = usePrices();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-xl h-32 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-xl">
        <h4 className="text-gray-400 mb-2">PLK Balance</h4>
        <p className="text-2xl font-bold">{token.toFixed(4)} PLK</p>
        <p className="text-gray-400 mt-1">≈ ${(token * currentPrice).toFixed(2)}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-xl">
        <h4 className="text-gray-400 mb-2">Staked PLK</h4>
        <p className="text-2xl font-bold">{staked.toFixed(4)} PLK</p>
        <p className="text-gray-400 mt-1">≈ ${(staked * currentPrice).toFixed(2)}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-xl">
        <h4 className="text-gray-400 mb-2">Native Balance</h4>
        <p className="text-2xl font-bold">{native.toFixed(4)} ETH</p>
      </div>
    </div>
  );
}