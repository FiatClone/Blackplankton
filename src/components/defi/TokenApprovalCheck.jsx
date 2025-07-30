import { useEffect, useState } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { useWeb3 } from '../../../contexts/Web3Context';

export default function TokenApprovalChecker({ spender, tokenAddress }) {
  const { address } = useWeb3();
  const [allowance, setAllowance] = useState(0);
  const [needsApproval, setNeedsApproval] = useState(false);
  
  const { contract: tokenContract } = useContract(tokenAddress, 'token');
  const { data: allowanceData } = useContractRead(
    tokenContract,
    'allowance',
    [address, spender]
  );

  useEffect(() => {
    if (allowanceData) {
      const allowanceAmount = parseFloat(allowanceData.toString()) / 1e18;
      setAllowance(allowanceAmount);
      setNeedsApproval(allowanceAmount <= 0);
    }
  }, [allowanceData]);

  const handleApprove = async () => {
    try {
      await tokenContract.call('approve', [spender, ethers.constants.MaxUint256]);
      setNeedsApproval(false);
      toast.success('Token approval successful');
    } catch (error) {
      console.error('Approval failed:', error);
      toast.error('Token approval failed');
    }
  };

  if (!needsApproval) return null;

  return (
    <div className="bg-yellow-900 text-yellow-200 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold mb-1">Approval Required</h4>
          <p className="text-sm">
            You need to approve the contract to spend your tokens
          </p>
        </div>
        <button
          onClick={handleApprove}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Approve Tokens
        </button>
      </div>
    </div>
  );
}