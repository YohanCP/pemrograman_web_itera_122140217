import { useMemo } from 'react';
import { useBookContext } from '../context/BookContext';

/**
 * Custom hook to generate statistics about the book collection
 * @returns {Object} Collection of statistics about books
 */
function useBookStats() {
  const { books } = useBookContext();
  
  const stats = useMemo(() => {
    // Calculate various statistics
    const totalBooks = books.length;
    
    // Count books by status
    const ownedBooks = books.filter(book => book.status === 'milik').length;
    const readingBooks = books.filter(book => book.status === 'baca').length;
    const wishlistBooks = books.filter(book => book.status === 'beli').length;
    
    // Get unique authors
    const uniqueAuthors = new Set(books.map(book => book.author)).size;
    
    // Books added in the last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const recentlyAdded = books.filter(book => {
      if (!book.dateAdded) return false;
      return new Date(book.dateAdded) > lastMonth;
    }).length;
    
    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      wishlistBooks,
      uniqueAuthors,
      recentlyAdded
    };
  }, [books]);
  
  return stats;
}

export default useBookStats;