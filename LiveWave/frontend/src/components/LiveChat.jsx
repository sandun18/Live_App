import React, { useState, useEffect, useRef } from 'react';
import { IconSend, IconGift, IconSparkles, IconShield } from './Icons';
import { simulatedChatResponses } from '../data/mockData';

export const LiveChat = ({
  messages,
  onSendMessage,
  onOpenTip,
  triggerReaction,
  viewerCount = 1420
}) => {
  const [inputText, setInputText] = useState('');
  const [chatToast, setChatToast] = useState(null);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Periodic simulated chatter activity
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const template = simulatedChatResponses[index % simulatedChatResponses.length];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      onSendMessage({
        id: `sim-${Date.now()}`,
        user: template.user,
        message: template.message,
        badge: template.badge,
        badgeColor: template.badgeColor,
        color: template.color,
        time: timeStr
      });

      // Occasionally trigger floating reaction
      if (Math.random() > 0.4) {
        const emojis = ['🔥', '❤️', '👏', '🚀', '💎'];
        triggerReaction(emojis[Math.floor(Math.random() * emojis.length)]);
      }

      index++;
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    onSendMessage({
      id: `user-${Date.now()}`,
      user: "sandun_dev",
      message: inputText.trim(),
      badge: "STREAMER",
      badgeColor: "#6366f1",
      color: "#818cf8",
      time: timeStr
    });

    setInputText('');
  };

  const reactionEmojis = ['❤️', '🔥', '🚀', '👏', '💎', '🎉'];

  return (
    <div className="live-chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-title">
          <h3>STREAM CHAT</h3>
          <span className="chat-slowmode">Slow Mode: 3s</span>
        </div>
        <div className="chat-viewer-counter">
          <span className="live-dot-mini"></span>
          <span>{viewerCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Gift / Superchat Event Banner */}
      {chatToast && (
        <div className="chat-event-banner">
          <span className="event-icon">⚡</span>
          <div className="event-info">
            <strong>{chatToast.user}</strong> sent {chatToast.amount} Waves!
            <p className="event-msg">"{chatToast.message}"</p>
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="chat-messages-scroll">
        <div className="chat-welcome-notice">
          <span className="notice-icon">🛡️</span>
          <div>
            <strong>Welcome to the chat room!</strong>
            <p>Be respectful, enjoy the stream and keep it friendly.</p>
          </div>
        </div>

        {messages.map((item) => (
          <div key={item.id} className="chat-message-row">
            <span className="msg-time">{item.time}</span>
            {item.badge && (
              <span
                className="chat-user-badge"
                style={{
                  backgroundColor: item.badgeColor ? `${item.badgeColor}25` : 'rgba(255,255,255,0.1)',
                  color: item.badgeColor || '#fff',
                  borderColor: item.badgeColor ? `${item.badgeColor}50` : 'transparent'
                }}
              >
                {item.badge}
              </span>
            )}
            <span className="msg-username" style={{ color: item.color || '#38bdf8' }}>
              {item.user}:
            </span>
            <span className="msg-content">{item.message}</span>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Reaction Bar */}
      <div className="quick-reaction-bar">
        <span className="reaction-label">Quick:</span>
        <div className="quick-emojis">
          {reactionEmojis.map((emoji) => (
            <button
              key={emoji}
              className="emoji-quick-btn"
              onClick={() => triggerReaction(emoji)}
              title={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Section */}
      <form className="chat-input-box" onSubmit={handleSend}>
        <div className="input-group">
          <input
            type="text"
            className="chat-field"
            placeholder="Send a message in chat..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={250}
          />
          <button
            type="button"
            className="chat-action-btn gift-btn"
            onClick={onOpenTip}
            title="Tip Waves to Streamer"
          >
            <IconGift size={18} color="var(--accent-gold)" />
          </button>
          <button
            type="submit"
            className="chat-action-btn send-btn"
            disabled={!inputText.trim()}
            title="Send Message"
          >
            <IconSend size={18} color={inputText.trim() ? "#fff" : "var(--text-muted)"} />
          </button>
        </div>
      </form>
    </div>
  );
};
