// src/components/core/Layout.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // Pastikan path benar
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

export default function Layout({ children }) {
  // Menggunakan hook useTheme()
  const { themeClasses, darkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex flex-1 overflow-hidden ${themeClasses}`}>
      {/* Toggle Theme Button (Contoh) */}
      <button 
        onClick={toggleTheme}
        className="fixed z-50 bottom-4 right-4 p-2 bg-blue-500 rounded-full"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}