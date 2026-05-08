'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';

// X Icon (Twitter X)
const XIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
  </svg>
);

const sentiments = [
  {
    name: 'Chukwuemeka A.',
    role: 'CEO, Finance Group',
    platform: 'linkedin',
    text: '"The bespoke suit I commissioned for my board meeting was impeccable. The fit, the fabric choice, and the sharp silhouette surpassed my expectations of African tailoring."',
    date: '10/12/2024',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Barrister Rotimi O.',
    role: 'Senior Counsel',
    platform: 'x',
    text: '"I wore a Vee Agbada for my daughter\'s wedding. It was the talk of the event. The embroidery is sophisticated and modern, yet respects our heritage perfectly."',
    date: '09/30/2024',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Amina R.',
    role: 'Operations Director',
    platform: 'linkedin',
    text: '"We ordered branded uniforms for our executive team. The consistency across 50 units was flawless. Vee is our primary choice for corporate identity apparel."',
    date: '11/05/2024',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Femi K.',
    role: 'Tech Consultant',
    platform: 'instagram',
    text: '"Their premium polos and hoodies are a staple for my weekend wardrobe. Even after many washes, the structure and color remain as vibrant as day one."',
    date: '12/01/2024',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Segun A.',
    role: 'Managing Partner',
    platform: 'x',
    text: '"Vee\'s kaftans have replaced my foreign shirts for daily business. They are breathable, expertly stitched, and project the right level of authority."',
    date: '01/15/2025',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Kunle M.',
    role: 'Creative Lead',
    platform: 'instagram',
    text: '"I chose Vee for my wedding suit and my groomsmen. The coordination was seamless, and we all felt incredibly confident on the big day. Exceptional service."',
    date: '02/10/2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
  },
  {
    name: 'Dr. Olayinka J.',
    role: 'Medical Director',
    platform: 'linkedin',
    text: '"As a long-term client, I appreciate the consistency. Whether it is a signature tee or a full three-piece suit, the quality is always world-class."',
    date: '03/05/2025',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=300&auto=format&fit=crop'
  }
];

const SocialProofRibbon = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin size={16} className="text-[#0A66C2]" />;
      case 'instagram': return <Instagram size={16} className="text-[#E4405F]" />;
      case 'x': return <XIcon size={14} className="text-black" />;
      default: return <XIcon size={14} />;
    }
  };

  return (
    <section id="testimonials" className="testimonials-section py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-[700px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-black/5 bg-white text-[10px] font-bold uppercase tracking-widest text-[#64748b] mb-8"
            >
              Testimonial
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold text-[#1C1C1E] leading-[1.05] tracking-tight"
            >
              Chosen by the <br />
              <span className="testimonials-dim-text">discerning elite.</span>
            </motion.h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1C1C1E] hover:bg-[#1A5276] hover:text-white transition-all duration-300 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-[#1C1C1E] hover:bg-[#1A5276] hover:text-white transition-all duration-300 shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x snap-mandatory -mx-[clamp(1.5rem,5vw,4rem)] px-[clamp(1.5rem,5vw,4rem)]"
        >
          {sentiments.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="min-w-[320px] md:min-w-[400px] snap-center relative rounded-[40px] p-10 flex flex-col min-h-[400px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 testimonial-card shadow-sm"
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Top Row: User Info */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black/5 shadow-sm">
                      <Image src={s.avatar} alt={s.name} fill className="object-cover" unoptimized />
                    </div>
                    <div>
                      <h4 className="font-bold text-[16px] text-[#1C1C1E] leading-tight">{s.name}</h4>
                      <p className="text-[12px] font-medium text-[#64748b]">{s.role}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5">
                    {getPlatformIcon(s.platform)}
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-[clamp(1.1rem,1.5vw,1.25rem)] font-medium leading-relaxed tracking-tight text-[#1C1C1E]">
                    {s.text}
                  </p>
                </div>

                {/* Bottom Row: Stars & Date */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-black/5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#F1C40F">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[12px] font-bold tracking-widest text-[#64748b]">
                    {s.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default SocialProofRibbon;
