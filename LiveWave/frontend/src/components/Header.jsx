import React, { useState } from 'react';
import { IconSearch, IconBell, IconLive, IconCamera, IconUsers } from './Icons';

export const Header = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenGoLive,
  onOpenProfile,
  currentUser,
  notificationCount = 3
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="header-container">
      {/* Brand & Navigation */}
      <div className="header-left">
        <div className="brand" onClick={() => setActiveTab('stream')}>
          <div className="logo-badge">
            <span className="wave-bar b1"></span>
            <span className="wave-bar b2"></span>
            <span className="wave-bar b3"></span>
          </div>
          <div className="brand-text">
            <span className="brand-title">LIVE<span className="brand-highlight">WAVE</span></span>
            <span className="brand-sub">PRO</span>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-link ${activeTab === 'stream' ? 'active' : ''}`}
            onClick={() => setActiveTab('stream')}
          >
            <span className="nav-dot"></span>
            Live Stream
          </button>
          <button
            className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse & Categories
          </button>
          <button
            className={`nav-link ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        </nav>
      </div>

      {/* Global Search Bar */}
      <div className="header-center">
        <div className="search-wrapper">
          <IconSearch size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search channels, games, creators, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons & User Section */}
      <div className="header-right">
        {/* Token Balance */}
        <div className="token-pill" title="Wave Tokens Balance">
          <span className="token-icon">🌊</span>
          <span className="token-amount">{currentUser.tokens.toLocaleString()}</span>
          <span className="token-label">Waves</span>
        </div>

        {/* Go Live / Broadcast Studio Button */}
        <button className="btn btn-live broadcast-btn" onClick={onOpenGoLive}>
          <IconCamera size={18} />
          <span>Go Live</span>
        </button>

        {/* Notifications */}
        <div className="notification-wrapper">
          <button
            className="btn-icon notif-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <IconBell size={19} />
            {notificationCount > 0 && <span className="notif-badge">{notificationCount}</span>}
          </button>

          {showNotifications && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <h4>Notifications</h4>
                <span className="notif-clear">Mark all read</span>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <div className="notif-avatar-dot"></div>
                  <div>
                    <p><strong>Kasun Dev</strong> started broadcasting: <em>Building Fullstack Apps</em></p>
                    <span className="notif-time">5m ago</span>
                  </div>
                </div>
                <div className="notif-item unread">
                  <div className="notif-avatar-dot"></div>
                  <div>
                    <p><strong>Neon Valkyrie</strong> is now live in <em>Valorant</em></p>
                    <span className="notif-time">25m ago</span>
                  </div>
                </div>
                <div className="notif-item">
                  <div>
                    <p>You received <strong>250 Waves</strong> from weekly stream rewards!</p>
                    <span className="notif-time">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="user-profile-pill" onClick={onOpenProfile} title="View Profile">
          <div className="avatar-wrapper">
            <img src={currentUser.avatarUrl} alt={currentUser.displayName} className="user-avatar" />
            <span className="online-indicator"></span>
          </div>
          <div className="user-info">
            <span className="user-display">{currentUser.displayName}</span>
            <span className="user-handle">@{currentUser.username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
