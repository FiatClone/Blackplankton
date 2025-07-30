import { useWeb3 } from '../../contexts/Web3Context';
import { ChainId } from '@thirdweb-dev/sdk';

const networks = [
  { id: ChainId.Mainnet, name: 'Ethereum', icon: '🟢' },
  { id: ChainId.Polygon, name: 'Polygon', icon: '🟣' },
  { id: ChainId.Mumbai, name: 'Mumbai (Testnet)', icon: '🧪' },
];

export default function NetworkModal({ isOpen, onClose }) {
  const { switchNetwork } = useWeb3();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Select Network</h3>
        
        <div className="space-y-3">
          {networks.map(network => (
            <button
              key={network.id}
              onClick={() => {
                switchNetwork(network.id);
                onClose();
              }}
              className="w-full flex items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left"
            >
              <span className="text-2xl mr-3">{network.icon}</span>
              <span>{network.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}