import React from 'react';
import PropTypes from 'prop-types';

const BookItem = ({ book, onEdit, onDelete }) => {
  // Status label mapping for display
  const statusLabels = {
    milik: 'Dimiliki',
    baca: 'Sedang Dibaca',
    beli: 'Ingin Dibeli'
  };

  // Status color mapping
  const statusColors = {
    milik: '#4CAF50', // Green
    baca: '#2196F3', // Blue
    beli: '#FF9800'  // Orange
  };

  return (
    <li className="book-item">
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Oleh: {book.author}</p>
        <div 
          className="book-status" 
          style={{ backgroundColor: statusColors[book.status] }}
        >
          {statusLabels[book.status]}
        </div>
        
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
      </div>
      
      <div className="book-actions">
        <button 
          onClick={onEdit} 
          className="edit-button"
          aria-label="Edit buku"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          className="delete-button"
          aria-label="Hapus buku"
        >
          Hapus
        </button>
      </div>
    </li>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
    dateAdded: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default BookItem;