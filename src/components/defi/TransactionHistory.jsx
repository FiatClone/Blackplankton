import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import { formatDate, formatCurrency } from '../../../utils/format';

const transactionTypes = {
  swap: { label: 'Swap', color: 'bg-blue-500' },
  stake: { label: 'Stake', color: 'bg-green-500' },
  unstake: { label: 'Unstake', color: 'bg-yellow-500' },
  add_liquidity: { label: 'Add Liquidity', color: 'bg-purple-500' },
  remove_liquidity: { label: 'Remove Liquidity', color: 'bg-red-500' }
};

export default function TransactionHistory() {
  const { transactions } = useWeb3();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Transaction History</h3>
      
      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="pb-2 text-left">Type</th>
                  <th className="pb-2 text-left">Amount</th>
                  <th className="pb-2 text-left">Date</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paginatedTransactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="py-3">
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        transactionTypes[tx.type]?.color || 'bg-gray-500'
                      } mr-2`}></span>
                      {transactionTypes[tx.type]?.label || tx.type}
                    </td>
                    <td className="py-3">
                      {tx.amount ? formatCurrency(tx.amount) : '-'}
                    </td>
                    <td className="py-3">
                      {formatDate(tx.timestamp)}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        tx.status === 'success' 
                          ? 'bg-green-900 text-green-400' 
                          : 'bg-red-900 text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <a 
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}