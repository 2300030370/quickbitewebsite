import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-bold text-orange-500 group-hover:text-orange-600 transition-colors duration-300">QuickBite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 hover:scale-105 transition-all duration-300">Home</Link>
            <Link to="/login" className="text-gray-700 hover:text-orange-500 hover:scale-105 transition-all duration-300">Login</Link>
            <Link 
              to="/signup" 
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-orange-500">Home</Link>
            <Link to="/restaurants" className="block py-2 text-gray-700 hover:text-orange-500">Restaurants</Link>
            <Link to="/login" className="block py-2 text-gray-700 hover:text-orange-500">Login</Link>
            <Link to="/signup" className="block py-2 text-gray-700 hover:text-orange-500">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;