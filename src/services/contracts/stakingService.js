import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { useTransaction } from '../../hooks/useTransaction';

export function useStakingActions() {
  const { contract } = useContract(process.env.REACT_APP_STAKING_CONTRACT);
  const { executeTransaction } = useTransaction();

  const stakeTokens = async (amount) => {
    return executeTransaction(
      'stake',
      [amount],
      { contract }
    );
  };

  const unstakeTokens = async (amount) => {
    return executeTransaction(
      'unstake',
      [amount],
      { contract }
    );
  };

  const claimRewards = async () => {
    return executeTransaction(
      'claimRewards',
      [],
      { contract }
    );
  };

  return {
    stakeTokens,
    unstakeTokens,
    claimRewards,
  };
}