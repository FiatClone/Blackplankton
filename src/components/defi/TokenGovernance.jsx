import { useState, useEffect } from 'react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';

export function useTokenGovernance() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [proposalThreshold, setProposalThreshold] = useState(0);
  const [quorum, setQuorum] = useState(0);
  
  const { contract } = useContract(process.env.REACT_APP_GOVERNANCE_CONTRACT);
  const { mutateAsync: createProposal } = useContractWrite(contract, 'createProposal');
  
  // Check admin status
  const { data: adminRole } = useContractRead(contract, 'DEFAULT_ADMIN_ROLE');
  const { data: hasAdminRole } = useContractRead(
    contract,
    'hasRole',
    [adminRole, address]
  );

  // Get governance parameters
  const { data: threshold } = useContractRead(contract, 'proposalThreshold');
  const { data: quorumData } = useContractRead(contract, 'quorum');

  useEffect(() => {
    if (hasAdminRole !== undefined) {
      setIsAdmin(hasAdminRole);
    }
    
    if (threshold) {
      setProposalThreshold(parseFloat(ethers.utils.formatUnits(threshold, 18)));
    }
    
    if (quorumData) {
      setQuorum(parseFloat(ethers.utils.formatUnits(quorumData, 18)));
    }
  }, [hasAdminRole, threshold, quorumData]);

  const propose = async (title, description, actions) => {
    if (!isAdmin) throw new Error('Unauthorized');
    
    try {
      const tx = await createProposal({
        args: [
          title,
          description,
          actions.map(a => a.target),
          actions.map(a => ethers.utils.parseEther(a.value || '0')),
          actions.map(a => a.signature),
          actions.map(a => a.data)
        ]
      });
      return tx;
    } catch (error) {
      console.error('Proposal creation failed:', error);
      throw error;
    }
  };

  return {
    isAdmin,
    proposalThreshold,
    quorum,
    createProposal: propose
  };
}