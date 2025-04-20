import React from 'react';
import useBookStats from '../../hooks/useBookStats';

const Stats = () => {
  const stats = useBookStats();

  return (
    <div className="stats-page">
      <h1>Statistik Koleksi Buku</h1>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-value">{stats.totalBooks}</div>
          <div className="stat-label">Total Buku</div>
        </div>
        
        <div className="stat-card owned">
          <div className="stat-value">{stats.ownedBooks}</div>
          <div className="stat-label">Buku Dimiliki</div>
        </div>
        
        <div className="stat-card reading">
          <div className="stat-value">{stats.readingBooks}</div>
          <div className="stat-label">Sedang Dibaca</div>
        </div>
        
        <div className="stat-card wishlist">
          <div className="stat-value">{stats.wishlistBooks}</div>
          <div className="stat-label">Ingin Dibeli</div>
        </div>
        
        <div className="stat-card authors">
          <div className="stat-value">{stats.uniqueAuthors}</div>
          <div className="stat-label">Penulis Unik</div>
        </div>
        
        <div className="stat-card recent">
          <div className="stat-value">{stats.recentlyAdded}</div>
          <div className="stat-label">Ditambahkan 30 Hari Terakhir</div>
        </div>
      </div>
      
      {stats.totalBooks === 0 && (
        <div className="empty-stats-message">
          <p>Belum ada buku yang ditambahkan. Tambahkan buku untuk melihat statistik!</p>
        </div>
      )}
    </div>
  );
};

export default Stats;