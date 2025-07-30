import { useState, useEffect } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import ProgressBar from '../../ui/ProgressBar';

export default function TokenVoting() {
  const { tokenBalance, castVote, activeProposals } = useWeb3();
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [voteAmount, setVoteAmount] = useState('');
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (support) => {
    if (!selectedProposal || !voteAmount || isNaN(voteAmount)) return;
    
    setIsVoting(true);
    try {
      await castVote(selectedProposal.id, support, voteAmount);
      alert(`Vote cast successfully for proposal ${selectedProposal.id}`);
    } catch (error) {
      console.error('Voting failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Token Voting</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-gray-400 mb-2">Active Proposals</h4>
          
          {activeProposals.length === 0 ? (
            <p className="text-gray-400 py-8 text-center">No active proposals</p>
          ) : (
            <div className="space-y-3">
              {activeProposals.map(proposal => (
                <div 
                  key={proposal.id}
                  onClick={() => setSelectedProposal(proposal)}
                  className={`bg-gray-700 p-4 rounded-lg cursor-pointer ${
                    selectedProposal?.id === proposal.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <h5 className="font-medium mb-2">{proposal.title}</h5>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {proposal.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>For: {proposal.forVotes} PLK</span>
                        <span>{((proposal.forVotes / proposal.totalVotes) * 100 || 0).toFixed(1)}%</span>
                      </div>
                      <ProgressBar value={(proposal.forVotes / proposal.totalVotes) * 100} color="bg-green-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Against: {proposal.againstVotes} PLK</span>
                        <span>{((proposal.againstVotes / proposal.totalVotes) * 100 || 0).toFixed(1)}%</span>
                      </div>
                      <ProgressBar value={(proposal.againstVotes / proposal.totalVotes) * 100} color="bg-red-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h4 className="text-gray-400">Voting Power</h4>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Your PLK Balance</p>
            <p className="text-xl">{tokenBalance} PLK</p>
          </div>
          
          {selectedProposal && (
            <>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-medium mb-2">{selectedProposal.title}</h5>
                <p className="text-sm text-gray-400 mb-3">
                  Ends on: {new Date(selectedProposal.endTime).toLocaleDateString()}
                </p>
                
                <TokenAmountInput
                  value={voteAmount}
                  onChange={setVoteAmount}
                  tokenBalance={tokenBalance}
                  tokenSymbol="PLK"
                  onMax={() => setVoteAmount(tokenBalance)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleVote(true)}
                  disabled={!voteAmount || isVoting}
                  className={`py-3 rounded-lg font-semibold ${
                    !voteAmount ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isVoting ? 'Voting...' : 'Vote For'}
                </button>
                <button
                  onClick={() => handleVote(false)}
                  disabled={!voteAmount || isVoting}
                  className={`py-3 rounded-lg font-semibold ${
                    !voteAmount ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isVoting ? 'Voting...' : 'Vote Against'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}