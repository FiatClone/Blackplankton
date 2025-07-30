import { useAddress } from '@thirdweb-dev/react';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Swap from './components/Swap';
import Stake from './components/Stake';
import Liquidity from './components/Liquidity';
import Buy from './components/Buy';
import Chart from './components/Chart';
import Comic from './components/Comic';
import Airdrop from './components/Airdrop';
import ConnectWallet from './components/ConnectWallet';

export default function App() {
  const address = useAddress();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'swap': return <Swap />;
      case 'stake': return <Stake />;
      case 'liquidity': return <Liquidity />;
      case 'buy': return <Buy />;
      case 'chart': return <Chart />;
      case 'comic':
      case 'comic-browse':
      case 'comic-upload':
      case 'comic-myworks': return <Comic activeTab={activeTab.replace('comic-', '')} setActiveTab={setActiveTab} />;
      case 'airdrop': return <Airdrop />;
      default: return <Dashboard />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 overflow-auto">
          {address ? renderContent() : <ConnectWallet />}
        </main>
      </div>
    </div>
  );
}