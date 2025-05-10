import React, { useState } from 'react';

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const restaurants = [
    { id: 1, name: 'Burger Palace', cuisine: 'American', rating: 4.5, deliveryTime: '30-45', minOrder: 15, imageUrl: '/burgerpalace.png' },
    { id: 2, name: 'Pizza Haven', cuisine: 'Italian', rating: 4.3, deliveryTime: '40-55', minOrder: 20, imageUrl: '/pizza.jpg' },
    { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.7, deliveryTime: '25-40', minOrder: 25, imageUrl: '/sushi.jpg' },
    { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.4, deliveryTime: '20-35', minOrder: 12, imageUrl: '/Taco.jpg' },
    { id: 5, name: 'Curry House', cuisine: 'Indian', rating: 4.6, deliveryTime: '35-50', minOrder: 18, imageUrl: '/curry.jpg' },
  ];

  const cuisines = ['all', 'American', 'Italian', 'Japanese', 'Mexican', 'Indian'];

  const filteredRestaurants = restaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(restaurant =>
      selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine
    );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine === 'all' ? 'All Cuisines' : cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-contain p-4 bg-white"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{restaurant.rating}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Delivery: {restaurant.deliveryTime} mins</p>
                  <p>Min. Order: ${restaurant.minOrder}</p>
                </div>
                <button
                  className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-all duration-300"
                  onClick={() => window.location.href = `/menu/${restaurant.id}`}
                >
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No restaurants found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;