// Components/SearchResults/SearchResults.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchComponent = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To handle overlay visibility

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const results = items.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Open search overlay
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  // Close search overlay
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="search-container">
      {/* Search Icon */}
      <button className="search-icon" onClick={openSearch}>
        <i className="fa fa-search" aria-hidden="true"></i> {/* FontAwesome Icon */}
      </button>

      {/* Overlay and Search Input */}
      {isSearchOpen && (
        <div className="search-overlay" onClick={closeSearch}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}> {/* Prevent overlay close on input click */}
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            {/* Close button */}
            <button className="close-btn" onClick={closeSearch}>X</button>
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((item) => (
                  <li key={item.id} className="search-item">
                    <Link to={`/product/${item.id}`} onClick={closeSearch}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
