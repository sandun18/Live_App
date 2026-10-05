import React, { useState } from 'react';
import { IconX, IconCheck, IconShield } from './Icons';

export const ProfileModal = ({ isOpen, onClose, currentUser, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [bio, setBio] = useState(currentUser.bio);
  const [country, setCountry] = useState(currentUser.country);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      displayName,
      bio,
      country,
      avatarUrl
    });
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-profile">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon-badge">👤</span>
            <div>
              <h3>User Profile & Channel</h3>
              <p>Connected with LiveWave User Service</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <IconX size={20} />
          </button>
        </div>

        {savedNotice && (
          <div className="toast-success">
            <IconCheck size={16} />
            <span>Profile successfully updated!</span>
          </div>
        )}

        {/* Profile Card Banner */}
        <div className="profile-banner-card">
          <div className="profile-banner-bg"></div>
          <div className="profile-header-info">
            <div className="profile-avatar-container">
              <img src={avatarUrl} alt={displayName} className="profile-large-avatar" />
              <span className="profile-verified-badge" title="Verified Creator">✓</span>
            </div>

            <div className="profile-names">
              <h2>{displayName}</h2>
              <div className="profile-sub-tags">
                <span className="username-tag">@{currentUser.username}</span>
                <span className="auth-id-tag">Auth ID: #{currentUser.authUserId}</span>
                <span className="country-tag">📍 {country}</span>
              </div>
            </div>

            <div className="profile-action-btn-area">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Channel Statistics Bar */}
        <div className="profile-stats-grid">
          <div className="p-stat-box">
            <span className="p-stat-val">{(currentUser.followersCount).toLocaleString()}</span>
            <span className="p-stat-lbl">Followers</span>
          </div>
          <div className="p-stat-box">
            <span className="p-stat-val">{currentUser.followingCount}</span>
            <span className="p-stat-lbl">Following</span>
          </div>
          <div className="p-stat-box">
            <span className="p-stat-val">🌊 {currentUser.tokens.toLocaleString()}</span>
            <span className="p-stat-lbl">Wave Tokens</span>
          </div>
          <div className="p-stat-box">
            <span className="p-stat-val">142h</span>
            <span className="p-stat-lbl">Live Streamed</span>
          </div>
        </div>

        {/* Content / Edit Form */}
        <div className="profile-details-section">
          {!isEditing ? (
            <div className="profile-view-mode">
              <div className="detail-item">
                <label>Biography</label>
                <p className="bio-text">{bio || "No biography provided yet."}</p>
              </div>

              <div className="profile-meta-row">
                <div className="meta-card">
                  <span className="meta-title">Country / Region</span>
                  <span className="meta-val">{country}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-title">Member Since</span>
                  <span className="meta-val">January 2025</span>
                </div>
                <div className="meta-card">
                  <span className="meta-title">Channel Status</span>
                  <span className="meta-val status-partner">★ Partnered Creator</span>
                </div>
              </div>
            </div>
          ) : (
            <form className="profile-edit-form" onSubmit={handleSave}>
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Biography</label>
                <textarea
                  className="form-input textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your viewers about yourself..."
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Country / Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Avatar Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
