import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StreamPlayer } from './components/StreamPlayer';
import { LiveChat } from './components/LiveChat';
import { BrowseView } from './components/BrowseView';
import { GoLiveModal } from './components/GoLiveModal';
import { ProfileModal } from './components/ProfileModal';
import { TipModal } from './components/TipModal';
import {
  liveStreams as initialStreams,
  categories,
  currentUserProfile as initialUser,
  initialChatMessages
} from './data/mockData';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('stream'); // 'stream' | 'browse' | 'following'
  const [streams, setStreams] = useState(initialStreams);
  const [activeStream, setActiveStream] = useState(initialStreams[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [floatingReactions, setFloatingReactions] = useState([]);

  // Modals state
  const [isGoLiveOpen, setIsGoLiveOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastNotification, setBroadcastNotification] = useState(null);

  // Reaction trigger handler
  const triggerReaction = (emoji) => {
    const newReaction = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      left: Math.floor(Math.random() * 70) + 15 // 15% to 85%
    };
    setFloatingReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2400);
  };

  // Chat message send handler
  const handleSendMessage = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // Stream selection handler
  const handleSelectStream = (stream) => {
    setActiveStream(stream);
    setActiveTab('stream');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category filter handler
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('browse');
  };

  // Broadcast start handler
  const handleStartBroadcast = (broadcastData) => {
    setIsBroadcasting(true);
    const userStream = {
      id: `stream-user-${Date.now()}`,
      title: broadcastData.title,
      streamer: {
        name: currentUser.displayName,
        username: currentUser.username,
        avatar: currentUser.avatarUrl,
        followers: "14.2K",
        verified: true
      },
      category: broadcastData.category,
      tags: broadcastData.tags,
      viewers: 1,
      startedAt: "Just now",
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      videoPoster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      isLive: true,
      description: `Live broadcast hosted by ${currentUser.displayName}.`
    };

    setStreams((prev) => [userStream, ...prev]);
    setActiveStream(userStream);
    setActiveTab('stream');

    setBroadcastNotification(`🎉 You are now broadcasting live: "${broadcastData.title}"!`);
    setTimeout(() => setBroadcastNotification(null), 6000);
  };

  // Tip handler
  const handleSendTip = ({ amount, message }) => {
    // Deduct tokens
    setCurrentUser((prev) => ({
      ...prev,
      tokens: Math.max(0, prev.tokens - amount)
    }));

    // Post to chat
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    handleSendMessage({
      id: `tip-${Date.now()}`,
      user: currentUser.username,
      badge: `⚡ TIP 🌊${amount}`,
      badgeColor: '#f59e0b',
      color: '#f59e0b',
      message: `${message} (Cheered 🌊 ${amount} Waves!)`,
      time: timeStr
    });

    // Trigger multiple burst reactions
    triggerReaction('💎');
    setTimeout(() => triggerReaction('⚡'), 150);
    setTimeout(() => triggerReaction('🎉'), 300);
  };

  // Virtual Gift send handler (Bigo Live style)
  const handleSendGift = (gift, targetName = activeStream.streamer.name) => {
    if (currentUser.tokens < gift.cost) {
      alert(`Insufficient Tokens! You need ${gift.cost} tokens for ${gift.name}.`);
      return false;
    }

    // Deduct tokens
    setCurrentUser((prev) => ({
      ...prev,
      tokens: prev.tokens - gift.cost
    }));

    // Post Gift event to chat
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    handleSendMessage({
      id: `gift-${Date.now()}`,
      user: currentUser.username,
      badge: `🎁 GIFT ${gift.icon}`,
      badgeColor: '#df829a',
      color: '#f472b6',
      message: `Sent ${gift.name} ${gift.icon} (${gift.cost} Tokens) to ${targetName}! 🎉`,
      time: timeStr
    });

    // Trigger multiple emoji bursts
    triggerReaction(gift.icon);
    setTimeout(() => triggerReaction(gift.icon), 120);
    setTimeout(() => triggerReaction('💖'), 240);
    setTimeout(() => triggerReaction('✨'), 360);

    return true;
  };

  return (
    <div className="livewave-app">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenGoLive={() => setIsGoLiveOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currentUser={currentUser}
      />

      {/* Broadcasting Alert Bar */}
      {broadcastNotification && (
        <div className="broadcast-alert-banner">
          <span className="alert-pulse-dot"></span>
          <span>{broadcastNotification}</span>
          <button className="alert-dismiss" onClick={() => setBroadcastNotification(null)}>✕</button>
        </div>
      )}

      {/* Main Body Layout */}
      <div className="app-body-layout">
        {/* Left Collapsible Sidebar */}
        <Sidebar
          streams={streams}
          activeStream={activeStream}
          onSelectStream={handleSelectStream}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Center / Right Content Area */}
        <main className="main-content-area">
          {activeTab === 'stream' && (
            <div className="stream-layout-grid">
              <div className="stream-left-column">
                <StreamPlayer
                  stream={activeStream}
                  currentUser={currentUser}
                  onOpenTip={() => setIsTipOpen(true)}
                  onSendGift={handleSendGift}
                  floatingReactions={floatingReactions}
                  triggerReaction={triggerReaction}
                />
              </div>

              <div className="stream-right-column">
                <LiveChat
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  onOpenTip={() => setIsTipOpen(true)}
                  triggerReaction={triggerReaction}
                  viewerCount={activeStream.viewers}
                />
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <BrowseView
              streams={streams}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectStream={handleSelectStream}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'following' && (
            <div className="following-view">
              <div className="following-header">
                <h2>Channels You Follow</h2>
                <p>Stay updated with your favorite streamers and broadcasters</p>
              </div>

              <div className="following-grid">
                {streams.slice(0, 3).map((stream) => (
                  <div
                    key={stream.id}
                    className="following-channel-card"
                    onClick={() => handleSelectStream(stream)}
                  >
                    <div className="following-card-top">
                      <img src={stream.thumbnail} alt={stream.title} className="following-thumb" />
                      <span className="badge-live-mini">LIVE</span>
                    </div>
                    <div className="following-card-bottom">
                      <img src={stream.streamer.avatar} alt={stream.streamer.name} className="following-avatar" />
                      <div>
                        <h4>{stream.streamer.name}</h4>
                        <p className="following-title">{stream.title}</p>
                        <span className="following-cat">{stream.category} • 👥 {stream.viewers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <GoLiveModal
        isOpen={isGoLiveOpen}
        onClose={() => setIsGoLiveOpen(false)}
        onStartBroadcast={handleStartBroadcast}
        isBroadcasting={isBroadcasting}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={(updated) => setCurrentUser(updated)}
      />

      <TipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
        streamerName={activeStream.streamer.name}
        onSendTip={handleSendTip}
        currentTokens={currentUser.tokens}
      />
    </div>
  );
}

export default App;
