'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Check, ChevronRight } from 'lucide-react';
import { useMeasurementStore, BespokeMeasurements } from '@/store/useMeasurementStore';

interface MeasurementWizardProps {
  isOpen: boolean;
  onClose: (saved?: boolean) => void;
}

export default function MeasurementWizard({ isOpen, onClose }: MeasurementWizardProps) {
  const { measurements, setMeasurements, hasProfile } = useMeasurementStore();
  const [localMeas, setLocalMeas] = useState<BespokeMeasurements>(measurements);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocalMeas(measurements);
  }, [measurements, isOpen]);

  const handleSave = () => {
    setMeasurements(localMeas);
    onClose(true);
  };

  if (!mounted) return null;

  const inputClasses = "w-full bg-[#F8FAFC] border border-black/10 rounded-xl px-4 py-3 text-sm font-sans text-[#1C1C1E] focus:outline-none focus:border-[#1A5276] focus:ring-1 focus:ring-[#1A5276] transition-all";
  const labelClasses = "block text-[10px] tracking-[0.1em] uppercase text-[#64748b] font-bold mb-2 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-[10vh] sm:bottom-[10vh] z-[1201] w-full sm:max-w-[700px] bg-white rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-[#1A5276]/20"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-black/5 bg-[#FDFBF7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A5276]/10 flex items-center justify-center text-[#1A5276]">
                  <Ruler size={18} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-[#1C1C1E] leading-tight">Digital Tailoring Profile</h2>
                  <p className="text-[11px] font-sans text-[#64748b]">Your bespoke measurements securely stored on your device.</p>
                </div>
              </div>
              <button
                onClick={() => onClose(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#64748b] hover:bg-black/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 hide-scrollbar">
              <div className="mb-8 p-5 bg-[#1A5276]/5 border border-[#1A5276]/10 rounded-2xl">
                <h3 className="text-sm font-bold text-[#1A5276] mb-2 font-sans flex items-center gap-2">
                  <Check size={16} /> Measurement Guide
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Enter your measurements in centimeters (cm). If you are unsure about a measurement, leave it blank—our concierge team will assist you during the commission process.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {/* Upper Body */}
                <div className="col-span-1 sm:col-span-2 border-b border-black/5 pb-2 mb-2">
                  <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1C1C1E]">Upper Body</h4>
                </div>
                
                <div>
                  <label className={labelClasses}>Neck (cm)</label>
                  <input type="number" value={localMeas.neck} onChange={(e) => setLocalMeas({...localMeas, neck: e.target.value})} className={inputClasses} placeholder="e.g. 40" />
                </div>
                <div>
                  <label className={labelClasses}>Chest / Bust (cm)</label>
                  <input type="number" value={localMeas.chest} onChange={(e) => setLocalMeas({...localMeas, chest: e.target.value})} className={inputClasses} placeholder="e.g. 104" />
                </div>
                <div>
                  <label className={labelClasses}>Shoulder to Shoulder (cm)</label>
                  <input type="number" value={localMeas.shoulder} onChange={(e) => setLocalMeas({...localMeas, shoulder: e.target.value})} className={inputClasses} placeholder="e.g. 46" />
                </div>
                <div>
                  <label className={labelClasses}>Sleeve Length (cm)</label>
                  <input type="number" value={localMeas.sleeve} onChange={(e) => setLocalMeas({...localMeas, sleeve: e.target.value})} className={inputClasses} placeholder="e.g. 64" />
                </div>
                <div>
                  <label className={labelClasses}>Bicep (cm)</label>
                  <input type="number" value={localMeas.bicep} onChange={(e) => setLocalMeas({...localMeas, bicep: e.target.value})} className={inputClasses} placeholder="e.g. 36" />
                </div>
                <div>
                  <label className={labelClasses}>Wrist / Cuff (cm)</label>
                  <input type="number" value={localMeas.wrist} onChange={(e) => setLocalMeas({...localMeas, wrist: e.target.value})} className={inputClasses} placeholder="e.g. 18" />
                </div>
                <div>
                  <label className={labelClasses}>Jacket / Shirt Length (cm)</label>
                  <input type="number" value={localMeas.jacketLength} onChange={(e) => setLocalMeas({...localMeas, jacketLength: e.target.value})} className={inputClasses} placeholder="e.g. 76" />
                </div>

                {/* Lower Body */}
                <div className="col-span-1 sm:col-span-2 border-b border-black/5 pb-2 mt-4 mb-2">
                  <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1C1C1E]">Lower Body</h4>
                </div>

                <div>
                  <label className={labelClasses}>Waist (cm)</label>
                  <input type="number" value={localMeas.waist} onChange={(e) => setLocalMeas({...localMeas, waist: e.target.value})} className={inputClasses} placeholder="e.g. 86" />
                </div>
                <div>
                  <label className={labelClasses}>Hips (cm)</label>
                  <input type="number" value={localMeas.hips} onChange={(e) => setLocalMeas({...localMeas, hips: e.target.value})} className={inputClasses} placeholder="e.g. 102" />
                </div>
                <div>
                  <label className={labelClasses}>Inseam (cm)</label>
                  <input type="number" value={localMeas.inseam} onChange={(e) => setLocalMeas({...localMeas, inseam: e.target.value})} className={inputClasses} placeholder="e.g. 80" />
                </div>
                <div>
                  <label className={labelClasses}>Outseam / Trouser Length (cm)</label>
                  <input type="number" value={localMeas.outseam} onChange={(e) => setLocalMeas({...localMeas, outseam: e.target.value})} className={inputClasses} placeholder="e.g. 104" />
                </div>
                <div>
                  <label className={labelClasses}>Thigh (cm)</label>
                  <input type="number" value={localMeas.thigh} onChange={(e) => setLocalMeas({...localMeas, thigh: e.target.value})} className={inputClasses} placeholder="e.g. 62" />
                </div>
                <div>
                  <label className={labelClasses}>Knee (cm)</label>
                  <input type="number" value={localMeas.knee} onChange={(e) => setLocalMeas({...localMeas, knee: e.target.value})} className={inputClasses} placeholder="e.g. 42" />
                </div>
                <div>
                  <label className={labelClasses}>Calf (cm)</label>
                  <input type="number" value={localMeas.calf} onChange={(e) => setLocalMeas({...localMeas, calf: e.target.value})} className={inputClasses} placeholder="e.g. 38" />
                </div>
                <div>
                  <label className={labelClasses}>Ankle / Hem (cm)</label>
                  <input type="number" value={localMeas.ankle} onChange={(e) => setLocalMeas({...localMeas, ankle: e.target.value})} className={inputClasses} placeholder="e.g. 36" />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 p-6 border-t border-black/5 bg-white flex justify-end gap-4">
              <button
                onClick={() => onClose(false)}
                className="px-6 py-3 rounded-xl font-sans text-xs font-bold text-[#64748b] hover:bg-[#F8FAFC] transition-colors uppercase tracking-wider"
              >
                Skip / Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 rounded-xl font-sans text-xs font-bold text-white bg-[#1A5276] hover:bg-[#154360] shadow-lg shadow-[#1A5276]/20 transition-all uppercase tracking-wider flex items-center gap-2"
              >
                Save Profile <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
