'use client';
import React from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';

const Intro = () => {
  const [playVideo, setPlayVideo] = React.useState(false);
  const vidRef = React.useRef<HTMLVideoElement>(null);

  const handleVideo = () => {
    if (!vidRef.current) return;
    setPlayVideo((prev) => {
      if (prev) {
        vidRef.current!.pause();
      } else {
        vidRef.current!.play();
      }
      return !prev;
    });
  };

  return (
    <section className="video-section">
      <video
        src="/bgv.mp4"
        ref={vidRef}
        loop
        muted
        playsInline
        controls={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div className="video-overlay">
        {/* Centered content */}
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <span
            className="section-label"
            style={{ color: 'rgba(212,175,55,0.8)', display: 'block', marginBottom: 16 }}
          >
            Precision in Every Stitch
          </span>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              color: '#fff',
              fontWeight: 300,
              letterSpacing: '0.05em',
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            The Art of Tailoring,<br />
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>In Motion.</em>
          </h2>

          {/* Play button */}
          <button
            className="play-btn"
            onClick={handleVideo}
            aria-label={playVideo ? 'Pause video' : 'Play video'}
            style={{ margin: '0 auto' }}
          >
            {playVideo
              ? <BsPauseFill color="#D4AF37" fontSize={28} />
              : <BsFillPlayFill color="#D4AF37" fontSize={28} style={{ marginLeft: 3 }} />
            }
          </button>
        </div>

        {/* Decorative corner lines */}
        <div style={{
          position: 'absolute', top: 40, left: 40,
          width: 60, height: 60,
          borderTop: '1px solid rgba(212,175,55,0.3)',
          borderLeft: '1px solid rgba(212,175,55,0.3)',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, right: 40,
          width: 60, height: 60,
          borderBottom: '1px solid rgba(212,175,55,0.3)',
          borderRight: '1px solid rgba(212,175,55,0.3)',
        }} />
      </div>
    </section>
  );
};

export default Intro;