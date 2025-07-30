import { useContract, useContractWrite } from '@thirdweb-dev/react';

export function useTokenTransfer() {
  const { contract } = useContract(process.env.REACT_APP_TOKEN_CONTRACT);
  const { mutateAsync: transfer, isLoading } = useContractWrite(
    contract,
    'transfer'
  );

  const executeTransfer = async (to, amount) => {
    try {
      const tx = await transfer({ args: [to, amount] });
      return tx;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  };

  return { executeTransfer, isLoading };
}