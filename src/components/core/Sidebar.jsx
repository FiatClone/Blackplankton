import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/', name: 'Dashboard', icon: '📊' },
  { path: '/swap', name: 'Swap', icon: '🔄' },
  { path: '/stake', name: 'Stake', icon: '💰' },
  { path: '/liquidity', name: 'Liquidity', icon: '💧' },
  { path: '/buy', name: 'Buy Crypto', icon: '💳' },
  { path: '/chart', name: 'Charts', icon: '📈' },
  { path: '/comic', name: 'Comics', icon: '📚' },
  { path: '/airdrop', name: 'Airdrop', icon: '🎁' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-colors ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300'}`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}