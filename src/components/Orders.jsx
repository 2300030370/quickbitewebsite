import React, { useState } from 'react';
import DeliveryTracking from './DeliveryTracking';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('current');

  const orders = {
    current: [
      {
        id: 1,
        restaurant: 'Burger Palace',
        items: ['Classic Burger', 'Fries', 'Coke'],
        total: 25.99,
        status: 'preparing',
        estimatedDelivery: '20 mins',
      },
      {
        id: 2,
        restaurant: 'Pizza Haven',
        items: ['Pepperoni Pizza', 'Garlic Bread'],
        total: 32.50,
        status: 'on the way',
        estimatedDelivery: '10 mins',
      },
    ],
    past: [
      {
        id: 3,
        restaurant: 'Sushi Master',
        items: ['California Roll', 'Miso Soup'],
        total: 28.75,
        status: 'delivered',
        date: '2024-01-15',
      },
      {
        id: 4,
        restaurant: 'Taco Fiesta',
        items: ['Beef Tacos (3)', 'Nachos'],
        total: 22.99,
        status: 'delivered',
        date: '2024-01-14',
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'on the way':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'current'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('current')}
        >
          Current Orders
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'past'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Order History
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders[activeTab].map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{order.restaurant}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  {order.items.join(', ')}
                </div>
                <div className="font-medium">${order.total.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                {activeTab === 'current' && (
                  <div className="text-sm text-gray-600 mt-2">
                    Estimated delivery: {order.estimatedDelivery}
                  </div>
                )}
                {activeTab === 'past' && (
                  <div className="text-sm text-gray-600 mt-2">
                    Delivered on: {new Date(order.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            {activeTab === 'current' && (
              <>
                <div className="mt-4 flex justify-end space-x-4">
                  <button className="text-gray-600 hover:text-gray-800 hover:underline transform hover:scale-105 transition-all duration-300">
                    Track Order
                  </button>
                  <button className="text-red-600 hover:text-red-800 hover:underline transform hover:scale-105 transition-all duration-300">
                    Cancel Order
                  </button>
                </div>
                
                {/* Add Delivery Tracking */}
                <div className="mt-6">
                  <DeliveryTracking 
                    status={order.status}
                    estimatedTime={order.estimatedDelivery}
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {orders[activeTab].length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No {activeTab} orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;