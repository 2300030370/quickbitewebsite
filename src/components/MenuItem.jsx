import React from 'react';
import { useCart } from '../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurant: item.restaurant,
      quantity: 1,
      notes: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-medium">{item.name}</h3>
      <p className="text-gray-600">${item.price.toFixed(2)}</p>
      <button
        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;