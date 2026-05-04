'use client';
import { motion } from 'framer-motion';

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.section>
    );
}
