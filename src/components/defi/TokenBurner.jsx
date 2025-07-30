import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenAmountInput from '../ui/TokenAmountInput';
import ConfirmationModal from '../../modals/ConfirmationModal';

export default function TokenBurner() {
  const { tokenBalance, burnTokens } = useWeb3();
  const [amount, setAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = async () => {
    if (!amount || isNaN(amount)) return;
    
    setIsBurning(true);
    try {
      await burnTokens(amount);
      alert(`Successfully burned ${amount} PLK tokens`);
      setAmount('');
    } catch (error) {
      console.error('Burning failed:', error);
    } finally {
      setIsBurning(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Token Burner</h3>
      
      <div className="space-y-4">
        <div className="bg-red-900 text-red-200 p-4 rounded-lg">
          <p className="font-bold mb-1">⚠️ Warning</p>
          <p className="text-sm">
            Burning tokens permanently removes them from circulation. This action cannot be undone.
          </p>
        </div>
        
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenBalance={tokenBalance}
          tokenSymbol="PLK"
          onMax={() => setAmount(tokenBalance)}
        />
        
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!amount || isBurning}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !amount ? 'bg-gray-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isBurning ? 'Burning...' : 'Burn Tokens'}
        </button>
      </div>
      
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleBurn}
        title="Confirm Token Burn"
        message={`Are you sure you want to burn ${amount} PLK tokens? This action is irreversible.`}
        confirmText="Burn Tokens"
        isDestructive={true}
      />
    </div>
  );
}