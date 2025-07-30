import { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export function useTokenAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { contract } = useContract(process.env.REACT_APP_TOKEN_CONTRACT);
  const { mutateAsync: mint } = useContractWrite(contract, 'mint');
  const { mutateAsync: burn } = useContractWrite(contract, 'burn');
  
  // Check admin status
  const { data: adminRole } = useContractRead(contract, 'DEFAULT_ADMIN_ROLE');
  const { data: hasAdminRole } = useContractRead(
    contract,
    'hasRole',
    [adminRole, address]
  );

  useEffect(() => {
    if (hasAdminRole !== undefined) {
      setIsAdmin(hasAdminRole);
    }
  }, [hasAdminRole]);

  const mintTokens = async (recipient, amount) => {
    if (!isAdmin) throw new Error('Unauthorized');
    
    setIsLoading(true);
    try {
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      const tx = await mint({ args: [recipient, amountWei] });
      return tx;
    } catch (error) {
      console.error('Minting failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const burnTokens = async (amount) => {
    setIsLoading(true);
    try {
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      const tx = await burn({ args: [amountWei] });
      return tx;
    } catch (error) {
      console.error('Burning failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintTokens,
    burnTokens,
    isAdmin,
    isLoading
  };
}