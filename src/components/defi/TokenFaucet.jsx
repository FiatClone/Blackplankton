import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';

export default function TokenFaucet() {
  const { chainId, requestTestnetTokens } = useWeb3();
  const [isRequesting, setIsRequesting] = useState(false);
  const [lastRequest, setLastRequest] = useState(null);

  const handleRequest = async () => {
    setIsRequesting(true);
    try {
      await requestTestnetTokens();
      setLastRequest(Date.now());
      alert('Testnet tokens sent successfully!');
    } catch (error) {
      console.error('Token request failed:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  if (chainId !== 5 && chainId !== 80001) { // Only show on Goerli and Mumbai
    return (
      <div className="bg-gray-800 p-6 rounded-xl text-center">
        <p className="text-gray-400">
          Token faucet is only available on test networks
        </p>
      </div>
    );
  }

  const canRequestAgain = !lastRequest || (Date.now() - lastRequest) > 86400000; // 24h cooldown

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Testnet Token Faucet</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">You Will Receive</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Test ETH:</span>
              <span>0.1 ETH</span>
            </div>
            <div className="flex justify-between">
              <span>Test PLK:</span>
              <span>1000 PLK</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-2">Faucet Rules</h4>
          <ul className="text-sm space-y-1">
            <li>• 1 request per 24 hours</li>
            <li>• For testing purposes only</li>
            <li>• Tokens have no real value</li>
          </ul>
        </div>
        
        <button
          onClick={handleRequest}
          disabled={isRequesting || !canRequestAgain}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !canRequestAgain ? 'bg-gray-700 text-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRequesting ? 'Processing...' : 
           !canRequestAgain ? 'Come back tomorrow' : 
           'Request Test Tokens'}
        </button>
        
        {lastRequest && (
          <p className="text-sm text-gray-400 text-center">
            Last request: {new Date(lastRequest).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}