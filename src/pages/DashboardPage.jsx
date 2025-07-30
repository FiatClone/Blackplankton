import { useAddress } from '@thirdweb-dev/react';
import DashboardStats from '../components/defi/DashboardStats';
import RecentTransactions from '../components/defi/RecentTransactions';

export default function DashboardPage() {
  const address = useAddress();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      {address ? (
        <>
          <DashboardStats />
          <RecentTransactions />
        </>
      ) : (
        <div className="bg-gray-800 p-6 rounded-xl text-center">
          <p className="text-lg">Connect your wallet to view dashboard</p>
        </div>
      )}
    </div>
  );
}