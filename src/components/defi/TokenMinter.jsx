import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenAmountInput from '../ui/TokenAmountInput';
import ConfirmationModal from '../../modals/ConfirmationModal';

export default function TokenMinter({ isAdmin }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!recipient || !amount || isNaN(amount)) return;
    
    setIsMinting(true);
    try {
      // TODO: Implement minting logic
      console.log(`Minting ${amount} PLK to ${recipient}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Successfully minted ${amount} PLK to ${recipient}`);
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsMinting(false);
      setShowConfirm(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto text-center">
        <h3 className="text-xl font-bold mb-4">Token Minter</h3>
        <p className="text-gray-400">
          You must be an administrator to access this feature
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Token Minter</h3>
      
      <div className="space-y-4">
        <div className="bg-green-900 text-green-200 p-4 rounded-lg">
          <p className="font-bold mb-1">Admin Function</p>
          <p className="text-sm">
            This feature allows creating new tokens. Use responsibly.
          </p>
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full bg-gray-700 p-3 rounded-lg"
          />
        </div>
        
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenSymbol="PLK"
        />
        
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!recipient || !amount || isMinting}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !recipient || !amount ? 'bg-gray-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isMinting ? 'Minting...' : 'Mint Tokens'}
        </button>
      </div>
      
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleMint}
        title="Confirm Token Mint"
        message={`Mint ${amount} PLK tokens to ${recipient}?`}
        confirmText="Mint Tokens"
      />
    </div>
  );
}