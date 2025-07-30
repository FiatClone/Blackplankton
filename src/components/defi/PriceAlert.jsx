import { useState, useEffect } from 'react';
import { usePrices } from '../../../hooks/usePrices';
import { toast } from 'react-hot-toast';

export default function PriceAlert() {
  const { currentPrice } = usePrices();
  const [alerts, setAlerts] = useState([]);
  const [priceInput, setPriceInput] = useState('');
  const [direction, setDirection] = useState('above');

  useEffect(() => {
    // Check alerts when price changes
    alerts.forEach(alert => {
      if (
        (direction === 'above' && currentPrice >= alert.price) ||
        (direction === 'below' && currentPrice <= alert.price)
      ) {
        toast.success(
          `Price alert! PLK is now ${direction} $${alert.price.toFixed(2)}`,
          { duration: 10000 }
        );
        // Remove triggered alert
        setAlerts(alerts.filter(a => a.id !== alert.id));
      }
    });
  }, [currentPrice, alerts, direction]);

  const addAlert = () => {
    if (!priceInput || isNaN(priceInput)) return;
    
    const newAlert = {
      id: Date.now(),
      price: parseFloat(priceInput),
      direction,
      createdAt: new Date()
    };
    
    setAlerts([...alerts, newAlert]);
    setPriceInput('');
    toast.success('Price alert set successfully');
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Price Alerts</h3>
      
      <div className="flex items-center mb-4 space-x-2">
        <span>Alert when price is</span>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="bg-gray-700 p-2 rounded"
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          placeholder="Price"
          className="bg-gray-700 p-2 rounded flex-1"
          step="0.0001"
        />
        <button
          onClick={addAlert}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Set Alert
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {alerts.map(alert => (
          <div key={alert.id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
            <span>
              PLK {alert.direction} ${alert.price.toFixed(4)}
            </span>
            <button
              onClick={() => removeAlert(alert.id)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}