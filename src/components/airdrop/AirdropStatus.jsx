import { useAirdrop } from '../../../hooks/useAirdrop';
import ProgressBar from '../ui/ProgressBar';

export default function AirdropStatus() {
  const { eligibility, claimed, totalRewards, claimAirdrop } = useAirdrop();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    setIsClaiming(true);
    try {
      await claimAirdrop();
    } catch (error) {
      console.error('Claim failed:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Airdrop Status</h3>
      
      {eligibility ? (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Progress</span>
              <span>{claimed ? 'Claimed' : 'Available'}</span>
            </div>
            <ProgressBar value={(claimed / totalRewards) * 100} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Your Allocation</p>
              <p className="text-lg font-bold">{totalRewards} PLK</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Claimed</p>
              <p className="text-lg font-bold">{claimed} PLK</p>
            </div>
          </div>
          
          <button
            onClick={handleClaim}
            disabled={claimed >= totalRewards || isClaiming}
            className={`w-full py-3 rounded-lg font-semibold ${
              claimed >= totalRewards 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-yellow-600 hover:bg-yellow-700'
            }`}
          >
            {isClaiming ? 'Claiming...' : 'Claim Airdrop'}
          </button>
        </div>
      ) : (
        <p className="text-gray-400">
          You are not eligible for the current airdrop. Complete more tasks to qualify.
        </p>
      )}
    </div>
  );
}