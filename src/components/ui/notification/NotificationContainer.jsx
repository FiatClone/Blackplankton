import React, { useEffect, useState } from 'react';

const NotificationContainer = ({ message, type = 'info', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`text-white px-4 py-2 rounded shadow-lg animate-slide-in-down ${
          typeStyles[type] || typeStyles.info
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default NotificationContainer;