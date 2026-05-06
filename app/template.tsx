'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        // AnimatePresence and key={pathname} removed — Next.js template files
        // automatically mount a fresh instance on every route change,
        // giving us the entrance animation for free.
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
