'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function BlogNav() {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return (
    <div
      className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[900] bg-white/90 backdrop-blur-xl border border-black/10 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6"
    >
      <Link href="/blog" className="flex items-center gap-2 text-slate-600 font-inter text-[11px] md:text-xs font-bold tracking-widest uppercase hover:text-navy transition-colors group">
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
        Return
      </Link>
      <div className="w-[1px] h-4 bg-black/10"></div>
      <button
        className="flex items-center gap-2 text-slate-600 font-inter text-[11px] md:text-xs font-bold tracking-widest uppercase hover:text-navy transition-colors group"
        onClick={handleShare}
      >
        <Share2 size={13} className="transition-transform group-hover:scale-110" />
        Share
      </button>
    </div>
  );
}
