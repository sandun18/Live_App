import React, { useState, useEffect } from 'react';
import {
  IconPlay,
  IconPause,
  IconVolume,
  IconVolumeMute,
  IconMaximize,
  IconSettings,
  IconHeart,
  IconShare,
  IconGift,
  IconCheck,
  IconShield,
  IconLive
} from './Icons';
import { virtualGifts } from '../data/mockData';

export const StreamPlayer = ({
  stream,
  currentUser,
  onOpenTip,
  onSendGift,
  floatingReactions,
  triggerReaction
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [quality, setQuality] = useState('1080p60');
  const [showSettings, setShowSettings] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1284);
  const [copiedLink, setCopiedLink] = useState(false);
  const [streamUptime, setStreamUptime] = useState('01:24:38');

  // Bigo Live specific states
  const [isPkMode, setIsPkMode] = useState(stream.isPkActive || false);
  const [isPortraitMode, setIsPortraitMode] = useState(false);
  const [isGiftDrawerOpen, setIsGiftDrawerOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(virtualGifts[0]);
  const [comboCount, setComboCount] = useState(0);
  const [comboTimer, setComboTimer] = useState(null);
  const [giftBanner, setGiftBanner] = useState(null);
  const [blueScore, setBlueScore] = useState(2450);
  const [redScore, setRedScore] = useState(1840);
  const [pkTimeRemaining, setPkTimeRemaining] = useState(165); // 2m 45s

  // Multi-guest seats state
  const [guestSeats, setGuestSeats] = useState([
    { id: 1, name: 'Tharindu_LK', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80', isSpeaking: true },
    { id: 2, name: 'Naveen_X', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', isSpeaking: false },
    { id: 3, name: null, avatar: null, isSpeaking: false },
    { id: 4, name: null, avatar: null, isSpeaking: false },
    { id: 5, name: null, avatar: null, isSpeaking: false },
    { id: 6, name: null, avatar: null, isSpeaking: false },
  ]);

  // Simulated live uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String((now.getHours() % 4) + 1).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setStreamUptime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // PK Battle countdown timer
  useEffect(() => {
    if (!isPkMode) return;
    const pkTimer = setInterval(() => {
      setPkTimeRemaining((prev) => {
        if (prev <= 1) return 180; // Loop back
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(pkTimer);
  }, [isPkMode]);

  const formatPkTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
    } else {
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  // Screen Tap-to-like handler (iconic Bigo feature)
  const handleScreenTap = (e) => {
    // Avoid triggering when clicking buttons/controls
    if (e.target.closest('button') || e.target.closest('.player-controls') || e.target.closest('.gift-drawer-overlay') || e.target.closest('.bigo-top-streamer-bar')) {
      return;
    }
    const hearts = ['❤️', '💖', '🔥', '✨', '🥰', '⭐'];
    const chosenHeart = hearts[Math.floor(Math.random() * hearts.length)];
    triggerReaction(chosenHeart);
    setLikeCount((prev) => prev + 1);
  };

  const handleLikeToggle = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      triggerReaction('❤️');
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Virtual Gift sending logic with Combo streak
  const handleQuickSendGift = (gift) => {
    if (!onSendGift) return;
    const success = onSendGift(gift, stream.streamer.name);
    if (!success) return;

    // Increment Blue team PK score
    setBlueScore((prev) => prev + gift.cost * 12);

    // Update Combo counter
    setComboCount((prev) => prev + 1);
    if (comboTimer) clearTimeout(comboTimer);
    const newTimer = setTimeout(() => {
      setComboCount(0);
    }, 3500);
    setComboTimer(newTimer);

    // Show flying celebration banner
    setGiftBanner({
      sender: currentUser?.displayName || 'You',
      giftName: gift.name,
      icon: gift.icon,
      cost: gift.cost,
      target: stream.streamer.name
    });
    setTimeout(() => setGiftBanner(null), 3800);
  };

  // Multi-guest seat toggle handler
  const handleSeatClick = (seatId) => {
    setGuestSeats((prev) =>
      prev.map((seat) => {
        if (seat.id === seatId) {
          if (seat.name) {
            // Already taken, if it's the current user they can leave
            if (seat.name === (currentUser?.displayName || 'You')) {
              return { ...seat, name: null, avatar: null, isSpeaking: false };
            }
            return seat;
          } else {
            // Join mic
            return {
              ...seat,
              name: currentUser?.displayName || 'You',
              avatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
              isSpeaking: true
            };
          }
        }
        return seat;
      })
    );
  };

  const bluePercent = Math.min(85, Math.max(15, (blueScore / (blueScore + redScore)) * 100));

  return (
    <div className={`stream-player-container ${isPortraitMode ? 'portrait-layout' : ''}`}>
      {/* Video Screen Container */}
      <div className={`video-viewport ${isPortraitMode ? 'portrait-mode' : ''}`} onClick={handleScreenTap}>
        {/* Floating Celebration Banner */}
        {giftBanner && (
          <div className="bigo-gift-broadcast-banner">
            <span className="gift-banner-icon">{giftBanner.icon}</span>
            <div className="gift-banner-text">
              <strong>{giftBanner.sender}</strong> sent <strong>{giftBanner.giftName}</strong> to {giftBanner.target}!
            </div>
            {comboCount > 1 && (
              <span className="gift-combo-pill">x{comboCount} COMBO! 🔥</span>
            )}
          </div>
        )}

        {/* Animated Visual Screen */}
        <div
          className={`video-feed ${isPkMode ? 'pk-split-view' : ''}`}
          style={!isPkMode ? { backgroundImage: `url(${stream.videoPoster})` } : {}}
        >
          <div className="video-overlay-gradient"></div>

          {/* PK Battle Mode Split Screen */}
          {isPkMode ? (
            <div className="pk-battle-stage">
              {/* Left Host (Blue Team) */}
              <div className="pk-host-side blue-side" style={{ backgroundImage: `url(${stream.videoPoster})` }}>
                <div className="pk-side-overlay"></div>
                <div className="pk-streamer-tag">
                  <span className="side-badge blue">🔵 BLUE</span>
                  <span className="side-name">{stream.streamer.name}</span>
                </div>
              </div>

              {/* Center VS Emblem */}
              <div className="pk-vs-center">
                <div className="pk-vs-badge">VS</div>
                <span className="pk-vs-flame">⚔️</span>
              </div>

              {/* Right Host (Red Team) */}
              <div
                className="pk-host-side red-side"
                style={{
                  backgroundImage: `url(${
                    stream.pkOpponent?.videoPoster ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
                  })`
                }}
              >
                <div className="pk-side-overlay"></div>
                <div className="pk-streamer-tag right">
                  <span className="side-badge red">🔴 RED</span>
                  <span className="side-name">{stream.pkOpponent?.name || 'Maya Frost'}</span>
                </div>
              </div>
            </div>
          ) : (
            isPlaying && (
              <div className="stream-ambience">
                <div className="ambience-light glow-1"></div>
                <div className="ambience-light glow-2"></div>
              </div>
            )
          )}

          {/* Floating Live Reactions (Bigo Tap Hearts) */}
          <div className="reactions-stage">
            {floatingReactions.map((reaction) => (
              <span
                key={reaction.id}
                className="floating-emoji"
                style={{ left: `${reaction.left}%` }}
              >
                {reaction.emoji}
              </span>
            ))}
          </div>

          {/* Bigo Live Style Top Streamer Bar */}
          <div className="bigo-top-streamer-bar">
            {/* Host Profile Capsule */}
            <div className="bigo-host-capsule">
              <img
                src={stream.streamer.avatar}
                alt={stream.streamer.name}
                className="bigo-host-avatar"
              />
              <div className="bigo-host-info">
                <div className="bigo-host-name-row">
                  <span className="bigo-host-name">{stream.streamer.name}</span>
                  <span className="bigo-level-badge">Lv.{stream.hostLevel || 48}</span>
                </div>
                <div className="bigo-beans-row">
                  <span className="beans-icon">💎</span>
                  <span className="beans-count">{stream.beans || '68.4K'}</span>
                  <span className="country-flag">{stream.country || '🇱🇰 LK'}</span>
                </div>
              </div>
              <button
                className={`bigo-follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? '✓' : '+ Follow'}
              </button>
            </div>

            {/* Top Contributors Row (Rank 1, 2, 3 with Crowns) */}
            <div className="bigo-top-fans-row">
              {(stream.topContributors || [
                { rank: 1, name: 'Tharindu', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80' },
                { rank: 2, name: 'Naveen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
                { rank: 3, name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' }
              ]).map((fan) => (
                <div key={fan.rank} className="top-fan-avatar-wrapper" title={`Rank ${fan.rank}: ${fan.name}`}>
                  <span className={`fan-crown crown-${fan.rank}`}>
                    {fan.rank === 1 ? '👑' : fan.rank === 2 ? '🥈' : '🥉'}
                  </span>
                  <img src={fan.avatar} alt={fan.name} className="top-fan-avatar" />
                </div>
              ))}
            </div>

            {/* Viewers & Room ID */}
            <div className="bigo-viewers-box">
              <span className="viewer-pill">👥 {stream.viewers.toLocaleString()}</span>
              <span className="room-id-tag">{stream.bigoId || 'ID: 981240'}</span>
            </div>
          </div>

          {/* PK Battle Progress Tug-of-War Bar */}
          {isPkMode && (
            <div className="bigo-pk-progress-bar-container">
              <div className="pk-scores-row">
                <span className="pk-score blue">🔵 {blueScore.toLocaleString()} pts</span>
                <span className="pk-timer-badge">⚔️ PK {formatPkTime(pkTimeRemaining)}</span>
                <span className="pk-score red">{redScore.toLocaleString()} pts 🔴</span>
              </div>
              <div className="pk-bar-track">
                <div className="pk-bar-fill-blue" style={{ width: `${bluePercent}%` }}></div>
                <div className="pk-bar-fill-red" style={{ width: `${100 - bluePercent}%` }}></div>
              </div>
            </div>
          )}

          {/* Center Play Indicator if Paused */}
          {!isPlaying && (
            <div className="paused-overlay" onClick={handleTogglePlay}>
              <div className="play-button-large">
                <IconPlay size={36} color="#fff" />
              </div>
              <span>STREAM PAUSED</span>
            </div>
          )}

          {/* Bottom Custom Video Controls */}
          <div className="player-controls">
            <div className="controls-left">
              <button className="ctrl-btn" onClick={handleTogglePlay} title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <IconPause size={20} /> : <IconPlay size={20} />}
              </button>

              <div className="volume-control-group">
                <button className="ctrl-btn" onClick={handleToggleMute}>
                  {isMuted || volume === 0 ? <IconVolumeMute size={20} /> : <IconVolume size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              <div className="stream-sync-pill">
                <span className="sync-dot"></span>
                <span>Low Latency (1.1s)</span>
              </div>
            </div>

            <div className="controls-right">
              {/* PK Battle Mode Toggle */}
              <button
                className={`ctrl-btn pk-toggle-btn ${isPkMode ? 'active' : ''}`}
                onClick={() => setIsPkMode(!isPkMode)}
                title="Toggle 1v1 PK Battle Mode"
              >
                <span>⚔️ PK Mode</span>
              </button>

              {/* Portrait / Landscape Toggle */}
              <button
                className={`ctrl-btn ${isPortraitMode ? 'active' : ''}`}
                onClick={() => setIsPortraitMode(!isPortraitMode)}
                title="Toggle Mobile Portrait View"
              >
                <span>📱 {isPortraitMode ? '16:9' : '9:16'}</span>
              </button>

              {/* Quality selector dropdown */}
              <div className="settings-wrapper">
                <button
                  className="ctrl-btn"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Stream Settings"
                >
                  <IconSettings size={20} />
                </button>
                {showSettings && (
                  <div className="quality-menu">
                    <span className="quality-menu-title">Video Quality</span>
                    {['1080p60 (Source)', '720p60', '480p', 'Auto'].map((q) => (
                      <button
                        key={q}
                        className={`quality-opt ${quality.includes(q.split(' ')[0]) ? 'active' : ''}`}
                        onClick={() => {
                          setQuality(q);
                          setShowSettings(false);
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="ctrl-btn"
                onClick={() => {
                  const elem = document.querySelector('.video-viewport');
                  if (!document.fullscreenElement) {
                    elem?.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                title="Fullscreen"
              >
                <IconMaximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bigo Multi-Guest Audio/Video Seats (6 Slots) */}
      <div className="bigo-multi-guest-container">
        <div className="multi-guest-header">
          <div className="guest-header-title">
            <span className="mic-icon">🎙️</span>
            <h4>Multi-Guest Room ({guestSeats.filter(s => s.name).length}/6 Seats)</h4>
          </div>
          <span className="guest-header-hint">Tap an open seat to join the mic</span>
        </div>
        <div className="guest-seats-grid">
          {guestSeats.map((seat) => (
            <div
              key={seat.id}
              className={`guest-seat-card ${seat.name ? 'occupied' : 'empty'}`}
              onClick={() => handleSeatClick(seat.id)}
            >
              <div className="seat-avatar-wrapper">
                {seat.name ? (
                  <>
                    <img src={seat.avatar} alt={seat.name} className="seat-avatar" />
                    {seat.isSpeaking && <span className="mic-speaking-pulse">🎙️</span>}
                  </>
                ) : (
                  <div className="seat-empty-slot">
                    <span className="seat-plus">+</span>
                  </div>
                )}
              </div>
              <span className="seat-user-name">
                {seat.name ? seat.name : `Seat ${seat.id}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Info & Streamer Banner */}
      <div className="streamer-meta-container">
        <div className="streamer-main-info">
          <div className="streamer-avatar-block">
            <div className="avatar-ring">
              <img
                src={stream.streamer.avatar}
                alt={stream.streamer.name}
                className="meta-avatar"
              />
              <span className="avatar-live-tag">LIVE</span>
            </div>
          </div>

          <div className="streamer-text-details">
            <h1 className="stream-title">{stream.title}</h1>
            <div className="streamer-subline">
              <span className="streamer-name">
                {stream.streamer.name}
                {stream.streamer.verified && (
                  <span className="verified-badge" title="Verified Streamer">
                    <IconCheck size={12} color="#fff" />
                  </span>
                )}
              </span>
              <span className="separator">•</span>
              <span className="stream-category-link">{stream.category}</span>
              <span className="separator">•</span>
              <span className="streamer-followers">{stream.streamer.followers} followers</span>
            </div>

            {/* Tags */}
            <div className="stream-tags-list">
              {stream.tags.map((tag) => (
                <span key={tag} className="badge-tag">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Quick Gift, Tip, Like, Share */}
        <div className="streamer-actions">
          {/* Dedicated Bigo Virtual Gifts Button */}
          <button
            className="btn btn-primary bigo-gift-trigger-btn"
            onClick={() => setIsGiftDrawerOpen(!isGiftDrawerOpen)}
          >
            <span className="gift-btn-sparkle">🎁</span>
            <span>Send Gift</span>
          </button>

          <button
            className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? (
              <>
                <IconCheck size={16} />
                <span>Following</span>
              </>
            ) : (
              <span>+ Follow</span>
            )}
          </button>

          <button className="btn btn-secondary" onClick={onOpenTip}>
            <IconGift size={16} color="var(--accent-gold)" />
            <span>Tip Waves</span>
          </button>

          <button
            className={`btn-icon ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeToggle}
            title="Like Stream (or tap screen)"
          >
            <IconHeart size={18} fill={isLiked ? "var(--accent-pink)" : "none"} color={isLiked ? "var(--accent-pink)" : "currentColor"} />
          </button>

          <button className="btn-icon" onClick={handleShare} title="Share stream">
            <IconShare size={18} />
          </button>

          {copiedLink && (
            <div className="copied-toast">Link Copied!</div>
          )}
        </div>
      </div>

      {/* Bigo Virtual Gifts Tray (Sliding Gift Drawer) */}
      {isGiftDrawerOpen && (
        <div className="bigo-gift-drawer">
          <div className="gift-drawer-header">
            <div className="drawer-balance-pill">
              <span>Token Balance:</span>
              <span className="balance-tokens">💎 {currentUser?.tokens?.toLocaleString() || 2850}</span>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => setIsGiftDrawerOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="gift-cards-scroll">
            {virtualGifts.map((gift) => (
              <div
                key={gift.id}
                className={`virtual-gift-card ${selectedGift.id === gift.id ? 'active' : ''}`}
                onClick={() => setSelectedGift(gift)}
              >
                <div className="gift-icon-large">{gift.icon}</div>
                <span className="gift-card-title">{gift.name}</span>
                <span className="gift-card-price">💎 {gift.cost}</span>
              </div>
            ))}
          </div>

          <div className="gift-drawer-footer">
            <div className="selected-gift-summary">
              <span>Selected:</span>
              <strong>{selectedGift.icon} {selectedGift.name}</strong>
              <span className="summary-cost">({selectedGift.cost} Tokens)</span>
            </div>
            <button
              className="btn btn-primary send-gift-action-btn"
              onClick={() => handleQuickSendGift(selectedGift)}
            >
              <span>Send Now 🚀</span>
              {comboCount > 0 && <span className="action-combo-badge">x{comboCount}</span>}
            </button>
          </div>
        </div>
      )}

      {/* Stream Description Box */}
      <div className="stream-description-card">
        <h3>About this stream</h3>
        <p>{stream.description}</p>
      </div>
    </div>
  );
};
