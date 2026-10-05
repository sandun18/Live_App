import React, { useState } from 'react';
import { IconGift, IconX, IconCheck } from './Icons';

export const TipModal = ({ isOpen, onClose, streamerName, onSendTip, currentTokens }) => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('Awesome stream! Keep up the good work! 🔥');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleSend = (e) => {
    e.preventDefault();
    if (finalAmount <= 0) return;
    if (finalAmount > currentTokens) {
      alert("Insufficient Wave tokens balance!");
      return;
    }

    onSendTip({
      amount: finalAmount,
      message: message.trim() || 'Sent a tip!'
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1600);
  };

  const presets = [50, 100, 250, 500, 1000];

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-tip">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon-badge gold">
              <IconGift size={20} color="#f59e0b" />
            </span>
            <div>
              <h3>Tip {streamerName}</h3>
              <p>Support your favorite creator with Wave Tokens</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <IconX size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="tip-success-box">
            <div className="success-icon-ring">
              <IconCheck size={36} color="#10b981" />
            </div>
            <h4>Tip Sent Successfully!</h4>
            <p>You cheered {finalAmount} Waves to {streamerName}!</p>
          </div>
        ) : (
          <form className="tip-form" onSubmit={handleSend}>
            {/* Balance info */}
            <div className="tip-balance-banner">
              <span>Your Current Balance:</span>
              <strong className="balance-highlight">🌊 {currentTokens.toLocaleString()} Waves</strong>
            </div>

            {/* Preset amounts */}
            <div className="form-group">
              <label>Select Amount</label>
              <div className="preset-grid">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`preset-btn ${selectedAmount === val && !customAmount ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedAmount(val);
                      setCustomAmount('');
                    }}
                  >
                    <span className="preset-icon">🌊</span>
                    <span className="preset-val">{val}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="form-group">
              <label>Or Custom Waves Amount</label>
              <input
                type="number"
                min="10"
                max={currentTokens}
                placeholder="Enter custom amount..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="form-input"
              />
            </div>

            {/* Cheer message */}
            <div className="form-group">
              <label>Cheer Message (Shown on Live Screen)</label>
              <input
                type="text"
                maxLength={120}
                placeholder="Add your message to the streamer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-tip-send"
                disabled={finalAmount <= 0 || finalAmount > currentTokens}
              >
                Send 🌊 {finalAmount} Waves
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
