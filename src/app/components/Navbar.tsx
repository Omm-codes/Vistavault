import Link from "next/link";
import Search from "./Search";
import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-black sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto text-white">
        <h1 className="text-2xl sm:text-3xl text-center whitespace-nowrap">
          <Link href="/">Vistavault</Link>
        </h1>
        
        <div className="flex items-center space-x-4">
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


