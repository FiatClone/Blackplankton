import { useAirdrop } from '../../../hooks/useAirdrop';

export default function AirdropLeaderboard() {
  const { leaderboard, loading } = useAirdrop();

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Airdrop Leaderboard</h3>
      
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((user, index) => (
            <div 
              key={user.address} 
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                  index < 3 ? 'bg-yellow-500 text-black' : 'bg-gray-600'
                }`}>
                  {index + 1}
                </span>
                <span className="font-mono">
                  {`${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
                </span>
              </div>
              <span className="text-yellow-400">{user.points} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}