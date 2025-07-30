import { useEffect, useState } from 'react';

export default function TransactionToast({ hash, status, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      status === 'success' ? 'bg-green-600' : 
      status === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white max-w-xs`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold">
            {status === 'success' ? 'Transaction Successful' : 
             status === 'error' ? 'Transaction Failed' : 'Transaction Pending'}
          </p>
          <a 
            href={`https://etherscan.io/tx/${hash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            View on Explorer
          </a>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className="ml-2"
        >
          ×
        </button>
      </div>
    </div>
  );
}