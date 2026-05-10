import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'NGN' | 'USD' | 'GBP' | 'EUR';

interface Rates {
    [key: string]: number;
}

interface CurrencyStore {
    currency: Currency;
    rates: Rates;
    hasAutoDetected: boolean;
    setCurrency: (c: Currency) => void;
    fetchRates: () => Promise<void>;
    autoDetectCurrency: () => Promise<void>;
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
            hasAutoDetected: false,
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
            autoDetectCurrency: async () => {
                const { hasAutoDetected, setCurrency } = get();
                if (hasAutoDetected) return;
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    const data = await res.json();
                    if (data && data.country_code) {
                        const code = data.country_code;
                        if (code === 'NG') setCurrency('NGN');
                        else if (code === 'GB') setCurrency('GBP');
                        else if (['FR','DE','IT','ES','NL','BE','AT','IE','PT','FI','GR','CY','MT','LU','SK','SI','EE','LV','LT'].includes(code)) setCurrency('EUR');
                        else setCurrency('USD');
                    }
                    set({ hasAutoDetected: true });
                } catch (error) {
                    console.error('Failed to auto-detect currency', error);
                    set({ hasAutoDetected: true });
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
