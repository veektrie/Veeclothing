import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BespokeMeasurements {
  neck: string;
  chest: string;
  waist: string;
  hips: string;
  shoulder: string;
  sleeve: string;
  bicep: string;
  wrist: string;
  jacketLength: string;
  inseam: string;
  outseam: string;
  thigh: string;
  knee: string;
  calf: string;
  ankle: string;
}

interface MeasurementStore {
  hasProfile: boolean;
  measurements: BespokeMeasurements;
  setMeasurements: (measurements: Partial<BespokeMeasurements>) => void;
  clearMeasurements: () => void;
}

const defaultMeasurements: BespokeMeasurements = {
  neck: '',
  chest: '',
  waist: '',
  hips: '',
  shoulder: '',
  sleeve: '',
  bicep: '',
  wrist: '',
  jacketLength: '',
  inseam: '',
  outseam: '',
  thigh: '',
  knee: '',
  calf: '',
  ankle: '',
};

export const useMeasurementStore = create<MeasurementStore>()(
  persist(
    (set) => ({
      hasProfile: false,
      measurements: defaultMeasurements,
      setMeasurements: (newMeasurements) =>
        set((state) => {
          const updated = { ...state.measurements, ...newMeasurements };
          // Consider profile valid if at least some core fields are filled
          const hasProfile = Object.values(updated).some((val) => val.trim() !== '');
          return { measurements: updated, hasProfile };
        }),
      clearMeasurements: () =>
        set({ measurements: defaultMeasurements, hasProfile: false }),
    }),
    {
      name: 'vee-measurements-storage',
    }
  )
);
