import { useState, useEffect } from 'react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export function useTokenVoting() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { contract } = useContract(process.env.REACT_APP_GOVERNANCE_CONTRACT);
  const { mutateAsync: castVote } = useContractWrite(contract, 'castVote');
  
  // Get active proposals
  const { data: activeProposals } = useContractRead(
    contract,
    'getActiveProposals'
  );

  useEffect(() => {
    const parseProposalData = (proposalData) => {
      return proposalData.map(proposal => ({
        id: proposal.id.toNumber(),
        title: proposal.title,
        description: proposal.description,
        forVotes: parseFloat(ethers.utils.formatUnits(proposal.forVotes, 18)),
        againstVotes: parseFloat(ethers.utils.formatUnits(proposal.againstVotes, 18)),
        totalVotes: parseFloat(ethers.utils.formatUnits(proposal.totalVotes, 18)),
        startTime: proposal.startTime.toNumber() * 1000,
        endTime: proposal.endTime.toNumber() * 1000,
        executed: proposal.executed
      }));
    };

    if (activeProposals) {
      setProposals(parseProposalData(activeProposals));
      setLoading(false);
    }
  }, [activeProposals]);

  const vote = async (proposalId, support, amount) => {
    try {
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      const tx = await castVote({ args: [proposalId, support, amountWei] });
      return tx;
    } catch (error) {
      console.error('Voting failed:', error);
      throw error;
    }
  };

  return {
    proposals,
    loading,
    castVote: vote
  };
}