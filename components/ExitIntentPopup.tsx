'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Only trigger once per session
        if (sessionStorage.getItem('vee-exit-intent')) {
            setHasTriggered(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem('vee-exit-intent', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasTriggered]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Something went wrong.");
                return;
            }

            setSubmitted(true);
            toast.success("Welcome to the Atelier. We'll keep you updated.", {
                icon: '✉️',
                style: {
                    borderRadius: '10px',
                    background: '#1C1C1E',
                    color: '#fff',
                },
            });
            
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        } catch (error) {
            toast.error("Failed to connect. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 z-10 text-black/40 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-12 md:p-16 flex flex-col items-center text-center relative z-0">
                            {/* Decorative element */}
                            <div className="w-10 h-[1px] bg-[#D4AF37] mb-8" />

                            <h2 style={{ fontFamily: 'Inter, sans-serif' }} className="text-3xl font-bold text-[#1C1C1E] mb-4 tracking-tight">
                                Before you leave.
                            </h2>
                            <p className="text-[#64748b] text-sm leading-relaxed mb-10 font-light">
                                Let us hold a piece for you. Join our private list to receive early access to bespoke commissions and limited collections.
                            </p>

                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#1A5276] text-sm uppercase tracking-widest font-bold py-3"
                                >
                                    Welcome to the Atelier.
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="w-full relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-b border-black/10 pb-4 text-center text-[13px] tracking-wide focus:outline-none focus:border-[#1A5276] transition-colors bg-transparent text-[#1C1C1E] placeholder:text-black/30"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 bottom-4 flex items-center text-[#1A5276] hover:text-[#1C1C1E] transition-colors"
                                    >
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                            )}
                        </div>
                        
                        {/* Elegant bottom border */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1A5276] to-transparent opacity-20" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
