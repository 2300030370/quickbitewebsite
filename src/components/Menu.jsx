import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // Sample menu data
  const menuItems = [
    { id: 1, name: 'Burger', price: 8.99 },
    { id: 2, name: 'Pizza', price: 12.99 },
    { id: 3, name: 'Sushi', price: 15.99 },
  ];

  const addToCart = (item) => {
    // Logic to add item to cart
    console.log(`Added ${item.name} to cart`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu for Restaurant {restaurantId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button
              className="mt-2 bg-orange-500 text-white py-1 px-4 rounded hover:bg-orange-600 transition duration-300"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-8 bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600 transition duration-300"
        onClick={() => navigate('/cart')}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Menu;