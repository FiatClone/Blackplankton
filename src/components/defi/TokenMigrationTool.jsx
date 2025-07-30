import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenAmountInput from '../ui/TokenAmountInput';

export default function TokenMigrationTool() {
  const { address, tokenBalance, migrateTokens } = useWeb3();
  const [amount, setAmount] = useState('');
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigration = async () => {
    if (!amount || !address) return;
    setIsMigrating(true);
    try {
      await migrateTokens(amount);
      alert('Token migration completed successfully!');
      setAmount('');
    } catch (error) {
      console.error('Migration failed:', error);
      alert('Migration failed. See console for details.');
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Token Migration</h3>
      <div className="space-y-4">
        <div className="bg-yellow-900 text-yellow-200 p-4 rounded-lg">
          <p className="font-bold mb-2">⚠️ Important Notice</p>
          <p className="text-sm">
            You are about to migrate from the old PLK token to the new PLKv2 token.
            The migration ratio is 1:1. This action cannot be undone.
          </p>
        </div>
        
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenBalance={tokenBalance}
          tokenSymbol="PLK (old)"
          onMax={() => setAmount(tokenBalance)}
        />
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">You Will Receive</h4>
          <p className="text-xl">{amount || 0} PLKv2</p>
        </div>
        
        <button
          onClick={handleMigration}
          disabled={!amount || isMigrating || !address}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !amount || !address ? 'bg-gray-600 cursor-not-allowed' : 
            isMigrating ? 'bg-blue-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isMigrating ? 'Migrating...' : 'Migrate Tokens'}
        </button>
      </div>
    </div>
  );
}