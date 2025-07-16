import React from 'react';
import appIcon from '../assets/app_icon.png';

const Header = ({ onAuthClick }) => (
  <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <div className="flex items-center gap-3">
      <img
        src={appIcon}
        alt="Kiracılarım.com Logo"
        className="w-10 h-10 rounded"
        aria-label="Logo"
      />
      <span className="text-2xl font-bold text-blue-700 select-none">kiracılarım.com</span>
    </div>
    <nav className="flex items-center gap-4">
      <button
        className="px-4 py-2 text-blue-700 font-semibold rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onAuthClick}
        tabIndex={0}
        aria-label="Giriş Yap"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onAuthClick()}
      >
        Giriş Yap
      </button>
      <button
        className="px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onAuthClick}
        tabIndex={0}
        aria-label="Kaydol"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onAuthClick()}
      >
        Kaydol
      </button>
    </nav>
  </header>
);

export default Header; 