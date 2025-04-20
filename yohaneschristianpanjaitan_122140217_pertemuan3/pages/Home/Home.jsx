import React, { useState } from 'react';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';

const Home = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitSuccess = () => {
    setShowAddForm(false);
  };

  return (
    <div className="home-page">
      <div className="header-actions">
        <h1>Manajemen Buku Pribadi</h1>
        <button 
          className="add-book-button"
          onClick={toggleAddForm}
        >
          {showAddForm ? 'Tutup Form' : 'Tambah Buku Baru'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-book-form">
          <h2>Tambah Buku Baru</h2>
          <BookForm onSubmit={handleSubmitSuccess} onCancel={toggleAddForm} />
        </div>
      )}

      <div className="book-management">
        <BookFilter />
        <BookList />
      </div>
    </div>
  );
};

export default Home;