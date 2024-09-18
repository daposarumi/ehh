// Components/SearchResults/SearchResults.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchComponent = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((item) => (
            <li key={item.id} className="search-item">
              <Link to={`/product/${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
