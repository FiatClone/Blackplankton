import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenAmountInput from '../ui/TokenAmountInput';
import { ChainId } from '@thirdweb-dev/sdk';

const networks = [
  { id: ChainId.Mainnet, name: 'Ethereum', icon: '🟢' },
  { id: ChainId.Polygon, name: 'Polygon', icon: '🟣' },
  { id: ChainId.Arbitrum, name: 'Arbitrum', icon: '🔵' },
  { id: ChainId.Optimism, name: 'Optimism', icon: '🟠' }
];

export default function TokenBridge() {
  const { chainId, switchNetwork } = useWeb3();
  const [fromChain, setFromChain] = useState(chainId || ChainId.Mainnet);
  const [toChain, setToChain] = useState(ChainId.Polygon);
  const [amount, setAmount] = useState('');
  const [isBridging, setIsBridging] = useState(false);

  const handleBridge = async () => {
    if (!amount || isNaN(amount)) return;
    
    setIsBridging(true);
    try {
      // TODO: Implement bridge logic
      console.log(`Bridging ${amount} PLK from ${fromChain} to ${toChain}`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Tokens bridged successfully!');
      setAmount('');
    } catch (error) {
      console.error('Bridging failed:', error);
    } finally {
      setIsBridging(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Token Bridge</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <label className="block text-gray-400 mb-2 text-sm">From</label>
            <select
              value={fromChain}
              onChange={(e) => setFromChain(Number(e.target.value))}
              className="w-full bg-gray-600 p-2 rounded"
            >
              {networks.map(network => (
                <option key={network.id} value={network.id}>
                  {network.icon} {network.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-lg">
            <label className="block text-gray-400 mb-2 text-sm">To</label>
            <select
              value={toChain}
              onChange={(e) => setToChain(Number(e.target.value))}
              className="w-full bg-gray-600 p-2 rounded"
            >
              {networks.filter(n => n.id !== fromChain).map(network => (
                <option key={network.id} value={network.id}>
                  {network.icon} {network.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <TokenAmountInput
          value={amount}
          onChange={setAmount}
          tokenSymbol="PLK"
        />
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Estimated Bridge Time</h4>
          <p className="text-lg">
            {fromChain === ChainId.Mainnet || toChain === ChainId.Mainnet 
              ? '10-30 minutes' 
              : '3-5 minutes'}
          </p>
        </div>
        
        <button
          onClick={handleBridge}
          disabled={!amount || isBridging || fromChain === toChain}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !amount || fromChain === toChain 
              ? 'bg-gray-700 text-gray-500' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isBridging ? 'Bridging...' : 'Bridge Tokens'}
        </button>
      </div>
    </div>
  );
}