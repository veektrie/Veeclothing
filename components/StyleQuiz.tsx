'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  slug?: string;
  cat?: string;
  src?: string;
  price?: number;
  tags?: string[];
  colors?: any[];
}

interface StyleQuizProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const OCCASIONS = [
  { id: 'boardroom', label: 'The Boardroom', icon: '👔', keywords: ['suit', 'shirt', 'corporate', 'formal'] },
  { id: 'wedding', label: 'A Wedding / Event', icon: '🥂', keywords: ['suit', 'agbada', 'ceremony', 'tuxedo'] },
  { id: 'casual', label: 'Smart Casual Weekend', icon: '🍸', keywords: ['shirt', 'pant', 'casual', 'linen'] },
  { id: 'traditional', label: 'Traditional Gathering', icon: '👑', keywords: ['agbada', 'kaftan', 'native', 'traditional'] },
];

const PALETTES = [
  { id: 'dark', label: 'Classic Darks', color: '#111827', hex: '#111827' },
  { id: 'earth', label: 'Earth Tones', color: '#78350F', hex: '#78350F' },
  { id: 'bright', label: 'Bold & Vibrant', color: '#B91C1C', hex: '#B91C1C' },
  { id: 'light', label: 'Crisp & Light', color: '#F3F4F6', hex: '#F3F4F6' },
];

const FITS = [
  { id: 'slim', label: 'Sharp & Tailored', desc: 'A modern, close-to-body silhouette.' },
  { id: 'relaxed', label: 'Relaxed & Flowing', desc: 'Comfortable, breathable, and elegant.' },
];

export default function StyleQuiz({ isOpen, onClose, products }: StyleQuizProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [palette, setPalette] = useState('');
  const [fit, setFit] = useState('');
  const [isCurating, setIsCurating] = useState(false);
  const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setOccasion('');
      setPalette('');
      setFit('');
      setCuratedProducts([]);
      setIsCurating(false);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const handleCuration = () => {
    setIsCurating(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let filtered = [...products];
      
      const occ = OCCASIONS.find(o => o.id === occasion);
      if (occ) {
        filtered = filtered.filter(p => {
          const cat = p.cat?.toLowerCase() || '';
          const name = p.name?.toLowerCase() || '';
          return occ.keywords.some(k => cat.includes(k) || name.includes(k));
        });
      }

      // If filtering was too strict, fallback to matching just the category roughly
      if (filtered.length < 2) {
        filtered = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
      } else {
        // Take top 4
        filtered = filtered.slice(0, 4);
      }

      setCuratedProducts(filtered);
      setIsCurating(false);
      setStep(4); // Results step
    }, 2000);
  };

  const handleNext = () => {
    if (step === 1 && occasion) setStep(2);
    else if (step === 2 && palette) setStep(3);
    else if (step === 3 && fit) handleCuration();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative w-full max-w-[800px] min-h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border border-[#1A5276]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-[#FDFBF7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A5276]/10 flex items-center justify-center text-[#1A5276]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase font-bold text-[#1C1C1E]">The Digital Stylist</h3>
                  <p className="text-[10px] text-[#64748b]">A curated wardrobe, tailored for you.</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#64748b] hover:bg-black/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10 bg-[#F8FAFC] relative overflow-y-auto">
              {isCurating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] z-20">
                  <div className="w-16 h-16 border-4 border-[#1A5276]/20 border-t-[#1A5276] rounded-full animate-spin mb-6" />
                  <h2 className="text-xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Curating Your Look...</h2>
                  <p className="text-sm text-[#64748b]">Selecting the finest fabrics and cuts.</p>
                </div>
              ) : (
                <>
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What are you dressing for?</h2>
                      <p className="text-sm text-[#64748b] mb-8">Select the occasion to help us find the perfect silhouette.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {OCCASIONS.map(occ => (
                          <button
                            key={occ.id}
                            onClick={() => setOccasion(occ.id)}
                            className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${occasion === occ.id ? 'border-[#1A5276] bg-[#1A5276]/5 shadow-sm' : 'border-black/10 bg-white hover:border-[#1A5276]/30'}`}
                          >
                            <span className="text-3xl">{occ.icon}</span>
                            <span className="font-bold text-[#1C1C1E] text-sm uppercase tracking-wider">{occ.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>What is your preferred palette?</h2>
                      <p className="text-sm text-[#64748b] mb-8">Choose the tones that match your personal brand.</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {PALETTES.map(pal => (
                          <button
                            key={pal.id}
                            onClick={() => setPalette(pal.id)}
                            className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${palette === pal.id ? 'border-[#1A5276] bg-[#1A5276]/5 shadow-sm' : 'border-black/10 bg-white hover:border-[#1A5276]/30'}`}
                          >
                            <div className="w-12 h-12 rounded-full border border-black/10" style={{ backgroundColor: pal.hex }} />
                            <span className="font-bold text-[#1C1C1E] text-xs uppercase tracking-wider text-center">{pal.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="text-2xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>How should it fit?</h2>
                      <p className="text-sm text-[#64748b] mb-8">Determine the drape and silhouette of your garment.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FITS.map(f => (
                          <button
                            key={f.id}
                            onClick={() => setFit(f.id)}
                            className={`flex flex-col items-start gap-2 p-6 rounded-2xl border text-left transition-all ${fit === f.id ? 'border-[#1A5276] bg-[#1A5276]/5 shadow-sm' : 'border-black/10 bg-white hover:border-[#1A5276]/30'}`}
                          >
                            <span className="font-bold text-[#1C1C1E] text-sm uppercase tracking-wider">{f.label}</span>
                            <span className="text-xs text-[#64748b]">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4 (Results) */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <h2 className="text-2xl font-bold text-[#1A5276] mb-2 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your Curated Wardrobe</h2>
                      <p className="text-sm text-[#64748b] mb-8 text-center">Based on your preferences, these pieces will serve you perfectly.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {curatedProducts.map((p) => (
                          <div key={p._id} className="flex gap-4 bg-white p-4 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-24 h-32 relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              {p.src ? (
                                <Image src={p.src} alt={p.name} fill className="object-cover" />
                              ) : null}
                            </div>
                            <div className="flex flex-col justify-center">
                              <h4 className="font-bold text-[#1C1C1E] text-sm mb-1">{p.name}</h4>
                              <p className="text-xs text-[#64748b] uppercase tracking-wider mb-4">{p.cat}</p>
                              <Link 
                                href={`/shop/product/${p.slug}`}
                                onClick={onClose}
                                className="text-[10px] font-bold text-[#1A5276] uppercase tracking-wider flex items-center gap-1 hover:underline"
                              >
                                View Piece <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Footer Navigation */}
            {step < 4 && !isCurating && (
              <div className="flex-shrink-0 p-6 border-t border-black/5 bg-white flex justify-between items-center">
                <button
                  onClick={() => setStep(step > 1 ? step - 1 : 1)}
                  disabled={step === 1}
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${step === 1 ? 'text-transparent cursor-default' : 'text-[#64748b] hover:text-[#1C1C1E]'}`}
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={(step === 1 && !occasion) || (step === 2 && !palette) || (step === 3 && !fit)}
                  className="px-8 py-3 rounded-xl font-sans text-xs font-bold text-white bg-[#1A5276] hover:bg-[#154360] disabled:bg-[#1A5276]/50 disabled:cursor-not-allowed transition-all uppercase tracking-wider flex items-center gap-2"
                >
                  {step === 3 ? 'Curate My Look' : 'Next Step'} <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
