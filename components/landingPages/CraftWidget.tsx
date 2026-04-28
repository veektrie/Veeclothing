'use client';
import React, { useState, useRef, useEffect } from 'react';

const CraftWidget = () => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-appear after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Autoplay muted loop
  useEffect(() => {
    if (videoRef.current && expanded) {
      videoRef.current.play().catch(() => {});
    }
  }, [expanded]);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {/* Label tooltip */}
      {expanded && (
        <div
          style={{
            background: 'rgba(28,28,30,0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212,175,55,0.25)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 8px rgba(212,175,55,0.8)',
              animation: 'pulse 1.5s infinite',
              display: 'inline-block',
            }}
          />
          <span style={{
            fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            Watch Us Work
          </span>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss craft widget"
            style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: '0 0 0 4px',
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Video bubble */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          width: expanded ? 160 : 56,
          height: expanded ? 160 : 56,
          borderRadius: expanded ? 8 : '50%',
          overflow: 'hidden',
          border: `2px solid ${expanded ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.25)'}`,
          cursor: 'pointer',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          boxShadow: expanded
            ? '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15)'
            : '0 4px 20px rgba(0,0,0,0.3)',
          background: '#1C1C1E',
        }}
      >
        <video
          ref={videoRef}
          src="/bgv.mp4"
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Collapsed state icon overlay */}
        {!expanded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(26,82,118,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default CraftWidget;
