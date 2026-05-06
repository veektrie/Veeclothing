'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '2348103031020';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I'd like to speak with a tailor about a commission."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppFloat() {
  const [showLabel, setShowLabel] = useState(false);
  const [visible, setVisible] = useState(false);

  // Delay mount so it doesn't flash immediately on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[900] flex items-center gap-3">
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold text-white whitespace-nowrap"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'rgba(26,82,118,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 8px 24px rgba(26,82,118,0.2)',
            }}
          >
            Speak to a Tailor
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with a tailor on WhatsApp"
        id="whatsapp-float"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        className="flex items-center justify-center w-[52px] h-[52px] rounded-full shadow-xl flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #1A5276 0%, #1a6e9e 100%)',
          border: '1px solid #D4AF37',
          boxShadow: '0 8px 32px rgba(26,82,118,0.35), 0 0 0 0 rgba(212,175,55,0.4)',
        }}
      >
        {/* WhatsApp SVG icon in brand navy/gold palette */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.393A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
            fill="rgba(255,255,255,0.15)"
          />
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill="#D4AF37"
          />
        </svg>
      </motion.a>
    </div>
  );
}
