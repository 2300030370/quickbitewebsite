import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredRestaurants = [
    { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.5, imageUrl: '/burgerpalace.png' },
    { id: 2, name: 'Pizza Haven', cuisine: 'Italian', rating: 4.3, imageUrl: '/pizza.jpg' },
    { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.7, imageUrl: '/sushi.jpg' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div id="hero" className="bg-orange-500 text-white py-16 px-4 rounded-lg mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Delicious Food Delivered to Your Door</h1>
          <p className="text-xl mb-8">Order from your favorite local restaurants with just a few clicks</p>
          <Link
            to="/signup"
            className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-100 transition duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name} 
                  className="w-full h-full object-contain p-4 bg-white"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{restaurant.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Restaurant</h3>
            <p className="text-gray-600">Browse our selection of local restaurants</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Place Order</h3>
            <p className="text-gray-600">Select your favorite meals and checkout</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your food delivered to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;