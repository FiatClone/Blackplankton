import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';
import TokenBadge from '../ui/TokenBadge';

export default function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Plankton Defi" className="h-10" />
          <span className="ml-2 text-xl font-bold">Plankton DeFi</span>
        </Link>
        <TokenBadge />
      </div>
      
      <div className="flex items-center space-x-4">
        {address ? (
          <>
            <button 
              onClick={disconnect}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Disconnect
            </button>
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              {`${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
          </>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </header>
  );
}