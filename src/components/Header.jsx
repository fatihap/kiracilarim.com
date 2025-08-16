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

  </header>
);

export default Header; 