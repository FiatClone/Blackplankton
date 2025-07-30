import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';

export default function TokenWrapInterface() {
  const { nativeBalance, wrappedBalance, wrapToken, unwrapToken } = useWeb3();
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('wrap');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    if (!amount || isNaN(amount)) return;
    
    setIsProcessing(true);
    try {
      if (action === 'wrap') {
        await wrapToken(amount);
        alert(`${amount} ETH wrapped to WETH successfully!`);
      } else {
        await unwrapToken(amount);
        alert(`${amount} WETH unwrapped to ETH successfully!`);
      }
      setAmount('');
    } catch (error) {
      console.error(`${action} failed:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Wrap/Unwrap ETH</h3>
      
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setAction('wrap')}
          className={`flex-1 py-2 rounded-lg ${
            action === 'wrap' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Wrap
        </button>
        <button
          onClick={() => setAction('unwrap')}
          className={`flex-1 py-2 rounded-lg ${
            action === 'unwrap' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Unwrap
        </button>
      </div>
      
      <div className="space-y-4">
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenBalance={action === 'wrap' ? nativeBalance : wrappedBalance}
          tokenSymbol={action === 'wrap' ? 'ETH' : 'WETH'}
          onMax={() => setAmount(action === 'wrap' ? nativeBalance : wrappedBalance)}
        />
        
        <div className="flex justify-center">
          <span className="text-gray-400">
            {action === 'wrap' ? 'ETH → WETH' : 'WETH → ETH'}
          </span>
        </div>
        
        <button
          onClick={handleAction}
          disabled={!amount || isProcessing}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !amount ? 'bg-gray-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isProcessing ? 'Processing...' : action === 'wrap' ? 'Wrap ETH' : 'Unwrap WETH'}
        </button>
      </div>
    </div>
  );
}