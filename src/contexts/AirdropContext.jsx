import { createContext, useContext, useEffect, useState } from 'react';
import { AIRDROP_TASKS } from '../constants/airdropTasks';

const AirdropContext = createContext();

export function AirdropProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Initialize tasks with default state
    const initializedTasks = AIRDROP_TASKS.map(task => ({
      ...task,
      completed: false
    }));
    setTasks(initializedTasks);
    
    // Simulate fetching leaderboard data
    setLeaderboard([
      { address: '0x123...456', points: 1500 },
      { address: '0x789...012', points: 1200 },
      { address: '0x345...678', points: 900 },
      { address: '0x901...234', points: 750 },
      { address: '0x567...890', points: 600 }
    ]);
  }, []);

  const checkTaskCompletion = (taskId, validationData) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.validator(validationData)) {
      if (!completedTasks.includes(taskId)) {
        setCompletedTasks([...completedTasks, taskId]);
      }
      return true;
    }
    return false;
  };

  const value = {
    tasks,
    completedTasks,
    leaderboard,
    checkTaskCompletion
  };

  return (
    <AirdropContext.Provider value={value}>
      {children}
    </AirdropContext.Provider>
  );
}

export function useAirdropContext() {
  return useContext(AirdropContext);
}
