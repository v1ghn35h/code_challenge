// Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md rounded bg-gradient-to-br from-purple-600 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800">
      <h1 className="text-xl font-bold dark:text-white">Currency Swap</h1>
    </header>
  );
}

export default Header;
