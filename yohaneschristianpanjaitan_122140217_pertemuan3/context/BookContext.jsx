import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create context
const BookContext = createContext();

// Initial state
const initialState = {
  books: [],
  filteredBooks: [],
  filter: 'all',
  searchTerm: '',
};

// Reducer function
function bookReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        books: action.payload,
        filteredBooks: action.payload,
      };
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload],
        filteredBooks: applyFilters([...state.books, action.payload], state.filter, state.searchTerm),
      };
    case 'UPDATE_BOOK':
      const updatedBooks = state.books.map(book => 
        book.id === action.payload.id ? action.payload : book
      );
      return {
        ...state,
        books: updatedBooks,
        filteredBooks: applyFilters(updatedBooks, state.filter, state.searchTerm),
      };
    case 'DELETE_BOOK':
      const remainingBooks = state.books.filter(book => book.id !== action.payload);
      return {
        ...state,
        books: remainingBooks,
        filteredBooks: applyFilters(remainingBooks, state.filter, state.searchTerm),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filteredBooks: applyFilters(state.books, action.payload, state.searchTerm),
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
        filteredBooks: applyFilters(state.books, state.filter, action.payload),
      };
    default:
      return state;
  }
}

// Helper function to apply filters and search
function applyFilters(books, filter, searchTerm) {
  let result = books;
  
  // Apply status filter
  if (filter !== 'all') {
    result = result.filter(book => book.status === filter);
  }
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(book => 
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term)
    );
  }
  
  return result;
}

// Provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  
  // Load books from localStorage on initial render
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      dispatch({ type: 'INITIALIZE', payload: JSON.parse(storedBooks) });
    }
  }, []);
  
  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(state.books));
  }, [state.books]);
  
  // Context value
  const value = {
    books: state.books,
    filteredBooks: state.filteredBooks,
    filter: state.filter,
    searchTerm: state.searchTerm,
    dispatch,
    
    // Convenience methods
    addBook: (book) => dispatch({ type: 'ADD_BOOK', payload: book }),
    updateBook: (book) => dispatch({ type: 'UPDATE_BOOK', payload: book }),
    deleteBook: (id) => dispatch({ type: 'DELETE_BOOK', payload: id }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH', payload: term }),
  };
  
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for using book context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};