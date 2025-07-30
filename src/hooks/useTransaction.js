import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export function useTransaction() {
  const { tokenContract } = useWeb3();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);

  const executeTransaction = async (method, args, options) => {
    setStatus('pending');
    setError(null);
    
    try {
      const tx = await tokenContract[method](...args, options);
      setTxHash(tx.hash);
      
      const receipt = await tx.wait();
      setStatus('success');
      return receipt;
    } catch (err) {
      console.error('Transaction failed:', err);
      setError(err.message);
      setStatus('error');
      throw err;
    }
  };

  return {
    executeTransaction,
    status,
    error,
    txHash,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}