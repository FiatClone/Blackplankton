import { useState, useEffect } from 'react';
import { useWeb3 } from '../../../../contexts/Web3Context';
import { TOKENS } from '../../../../constants/tokens';

export default function TokenSelectModal({ selectedToken, onSelect, onClose }) {
  const { chainId } = useWeb3();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTokens, setFilteredTokens] = useState([]);

  useEffect(() => {
    const availableTokens = Object.values(TOKENS).filter(
      token => token.address[chainId]
    );
    setFilteredTokens(
      availableTokens.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, chainId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Select Token</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search token name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded-lg mb-4"
        />
        
        <div className="max-h-96 overflow-y-auto">
          {filteredTokens.map(token => (
            <div
              key={`${token.symbol}-${chainId}`}
              onClick={() => {
                onSelect(token.symbol);
                onClose();
              }}
              className={`flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                selectedToken === token.symbol ? 'bg-blue-900' : ''
              }`}
            >
              <img 
                src={token.logo} 
                alt={token.symbol} 
                className="w-8 h-8 mr-3 rounded-full"
                onError={(e) => {
                  e.target.src = '/images/tokens/default.png';
                }}
              />
              <div>
                <p className="font-medium">{token.symbol}</p>
                <p className="text-sm text-gray-400">{token.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}