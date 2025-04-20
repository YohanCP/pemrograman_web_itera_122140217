import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from '../components/BookForm/BookForm';
import { BookProvider } from '../context/BookContext';

// Mock functions
const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

// Test data
const testBook = {
  id: 'test-id-1',
  title: 'Test Book Title',
  author: 'Test Author',
  status: 'milik',
  description: 'Test description',
  dateAdded: '2023-04-20T12:00:00.000Z'
};

// Helper function to render component within context
const renderWithContext = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <BookProvider {...providerProps}>{ui}</BookProvider>,
    renderOptions
  );
};

describe('BookForm Component', () => {
  test('renders empty form when no book is provided', () => {
    renderWithContext(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    // Check if form elements exist
    expect(screen.getByLabelText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/penulis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deskripsi/i)).toBeInTheDocument();
    
    // Check if form is empty
    expect(screen.getByLabelText(/judul buku/i)).toHaveValue('');
    expect(screen.getByLabelText(/penulis/i)).toHaveValue('');
  });
  
  test('renders form with book data when book is provided', () => {
    renderWithContext(<BookForm bookToEdit={testBook} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    // Check if form is populated with book data
    expect(screen.getByLabelText(/judul buku/i)).toHaveValue(testBook.title);
    expect(screen.getByLabelText(/penulis/i)).toHaveValue(testBook.author);
    expect(screen.getByLabelText(/status/i)).toHaveValue(testBook.status);
    expect(screen.getByLabelText(/deskripsi/i)).toHaveValue(testBook.description);
  });
  
  test('shows validation errors when submitting empty form', async () => {
    renderWithContext(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    // Clear input fields if needed
    fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: '' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/tambah buku/i));
    
    // Check if validation errors appear
    expect(await screen.findByText(/judul buku wajib diisi/i)).toBeInTheDocument();
    expect(await screen.findByText(/nama penulis wajib diisi/i)).toBeInTheDocument();
    
    // Check that onSubmit wasn't called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  
  test('calls onSubmit when form is valid and submitted', async () => {
    renderWithContext(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'New Test Book' } });
    fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: 'New Test Author' } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'baca' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/tambah buku/i));
    
    // Check that onSubmit was called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
  
  test('calls onCancel when cancel button is clicked', () => {
    renderWithContext(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    // Click the cancel button
    fireEvent.click(screen.getByText(/batal/i));
    
    // Check that onCancel was called
    expect(mockOnCancel).toHaveBeenCalled();
  });
});