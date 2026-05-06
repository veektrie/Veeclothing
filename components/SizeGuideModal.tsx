'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

// Size guide data per category
const SIZE_GUIDE: Record<string, { columns: string[]; rows: string[][] }> = {
  default: {
    columns: ['Size', 'Chest (cm)', 'Waist (cm)', 'Hip (cm)', 'Shoulder (cm)'],
    rows: [
      ['S',   '86–91',  '71–76',  '86–91',  '42'],
      ['M',   '91–97',  '76–81',  '91–97',  '44'],
      ['L',   '97–102', '81–86',  '97–102', '46'],
      ['XL',  '102–107','86–91',  '102–107','48'],
      ['XXL', '107–112','91–97',  '107–112','50'],
    ],
  },
  bespoke: {
    columns: ['Measurement', 'How to Measure', 'Typical Range'],
    rows: [
      ['Chest',     'Around fullest part, arms relaxed', '86–120 cm'],
      ['Waist',     'Around natural waistline',          '66–110 cm'],
      ['Hip',       'Around fullest part of hips',       '86–120 cm'],
      ['Shoulder',  'Shoulder point to shoulder point',  '40–54 cm'],
      ['Sleeve',    'Shoulder seam to wrist bone',       '58–68 cm'],
      ['Inseam',    'Crotch to floor',                   '72–86 cm'],
    ],
  },
  kaftan: {
    columns: ['Size', 'Chest (cm)', 'Length (cm)', 'Sleeve (cm)'],
    rows: [
      ['S',   '96',  '140', '60'],
      ['M',   '104', '142', '62'],
      ['L',   '112', '144', '64'],
      ['XL',  '120', '146', '66'],
      ['XXL', '128', '148', '68'],
    ],
  },
};

function getGuide(category?: string) {
  if (!category) return SIZE_GUIDE.default;
  const key = category.toLowerCase();
  return SIZE_GUIDE[key] ?? SIZE_GUIDE.default;
}

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const guide = getGuide(category);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="size-guide-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            id="size-guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Size Guide"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 z-[1101] w-full sm:max-w-[600px] rounded-t-[2rem] sm:rounded-[1.5rem] overflow-hidden"
            style={{
              background: 'rgba(248,250,252,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 32px 80px rgba(26,82,118,0.18)',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-black/[0.06]">
              <div>
                <span
                  className="block text-[9px] tracking-[0.25em] uppercase font-bold mb-1"
                  style={{ color: '#D4AF37', fontFamily: 'Inter, sans-serif' }}
                >
                  Fit Guide
                </span>
                <h2
                  className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#1C1C1E]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Sizing` : 'Size Guide'}
                </h2>
              </div>
              <button
                id="size-guide-close"
                onClick={onClose}
                aria-label="Close size guide"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1A5276] hover:bg-[#1A5276]/5 transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto p-6 pt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    {guide.columns.map((col) => (
                      <th
                        key={col}
                        className="pb-3 text-[9px] tracking-[0.2em] uppercase font-bold text-[#94a3b8] border-b border-black/[0.06] pr-4 last:pr-0"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((row, ri) => (
                    <tr key={ri} className="group">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="py-3 pr-4 last:pr-0 text-[12px] font-light text-[#1C1C1E] border-b border-black/[0.04] group-hover:bg-[#F8FAFC] transition-colors"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: ci === 0 ? 600 : 300,
                            color: ci === 0 ? '#1A5276' : '#1C1C1E',
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tip */}
              <p
                className="mt-5 text-[11px] font-light text-[#94a3b8] leading-[1.7] border-t border-black/[0.06] pt-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="font-semibold text-[#D4AF37]">Bespoke option available.</span>
                {' '}If you fall between sizes or require custom measurements, select{' '}
                <strong className="font-semibold text-[#1A5276]">Bespoke</strong> on the product page and commission
                a garment made precisely to your body.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
