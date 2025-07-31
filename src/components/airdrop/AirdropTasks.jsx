import { useWeb3 } from '../../contexts/Web3Context';
import ProgressBar from '../ui/ProgressBar';

const tasks = [
  { id: 1, name: 'Connect Wallet', points: 100, completed: true },
  { id: 2, name: 'Swap Tokens', points: 200, completed: false },
  { id: 3, name: 'Stake PLK', points: 300, completed: false },
  { id: 4, name: 'Add Liquidity', points: 400, completed: false },
  { id: 5, name: 'Invite Friends', points: 500, completed: false },
];

export default function AirdropTasks() {
  const { address } = useWeb3();
  const totalPoints = tasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0);
  const maxPoints = tasks.reduce((sum, task) => sum + task.points, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Airdrop Tasks</h3>
      
      {!address ? (
        <p className="text-gray-400">Connect your wallet to view tasks</p>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>{totalPoints}/{maxPoints} points</span>
            </div>
            <ProgressBar value={(totalPoints / maxPoints) * 100} />
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>
                    {task.name}
                  </span>
                </div>
                <span className="text-yellow-400">{task.points} pts</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}