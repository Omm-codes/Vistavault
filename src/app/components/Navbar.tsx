"use client"; // Add this line at the very top of the file

import Link from "next/link";
import Search from "./Search";
import React, { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black sticky top-0 z-10">
      <nav className="flex flex-col sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto text-white">
        
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl whitespace-nowrap">
            <Link href="/">Vistavault</Link>
          </h1>
          {/* Mobile Menu Toggle Button */}
          <button 
            className="sm:hidden text-white text-2xl focus:outline-none" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Menu Links - Responsive for Small Screens */}
        <div className={`flex-col gap-4 sm:flex-row sm:flex ${menuOpen ? 'flex' : 'hidden'} items-center mt-4 sm:mt-0`}>
          <Search />

          {/* Home Button */}
          <Link href="/" passHref>
            <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300">
              Home
            </button>
          </Link>

          {/* Explore Button */}
          <Link href="/Explore" passHref>
            <button className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-500 hover:to-purple-700 transition duration-300">
              Explore
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
