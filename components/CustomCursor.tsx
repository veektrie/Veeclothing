'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
            if (!isVisible) setIsVisible(true);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('button') || 
                target.closest('a') ||
                target.getAttribute('role') === 'button';
            
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 bg-[#1A5276]/30 rounded-full pointer-events-none z-[9999] backdrop-blur-[1px] border border-[#1A5276]/20 hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            animate={{
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? 'rgba(26, 82, 118, 0.15)' : 'rgba(26, 82, 118, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        />
    );
}
