import { createContext, useContext } from 'react';
import { useAddress, useChainId, useContract, useContractRead } from '@thirdweb-dev/react';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const address = useAddress();
  const chainId = useChainId();
  
  const { contract: tokenContract } = useContract(
    process.env.REACT_APP_TOKEN_CONTRACT,
    'token'
  );

  const { data: tokenBalance } = useContractRead(tokenContract, 'balanceOf', [address]);

  const value = {
    address,
    chainId,
    tokenBalance,
    tokenContract
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}