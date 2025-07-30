import { useWeb3 } from '../../../contexts/Web3Context';
import { formatTimeAgo } from '../../../utils/format';

export default function RecentTransactions() {
  const { transactions } = useWeb3();

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
      
      {transactions.length === 0 ? (
        <p className="text-gray-400">No recent transactions</p>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.hash} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  tx.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {tx.type === 'swap' ? '🔄' : 
                   tx.type === 'stake' ? '💰' : 
                   tx.type === 'unstake' ? '💸' : '📝'}
                </div>
                <div>
                  <p className="capitalize">{tx.type}</p>
                  <p className="text-xs text-gray-400">{formatTimeAgo(tx.timestamp)}</p>
                </div>
              </div>
              <a 
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}