import { useWeb3 } from '../../contexts/Web3Context';

export default function TokenBadge() {
  const { tokenBalance } = useWeb3();

  return (
    <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
      <img 
        src="/images/tokens/plk.png" 
        alt="PLK" 
        className="h-5 w-5 mr-2"
      />
      <span className="font-medium">
        {tokenBalance ? parseFloat(tokenBalance).toFixed(2) : '0'} PLK
      </span>
    </div>
  );
}