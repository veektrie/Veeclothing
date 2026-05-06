import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

interface Rates {
    [key: string]: number;
}

interface CurrencyStore {
    currency: Currency;
    rates: Rates;
    setCurrency: (c: Currency) => void;
    fetchRates: () => Promise<void>;
    convert: (amount: number) => { value: number; symbol: string };
}

const symbols: Record<Currency, string> = {
    NGN: '₦',
    USD: '$',
    GBP: '£',
    EUR: '€',
};

export const useCurrencyStore = create<CurrencyStore>()(
    persist(
        (set, get) => ({
            currency: 'NGN',
            rates: { NGN: 1, USD: 0.00067, GBP: 0.00053, EUR: 0.00062 }, // Fallback rates
            setCurrency: (currency) => set({ currency }),
            fetchRates: async () => {
                try {
                    // Fetch real rates base on NGN if possible, or base USD
                    const res = await fetch('https://open.er-api.com/v6/latest/NGN');
                    const data = await res.json();
                    if (data && data.rates) {
                        set({ rates: data.rates });
                    }
                } catch (error) {
                    console.error('Failed to fetch exchange rates', error);
                }
            },
            convert: (amount: number) => {
                const { currency, rates } = get();
                if (currency === 'NGN') return { value: amount, symbol: '₦' };
                const rate = rates[currency] || 1;
                return { value: amount * rate, symbol: symbols[currency] };
            },
        }),
        {
            name: 'vee-currency-storage',
        }
    )
);
