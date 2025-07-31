import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

export default function Layout({ children }) {
  const { themeClasses } = useTheme();

  return (
    <div className={`flex flex-1 overflow-hidden ${themeClasses}`}>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle (hidden on desktop) */}
      <MobileSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </main>

      {/* Mobile Navigation (bottom bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around items-center p-2">
        {/* Mobile nav items */}
      </div>
    </div>
  );
}
