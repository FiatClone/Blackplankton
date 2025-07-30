import { useState } from 'react';
import TokenAmountInput from '../ui/TokenAmountInput';
import { formatCurrency } from '../../../utils/format';

export default function TokenStreamCreator({ onCreateStream }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(30);
  const [tokenSymbol, setTokenSymbol] = useState('PLK');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateStream = async () => {
    if (!recipient || !amount || isNaN(amount) return;
    
    setIsCreating(true);
    try {
      const streamData = {
        recipient,
        amount: parseFloat(amount),
        duration,
        tokenSymbol,
        startTime: new Date(),
        endTime: new Date(Date.now() + duration * 86400000)
      };
      
      await onCreateStream(streamData);
      setRecipient('');
      setAmount('');
      setDuration(30);
      toast.success('Token stream created successfully!');
    } catch (error) {
      console.error('Stream creation failed:', error);
      toast.error('Failed to create token stream');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Create Token Stream</h3>
      
      <div className="space-y-4">
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
          tokenSymbol={tokenSymbol}
          onTokenChange={setTokenSymbol}
        />
        
        <div>
          <label className="block text-gray-400 mb-2">
            Duration: {duration} days
          </label>
          <input
            type="range"
            min="1"
            max="365"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Stream Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span>{formatCurrency(amount || 0)} {tokenSymbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Amount:</span>
              <span>{formatCurrency((amount || 0) / duration)} {tokenSymbol}/day</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleCreateStream}
          disabled={!recipient || !amount || isCreating}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !recipient || !amount ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isCreating ? 'Creating Stream...' : 'Create Stream'}
        </button>
      </div>
    </div>
  );
}