import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '../../../utils/format';

export default function TokenStream({ stream }) {
  const [progress, setProgress] = useState(0);
  const [streamedAmount, setStreamedAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateStream = () => {
      const now = Date.now();
      const startTime = new Date(stream.startTime).getTime();
      const endTime = new Date(stream.endTime).getTime();
      
      if (now < startTime) {
        setProgress(0);
        setStreamedAmount(0);
        setTimeLeft(`Starts in ${Math.ceil((startTime - now) / (1000 * 60 * 60 * 24))} days`);
      } else if (now > endTime) {
        setProgress(100);
        setStreamedAmount(stream.amount);
        setTimeLeft('Completed');
      } else {
        const elapsed = now - startTime;
        const totalDuration = endTime - startTime;
        const currentProgress = (elapsed / totalDuration) * 100;
        setProgress(currentProgress);
        setStreamedAmount((stream.amount * currentProgress) / 100);
        
        const daysLeft = Math.ceil((endTime - now) / (1000 * 60 * 60 * 24));
        setTimeLeft(`${daysLeft} days left`);
      }
    };

    updateStream();
    const interval = setInterval(updateStream, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [stream]);

  const handleWithdraw = () => {
    // TODO: Implement withdrawal logic
    alert(`Withdrawing ${streamedAmount.toFixed(4)} ${stream.tokenSymbol}`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{stream.name}</h4>
          <p className="text-sm text-gray-400">
            {formatDate(stream.startTime)} → {formatDate(stream.endTime)}
          </p>
        </div>
        <span className="text-sm bg-gray-700 px-2 py-1 rounded">
          {timeLeft}
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Streamed: {formatCurrency(streamedAmount)} {stream.tokenSymbol}</span>
          <span>Total: {formatCurrency(stream.amount)} {stream.tokenSymbol}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <button
        onClick={handleWithdraw}
        disabled={progress <= 0}
        className={`w-full py-2 rounded-lg text-sm ${
          progress <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {progress >= 100 ? 'Withdraw All' : 'Withdraw Available'}
      </button>
    </div>
  );
}