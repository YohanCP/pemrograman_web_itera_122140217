import React from 'react';
import { useBookContext } from '../../context/BookContext';

const BookFilter = () => {
  const { filter, setFilter, searchTerm, setSearchTerm } = useBookContext();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="book-filter">
      <div className="filter-section">
        <label htmlFor="status-filter">Filter Status:</label>
        <select
          id="status-filter"
          value={filter}
          onChange={handleFilterChange}
          aria-label="Filter buku berdasarkan status"
        >
          <option value="all">Semua Buku</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="search-section">
        <label htmlFor="search-input" className="visually-hidden">Cari buku:</label>
        <div className="search-input-container">
          <input
            id="search-input"
            type="text"
            placeholder="Cari judul atau penulis..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Cari buku"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch} 
              className="clear-search"
              aria-label="Hapus pencarian"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookFilter;