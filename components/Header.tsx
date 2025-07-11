import React, { useState, useRef, useEffect } from 'react';
import { RefreshIcon } from './icons';

interface HeaderProps {
  onResetBoard: () => void;
  onLogout: () => void;
  user: { email: string | null } | null;
}

export const Header: React.FC<HeaderProps> = ({ onResetBoard, onLogout, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="p-4 md:p-6 border-b border-gray-800 flex justify-between items-center">
      <h1 className="text-3xl font-black text-white tracking-tighter">
        Bahn<span className="text-red-600">.</span>
      </h1>
      <div className="relative" ref={menuRef}>
        {user && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex items-center gap-3 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101010] focus:ring-red-500 transition-colors hover:bg-gray-800"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <span className="text-gray-300 text-sm font-medium">{user.email}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        )}
        {menuOpen && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] border border-gray-700 rounded-md shadow-lg z-20 origin-top-right animate-scale-in"
            role="menu"
            aria-orientation="vertical"
          >
            <style>{`
              @keyframes scale-in {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
              .animate-scale-in { animation: scale-in 0.1s ease-out forwards; }
            `}</style>
            <div className="p-2" role="none">
              <button
                onClick={() => { onResetBoard(); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md"
                role="menuitem"
              >
                <RefreshIcon className="w-4 h-4" /> Reset Board
              </button>
              <div className="border-t border-gray-700 my-1"></div>
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900/50 hover:text-red-300 rounded-md"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};