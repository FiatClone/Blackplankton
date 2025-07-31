import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('plankton-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('plankton-theme', newMode ? 'dark' : 'light');
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white'
    : 'bg-gray-50 text-gray-900';

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, themeClasses }}>
      <div className={`min-h-screen transition-colors ${themeClasses}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}