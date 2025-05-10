import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    upiId: ''
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      restaurant: 'Burger Palace',
      name: 'Classic Burger',
      price: 12.99,
      quantity: 2,
      notes: 'No onions',
    },
    {
      id: 2,
      restaurant: 'Burger Palace',
      name: 'French Fries',
      price: 4.99,
      quantity: 1,
      notes: '',
    },
    {
      id: 3,
      restaurant: 'Burger Palace',
      name: 'Sushi',
      price: 5.99,
      quantity: 1,
      notes: '',
    },
  ]);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deliveryFee = 3.99;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + deliveryFee;

  const handleBrowseRestaurants = () => {
    navigate('/restaurants');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (paymentMethod === 'cash') {
        alert('Order placed successfully! Please keep cash ready for delivery.');
      } else {
        alert('Payment successful! Your order is confirmed.');
      }

      setShowPaymentModal(false);
      setCartItems([]);
      navigate('/order-confirmation');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              paymentMethod === 'card' ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            Card
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              paymentMethod === 'upi' ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            UPI
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              paymentMethod === 'cash' ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMethod('cash')}
          >
            Cash
          </button>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={paymentDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  maxLength="16"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">UPI ID</label>
              <input
                type="text"
                name="upiId"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="username@upi"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {paymentMethod === 'cash' && (
            <div className="text-gray-600 mb-4">
              <p>You have selected Cash on Delivery.</p>
              <p className="mt-2">Please keep exact change of ${total.toFixed(2)} ready.</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowPaymentModal(false)}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Processing...</span>
              ) : (
                <span>{paymentMethod === 'cash' ? 'Place Order' : `Pay $${total.toFixed(2)}`}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.restaurant}</p>
                    {item.notes && (
                      <p className="text-sm text-gray-500 mt-1">Note: {item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-orange-500 hover:text-orange-600 transform hover:scale-110 transition-all duration-300"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button 
                        className="text-orange-500 hover:text-orange-600"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-orange-500 text-white py-3 rounded-md mt-6 hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setShowPaymentModal(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to your cart and order now!</p>
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
            onClick={handleBrowseRestaurants}
          >
            Browse Restaurants
          </button>
        </div>
      )}
      {/* Add Payment Modal */}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default Cart;