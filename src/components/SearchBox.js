import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBox = ({ onSearch, searchTerm = '' }) => {
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    onSearch(value);
  };

  return (
    <div className="search-box">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search JSON..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBox;
