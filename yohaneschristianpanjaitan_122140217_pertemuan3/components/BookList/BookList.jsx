import React, { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookItem from './BookItem';
import BookForm from '../BookForm/BookForm';

const BookList = () => {
  const { filteredBooks, deleteBook } = useBookContext();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(id);
    }
  };

  const handleEditCancel = () => {
    setEditingBook(null);
  };

  const handleEditSubmit = () => {
    setEditingBook(null);
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-book-list">
        <p>Tidak ada buku yang ditemukan. Tambahkan buku baru atau ubah filter pencarian.</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      {editingBook && (
        <div className="edit-form-overlay">
          <div className="edit-form-container">
            <h3>Edit Buku</h3>
            <BookForm 
              bookToEdit={editingBook} 
              onSubmit={handleEditSubmit} 
              onCancel={handleEditCancel}
            />
          </div>
        </div>
      )}
      
      <ul className="book-list">
        {filteredBooks.map((book) => (
          <BookItem 
            key={book.id}
            book={book}
            onEdit={() => handleEdit(book)}
            onDelete={() => handleDelete(book.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default BookList;