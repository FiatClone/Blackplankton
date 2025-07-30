import { useAddress, useMetamask, useWalletConnect } from '@thirdweb-dev/react';

export default function ConnectWallet() {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Connect Wallet</h3>
      <div className="space-y-3">
        <button
          onClick={connectWithMetamask}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <img src="/images/metamask.png" alt="MetaMask" className="h-6 mr-2" />
          MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <img src="/images/walletconnect.png" alt="WalletConnect" className="h-6 mr-2" />
          WalletConnect
        </button>
      </div>
    </div>
  );
}