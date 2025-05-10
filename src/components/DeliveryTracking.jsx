import React from 'react';

const DeliveryTracking = ({ status, estimatedTime }) => {
  const stages = [
    { id: 1, name: 'Order Confirmed', icon: '✓' },
    { id: 2, name: 'Preparing', icon: '🍳' },
    { id: 3, name: 'On the Way', icon: '🚚' },
    { id: 4, name: 'Delivered', icon: '📦' },
  ];

  const getStageIndex = (currentStatus) => {
    switch (currentStatus.toLowerCase()) {
      case 'confirmed':
        return 0;
      case 'preparing':
        return 1;
      case 'on the way':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(status);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Delivery Status</h2>
      
      {/* Estimated Time */}
      <div className="mb-8 text-center">
        <p className="text-gray-600">Estimated Delivery Time</p>
        <p className="text-3xl font-bold text-orange-500">{estimatedTime}</p>
      </div>

      {/* Progress Tracker */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2">
          <div 
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`flex flex-col items-center ${
                index <= currentStageIndex ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              {/* Stage Icon */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 transition-all duration-300 ${
                  index <= currentStageIndex 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {stage.icon}
              </div>
              
              {/* Stage Name */}
              <span className="text-sm font-medium text-center">
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-8 p-4 bg-orange-50 rounded-lg">
        <h3 className="font-semibold mb-2">Delivery Updates</h3>
        <div className="text-sm text-gray-600">
          <p className="mb-1">• Order #{Math.random().toString(36).substr(2, 9)}</p>
          <p className="mb-1">• Current Status: {status}</p>
          <p>• Track your delivery in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;