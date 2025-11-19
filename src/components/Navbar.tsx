import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-4 py-3 transition-all duration-500 ${
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Netflix Logo */}
          <h1 className="text-netflix-red text-3xl font-bold tracking-wider cursor-pointer">
            NETFLIX
          </h1>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-5">
            <li className="text-white text-sm font-medium cursor-pointer hover:text-gray-300 transition">
              Home
            </li>
            <li className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 transition">
              TV Shows
            </li>
            <li className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 transition">
              Movies
            </li>
            <li className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 transition">
              New & Popular
            </li>
            <li className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 transition">
              My List
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="text-white hover:text-gray-300 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notification Bell */}
          <button className="text-white hover:text-gray-300 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded bg-netflix-red cursor-pointer flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
