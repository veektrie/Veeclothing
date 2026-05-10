'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const { autoDetectCurrency } = useCurrencyStore();

  useEffect(() => {
    autoDetectCurrency();
  }, [autoDetectCurrency]);

  useEffect(() => {
    const root = document.documentElement;

    let resolved: 'light' | 'dark' = 'light';
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    // Apply CSS custom properties directly so inline styles can reference them
    if (resolved === 'dark') {
      root.style.setProperty('--page-bg', '#111113');
      root.style.setProperty('--card-bg', '#1E1E20');
      root.style.setProperty('--secondary-bg', '#1A1A1C');
      root.style.setProperty('--text-primary', '#F1F1F1');
      root.style.setProperty('--text-secondary', '#9ca3af');
      root.style.setProperty('--text-muted', '#6b7280');
      root.style.setProperty('--border', 'rgba(255,255,255,0.08)');
      root.style.setProperty('--input-bg', '#2A2A2C');
    } else {
      root.style.setProperty('--page-bg', '#F8FAFC');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--secondary-bg', '#F8FAFC');
      root.style.setProperty('--text-primary', '#1C1C1E');
      root.style.setProperty('--text-secondary', '#64748b');
      root.style.setProperty('--text-muted', '#94a3b8');
      root.style.setProperty('--border', 'rgba(0,0,0,0.06)');
      root.style.setProperty('--input-bg', '#FFFFFF');
    }
  }, [theme]);

  // Handle system preference changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [theme]);

  return <>{children}</>;
}
