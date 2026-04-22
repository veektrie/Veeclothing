'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function GSAPInitializer() {
  useEffect(() => {
    // Global image hover effect: 0.5s ease-in-out 'Scale'
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        const img = target.tagName === 'IMG' ? target : target.closest('img');
        if (img) {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        const img = target.tagName === 'IMG' ? target : target.closest('img');
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        }
      }
    };

    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return null;
}
