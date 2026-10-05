import React, { useState } from 'react';
import { IconCheck, IconLive, IconUsers } from './Icons';

export const BrowseView = ({
  streams,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectStream,
  searchQuery
}) => {
  const [sortBy, setSortBy] = useState('viewers');

  // Filter streams by category and search query
  const filteredStreams = streams.filter((stream) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      stream.category.toLowerCase().includes(selectedCategory.replace('-', ' '));

    const matchesSearch =
      !searchQuery ||
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'viewers') return b.viewers - a.viewers;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="browse-view-container">
      {/* Featured Header Showcase */}
      <div className="browse-hero">
        <div className="hero-content">
          <div className="hero-live-tag">
            <span className="live-dot-pulse"></span>
            <span>FEATURED SHOWCASE</span>
          </div>
          <h2 className="hero-title">Experience Real-Time Streaming Like Never Before</h2>
          <p className="hero-desc">
            Ultra-low latency, crystal clear 1080p60 audio & video, interactive live chats, and creator tipping.
          </p>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-scroll-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span className="cat-pill-icon">{cat.icon}</span>
            <span className="cat-pill-name">{cat.name}</span>
            <span className="cat-pill-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Controls Bar: Title & Sort */}
      <div className="browse-controls-bar">
        <div className="browse-section-title">
          <h3>
            Live Channels
            <span className="browse-results-count">({filteredStreams.length} found)</span>
          </h3>
        </div>

        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <button
            className={`sort-pill ${sortBy === 'viewers' ? 'active' : ''}`}
            onClick={() => setSortBy('viewers')}
          >
            Most Viewers
          </button>
          <button
            className={`sort-pill ${sortBy === 'recent' ? 'active' : ''}`}
            onClick={() => setSortBy('recent')}
          >
            Recently Started
          </button>
        </div>
      </div>

      {/* Streams Grid */}
      {filteredStreams.length === 0 ? (
        <div className="empty-streams-state">
          <div className="empty-icon">📡</div>
          <h4>No live streams found</h4>
          <p>Try clearing your search query or choosing another category.</p>
        </div>
      ) : (
        <div className="streams-grid">
          {filteredStreams.map((stream) => (
            <div
              key={stream.id}
              className="stream-card"
              onClick={() => onSelectStream(stream)}
            >
              {/* Card Thumbnail */}
              <div className="card-thumb-wrapper">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="card-thumb"
                  loading="lazy"
                />
                <div className="card-overlay-hover">
                  <span className="watch-now-btn">
                    {stream.isPkActive ? '⚔️ Enter PK Battle ❯' : 'Watch Live ❯'}
                  </span>
                </div>

                {stream.isPkActive ? (
                  <div className="card-badge-pk">
                    <span className="pk-dot"></span>
                    ⚔️ PK LIVE
                  </div>
                ) : (
                  <div className="card-badge-live">
                    <span className="dot"></span>
                    LIVE
                  </div>
                )}

                <div className="card-badge-viewers">
                  👥 {stream.viewers.toLocaleString()}
                </div>

                <div className="card-badge-beans">
                  💎 {stream.beans || '48.2K'}
                </div>
              </div>

              {/* Card Info */}
              <div className="card-info">
                <div className="card-avatar-wrapper">
                  <img
                    src={stream.streamer.avatar}
                    alt={stream.streamer.name}
                    className="card-avatar"
                  />
                  <span className="avatar-level-tag">Lv.{stream.hostLevel || 42}</span>
                </div>

                <div className="card-texts">
                  <h4 className="card-title" title={stream.title}>
                    {stream.title}
                  </h4>
                  <div className="card-streamer-row">
                    <span className="card-streamer-name">{stream.streamer.name}</span>
                    {stream.streamer.verified && (
                      <span className="verified-dot" title="Verified">✓</span>
                    )}
                    <span className="streamer-country-tag">{stream.country || '🇱🇰 LK'}</span>
                  </div>
                  <span className="card-category">{stream.category}</span>

                  <div className="card-tags">
                    {stream.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="card-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
