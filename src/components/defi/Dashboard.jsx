import DashboardStats from './DashboardStats';
import RecentTransactions from './RecentTransactions';
import PriceChart from '../Chart/PriceChart';
import VolumeChart from '../Chart/VolumeChart';
import AirdropStatus from '../../airdrop/AirdropStatus';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChart />
        <VolumeChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTransactions />
        <AirdropStatus />
      </div>
    </div>
  );
}