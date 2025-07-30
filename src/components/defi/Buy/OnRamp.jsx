import { useState } from 'react';
import { useWeb3 } from '../../../../contexts/Web3Context';

const paymentMethods = [
  { id: 'credit', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  { id: 'paypal', name: 'PayPal', icon: '🔵' },
];

export default function OnRamp() {
  const { address } = useWeb3();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuy = async () => {
    if (!amount || !address) return;
    setIsProcessing(true);
    
    // Simulate API call to fiat on-ramp service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert(`Success! ${amount} ${currency} worth of crypto will be sent to your wallet.`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Buy Crypto</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2">Amount</label>
          <div className="flex items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl w-full outline-none"
              placeholder="0.0"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-600 ml-2 p-2 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-gray-400 mb-2">Payment Method</label>
          <div className="space-y-2">
            {paymentMethods.map(method => (
              <div 
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${paymentMethod === method.id ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}
              >
                <span className="text-xl mr-3">{method.icon}</span>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">You Will Receive</h4>
          <p className="text-xl">≈ {(amount * 0.95).toFixed(2)} {currency} worth of PLK</p>
          <p className="text-sm text-gray-400 mt-1">Includes 5% service fee</p>
        </div>

        <button
          onClick={handleBuy}
          disabled={!amount || isProcessing || !address}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
            }
