import { useLiquidity } from '../../../hooks/useLiquidity';
import { calculateLiquidityValue } from '../../../utils/defiMath';

export default function LiquidityPositionDetail({ pairAddress, token0, token1 }) {
  const { reserves, userLpTokens, totalSupply, loading } = useLiquidity(pairAddress);
  const [shareValue, setShareValue] = useState({ token0: 0, token1: 0 });

  useEffect(() => {
    if (!loading && totalSupply > 0) {
      const value = calculateLiquidityValue(
        reserves.token0,
        reserves.token1,
        totalSupply,
        userLpTokens
      );
      setShareValue(value);
    }
  }, [reserves, userLpTokens, totalSupply, loading]);

  if (loading) return <div className="h-32 bg-gray-800 rounded-xl animate-pulse"></div>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Your Liquidity</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Pool Share</h4>
          <p className="text-2xl">
            {totalSupply > 0 ? ((userLpTokens / totalSupply) * 100).toFixed(4) : 0}%
          </p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Your Pool Tokens</h4>
          <p className="text-xl">{userLpTokens.toFixed(6)} LP</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Underlying Assets</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{token0.symbol}</span>
              <span>{shareValue.token0.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span>{token1.symbol}</span>
              <span>{shareValue.token1.toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}