import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Restaurants from './components/Restaurants';
import Orders from './components/Orders';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Menu from './components/Menu';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu/:restaurantId" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;