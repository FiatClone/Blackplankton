import { useEffect } from 'react';
import { useAirdrop } from '../../../../hooks/useAirdrop';

export default function AirdropNotification() {
  const { hasNewAirdrop } = useAirdrop();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasNewAirdrop) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [hasNewAirdrop]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-600 text-white p-4 rounded-lg shadow-lg max-w-xs animate-bounce">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold mb-1">New Airdrop Available!</h4>
          <p className="text-sm">You qualify for our latest airdrop. Claim your rewards now.</p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}