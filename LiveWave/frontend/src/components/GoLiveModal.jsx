import React, { useState, useEffect, useRef } from 'react';
import { IconCamera, IconMic, IconCopy, IconCheck, IconX, IconLive } from './Icons';

export const GoLiveModal = ({ isOpen, onClose, onStartBroadcast, isBroadcasting }) => {
  const [streamTitle, setStreamTitle] = useState('🔴 Live Coding: Building LiveWave Web App!');
  const [category, setCategory] = useState('Tech & Coding');
  const [tags, setTags] = useState('React, Vite, RealTime, LiveLK');
  const [resolution, setResolution] = useState('1080p');
  const [streamKey] = useState('live_wave_sec_7894a8c909e2b14f88');
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);

  // Try to acquire webcam if available, or gracefully fallback to high-tech canvas/simulator
  useEffect(() => {
    let streamObj = null;
    if (isOpen && camActive && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((s) => {
          streamObj = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCameraError(null);
        })
        .catch(() => {
          setCameraError("Camera preview active in simulated studio mode");
        });
    }

    return () => {
      if (streamObj) {
        streamObj.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, camActive]);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(streamKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleBroadcastClick = () => {
    onStartBroadcast({
      title: streamTitle,
      category,
      tags: tags.split(',').map(t => t.trim()),
      resolution
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-golive">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon-badge">
              <IconCamera size={20} color="#fff" />
            </span>
            <div>
              <h3>Creator Broadcast Studio</h3>
              <p>Configure your stream settings and preview your camera feed</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <IconX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-split">
          {/* Left: Studio Preview */}
          <div className="studio-preview-col">
            <div className="preview-screen">
              {camActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="studio-video"
                />
              ) : (
                <div className="camera-off-state">
                  <span>Camera is turned off</span>
                </div>
              )}

              {/* Status indicator overlay */}
              <div className="preview-overlay-info">
                <span className="studio-pill">
                  <span className="dot green"></span>
                  {camActive ? "Studio Feed Active" : "Audio Only"}
                </span>
                <span className="studio-pill">
                  {resolution} • 60 FPS
                </span>
              </div>

              {/* Mic volume simulator */}
              {micActive && (
                <div className="mic-meter-box">
                  <span className="mic-icon">🎙️</span>
                  <div className="mic-bars">
                    <span className="bar b1"></span>
                    <span className="bar b2"></span>
                    <span className="bar b3"></span>
                    <span className="bar b4"></span>
                    <span className="bar b5"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Device Toggles */}
            <div className="device-toggles-row">
              <button
                type="button"
                className={`device-btn ${camActive ? 'active' : ''}`}
                onClick={() => setCamActive(!camActive)}
              >
                <IconCamera size={16} />
                <span>{camActive ? 'Camera ON' : 'Camera OFF'}</span>
              </button>

              <button
                type="button"
                className={`device-btn ${micActive ? 'active' : ''}`}
                onClick={() => setMicActive(!micActive)}
              >
                <IconMic size={16} />
                <span>{micActive ? 'Mic Active' : 'Mic Muted'}</span>
              </button>
            </div>

            {/* OBS / RTMP Stream Configuration */}
            <div className="rtmp-info-box">
              <div className="rtmp-field">
                <label>Stream RTMP URL</label>
                <div className="rtmp-input-row">
                  <code>rtmp://live.livewave.tv/app</code>
                </div>
              </div>

              <div className="rtmp-field">
                <label>Stream Key (Keep Private!)</label>
                <div className="rtmp-input-row">
                  <input
                    type={showStreamKey ? 'text' : 'password'}
                    readOnly
                    value={streamKey}
                    className="key-field"
                  />
                  <button
                    type="button"
                    className="key-action-btn"
                    onClick={() => setShowStreamKey(!showStreamKey)}
                  >
                    {showStreamKey ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    className="key-action-btn copy"
                    onClick={handleCopyKey}
                  >
                    {copiedKey ? <IconCheck size={14} color="#10b981" /> : <IconCopy size={14} />}
                    {copiedKey ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Broadcast Metadata */}
          <div className="studio-form-col">
            <div className="form-group">
              <label>Stream Title</label>
              <input
                type="text"
                className="form-input"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="Give your stream a catchy title"
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label>Primary Category</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Tech & Coding">Tech & Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Just Chatting">Just Chatting</option>
                <option value="Music & Beats">Music & Beats</option>
                <option value="Creative & Art">Creative & Art</option>
                <option value="Esports">Esports</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tags (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. React, Gaming, LoFi, Sinhala"
              />
            </div>

            <div className="form-group">
              <label>Broadcast Quality</label>
              <div className="quality-pill-options">
                {['1080p (FHD 60FPS)', '720p (HD 60FPS)', '480p (Standard)'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`quality-badge-btn ${resolution.startsWith(opt.slice(0, 5)) ? 'active' : ''}`}
                    onClick={() => setResolution(opt.split(' ')[0])}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="studio-info-callout">
              <span className="callout-icon">💡</span>
              <p>When you start broadcasting, your stream will automatically notify your <strong>14,200</strong> followers.</p>
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-live btn-broadcast-go"
                onClick={handleBroadcastClick}
              >
                <IconLive size={18} />
                <span>{isBroadcasting ? "Update Stream Info" : "Start Broadcasting Now"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
