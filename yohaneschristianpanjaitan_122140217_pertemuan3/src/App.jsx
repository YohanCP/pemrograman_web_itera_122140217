import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          <nav className="navbar">
            <div className="app-title">Personal Book Manager</div>
            <ul className="nav-links">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Daftar Buku
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/stats" 
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Statistik
                </NavLink>
              </li>
            </ul>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<div className="not-found">Halaman tidak ditemukan!</div>} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} - Aplikasi Manajemen Buku Pribadi</p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;