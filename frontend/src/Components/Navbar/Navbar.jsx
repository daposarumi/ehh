import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { PiShoppingCartSimpleThin, PiUserThin } from 'react-icons/pi';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/blue logo.png';
import "./Navbar.css";
import all_products from '../Assets/all_products';

export const Navbar = ({ setShowLogin, searchTerm, setSearchTerm }) => {
  const [menu, setMenu] = useState("shop");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems, token, setToken } = useContext(ShopContext);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState(null);

  const logout = () => {
    setLoading(true);
    setUserMessage(null);

    setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
      setLoading(false);
      setUserMessage({ text: 'Logout successful', type: 'success' });
      navigate("/");

      setTimeout(() => {
        setUserMessage(null);
      }, 2000);
    }, 500);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      const filtered = all_products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchTerm("");
    navigate(`/product/${productId}`);
    setFilteredProducts([]);
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={logo} width="80" alt="PBF logo" className="nav-logo" /></Link>
      
      <ul ref={menuRef} className={`nav-menu ${isMenuOpen ? 'nav-menu-visible' : ''}`}>
        <li onClick={() => { setMenu("shop"); setIsMenuOpen(false); }} className={menu === "shop" ? "active" : ""}>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
        </li>
        <li onClick={() => { setMenu("women"); setIsMenuOpen(false); }} className={menu === "women" ? "active" : ""}>
          <Link to='/women' style={{ textDecoration: 'none' }}>Women</Link>
        </li>
        <li onClick={() => { setMenu("men"); setIsMenuOpen(false); }} className={menu === "men" ? "active" : ""}>
          <Link to='/men' style={{ textDecoration: 'none' }}>Men</Link>
        </li>
      </ul>
      <div className='login'>
        {isSearchVisible && (
          <div className='search-bar'>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {filteredProducts.length > 0 && (
              <div className="search-suggestions">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="search-suggestion"
                    onClick={() => handleSuggestionClick(product.id)}
                  >
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <CiSearch
          style={{ fontSize: '2.2rem', cursor: 'pointer' }}
          onClick={handleIconClick}
          className="navbar-search-button"
        />
        {!token ? (
          <PiUserThin onClick={() => setShowLogin(true)} style={{ fontSize: '2.2rem' }} className='user-icon' />
        ) : (
          <div className='navbar-profile'>
            <PiUserThin style={{ fontSize: '2.2rem' }} />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>Orders</li>
              <hr />
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        )}
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <PiShoppingCartSimpleThin style={{ fontSize: '2.2rem', color: 'black' }} />
        </Link>
        <div className='cart-count'>{getTotalCartItems()}</div>
      </div>
      {loading && <div className="loading-indicator"></div>}
      {userMessage && (
        <div className={`user-message ${userMessage.type}`}>
          {userMessage.text}
        </div>
      )}
      <div className='nav-menu-toggle' onClick={toggleMenu}>
        {isMenuOpen ? <RxCross1 style={{ fontSize: '1.8rem', color: 'black' }} /> : <RxHamburgerMenu style={{ fontSize: '1.8rem', color: 'black' }} />}
      </div>
    </div>
  );
};

export default Navbar;
