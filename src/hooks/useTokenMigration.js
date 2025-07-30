import { useState } from 'react';
import { useContractWrite } from '@thirdweb-dev/react';

export function useTokenMigration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { mutateAsync: migrate } = useContractWrite(
    process.env.REACT_APP_OLD_TOKEN_CONTRACT,
    'approveAndCall'
  );

  const migrateTokens = async (amount) => {
    if (!amount || isNaN(amount)) {
      setError('Invalid amount');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Convert amount to wei
      const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
      
      // Call migration function
      await migrate({
        args: [
          process.env.REACT_APP_MIGRATION_CONTRACT,
          amountWei,
          '0x' // Additional data if needed
        ]
      });
    } catch (err) {
      console.error('Migration failed:', err);
      setError(err.message || 'Migration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    migrateTokens,
    isLoading,
    error
  };
}