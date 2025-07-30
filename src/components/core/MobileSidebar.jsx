import React, { useState } from 'react';
import { XMarkIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import SidebarContent from './Sidebar';

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-gray-800 text-white"
      >
        <Bars3BottomLeftIcon className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-30">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Sidebar Content */}
          <div className="relative z-40 h-full w-64 bg-gray-800 transform transition-transform">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}