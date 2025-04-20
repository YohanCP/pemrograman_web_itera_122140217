import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBookContext } from '../../context/BookContext';

const BookForm = ({ bookToEdit, onSubmit, onCancel }) => {
  const { addBook, updateBook } = useBookContext();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    status: 'milik',
    description: '',
    dateAdded: ''
  });
  const [errors, setErrors] = useState({});

  // If a book is passed for editing, populate the form
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      // Reset form for new book
      setFormData({
        id: '',
        title: '',
        author: '',
        status: 'milik',
        description: '',
        dateAdded: new Date().toISOString()
      });
    }
  }, [bookToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi';
    }
    if (!formData.status) {
      newErrors.status = 'Status buku wajib dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!validateForm()) {
      return;
    }
    
    // Prepare book data
    const bookData = {
      ...formData,
      // Generate a random ID if it's a new book
      id: formData.id || `book_${Date.now()}`
    };
    
    // Add or update book
    if (bookToEdit) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
    
    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Judul Buku*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Penulis*</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <div className="error-message">{errors.author}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status*</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={errors.status ? 'error' : ''}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
        {errors.status && <div className="error-message">{errors.status}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Deskripsi (Opsional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Batal
          </button>
        )}
        <button type="submit" className="submit-button">
          {bookToEdit ? 'Perbarui Buku' : 'Tambah Buku'}
        </button>
      </div>
    </form>
  );
};

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
    dateAdded: PropTypes.string
  }),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default BookForm;