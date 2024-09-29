import './App.css';
import React, { useState } from 'react';

import { Navbar } from './Components/Navbar/Navbar';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cart } from './Pages/Cart';
import { Product } from './Pages/Product';
import { ShopCategory } from './Pages/ShopCategory';
import { Shop } from './Pages/Shop';
import { Footer } from './Components/Footer/Footer';
import { PlaceOrder } from './Pages/Placeorder/PlaceOrder';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { Verify } from './Pages/Verify/verify';
import MyOrders from './Pages/MyOrders/MyOrders';
import SearchComponent from './Components/SearchResults/SearchResults';
import all_products from './Components/Assets/all_products';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm) {
      const results = all_products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        setShowLogin={setShowLogin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      {showLogin && <LoginSignup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path='/women' element={<ShopCategory category="Women" />} />
          <Route path='/men' element={<ShopCategory category="Men" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/login" element={<LoginSignup setShowLogin={() => {}} initialState="Login" />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/search' element={<SearchComponent items={searchResults} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
