import React, { useState } from 'react';
import { IconLive, IconUsers } from './Icons';

export const Sidebar = ({
  streams,
  activeStream,
  onSelectStream,
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const followedStreams = streams.slice(0, 3);
  const recommendedStreams = streams.slice(3);

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span className="sidebar-title">NAVIGATION</span>}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "❯" : "❮"}
        </button>
      </div>

      {/* Followed Channels */}
      <div className="sidebar-section">
        {!isCollapsed && (
          <div className="section-label">
            <span>FOLLOWED CHANNELS</span>
            <span className="count-badge">{followedStreams.length}</span>
          </div>
        )}

        <div className="channel-list">
          {followedStreams.map((stream) => {
            const isActive = activeStream?.id === stream.id;
            return (
              <div
                key={stream.id}
                className={`channel-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectStream(stream)}
                title={`${stream.streamer.name} - ${stream.title}`}
              >
                <div className="channel-avatar-wrapper">
                  <img
                    src={stream.streamer.avatar}
                    alt={stream.streamer.name}
                    className="channel-avatar"
                  />
                  <span className="live-dot-indicator"></span>
                </div>

                {!isCollapsed && (
                  <div className="channel-details">
                    <div className="channel-name-row">
                      <span className="channel-name">{stream.streamer.name}</span>
                      <div className="channel-viewers">
                        <span className="viewer-dot"></span>
                        {(stream.viewers / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <span className="channel-category">{stream.category}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Channels */}
      <div className="sidebar-section">
        {!isCollapsed && (
          <div className="section-label">
            <span>RECOMMENDED</span>
          </div>
        )}

        <div className="channel-list">
          {recommendedStreams.map((stream) => {
            const isActive = activeStream?.id === stream.id;
            return (
              <div
                key={stream.id}
                className={`channel-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectStream(stream)}
                title={`${stream.streamer.name} - ${stream.title}`}
              >
                <div className="channel-avatar-wrapper">
                  <img
                    src={stream.streamer.avatar}
                    alt={stream.streamer.name}
                    className="channel-avatar"
                  />
                  <span className="live-dot-indicator"></span>
                </div>

                {!isCollapsed && (
                  <div className="channel-details">
                    <div className="channel-name-row">
                      <span className="channel-name">{stream.streamer.name}</span>
                      <div className="channel-viewers">
                        <span className="viewer-dot"></span>
                        {(stream.viewers / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <span className="channel-category">{stream.category}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Categories */}
      {!isCollapsed && (
        <div className="sidebar-section categories-section">
          <div className="section-label">
            <span>TOP CATEGORIES</span>
          </div>
          <div className="sidebar-cat-list">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                className={`sidebar-cat-item ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Online Stats Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="platform-stat">
            <span className="stat-pulse"></span>
            <div>
              <div className="stat-value">64.5K Viewers</div>
              <div className="stat-label">Live on LiveWave</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
