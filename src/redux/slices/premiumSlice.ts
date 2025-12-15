import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type AppTheme = 'default' | 'midnight' | 'ocean' | 'forest' | 'gold';
export type AdzanVoice = 'default' | 'mecca' | 'medina' | 'mishary' | 'abdul_basit';

interface StreakProtection {
    monthUsed: number; // Month number (1-12)
    yearUsed: number;
    countUsed: number; // Max 3 per month
}

interface PremiumState {
    isPremium: boolean;
    purchaseDate: number | null;
    expiryDate: number | null;
    purchaseType: 'lifetime' | 'subscription' | null;
    // Premium features
    streakProtection: StreakProtection;
    selectedTheme: AppTheme;
    selectedAdzanVoice: AdzanVoice;
}

const initialState: PremiumState = {
    isPremium: false,
    purchaseDate: null,
    expiryDate: null,
    purchaseType: null,
    streakProtection: {
        monthUsed: 0,
        yearUsed: 0,
        countUsed: 0,
    },
    selectedTheme: 'default',
    selectedAdzanVoice: 'default',
};

const premiumSlice = createSlice({
    name: 'premium',
    initialState,
    reducers: {
        setPremiumStatus: (state, action: PayloadAction<boolean>) => {
            state.isPremium = action.payload;
        },
        activateLifetime: (state) => {
            state.isPremium = true;
            state.purchaseType = 'lifetime';
            state.purchaseDate = Date.now();
            state.expiryDate = null;
        },
        activateSubscription: (state, action: PayloadAction<number>) => {
            state.isPremium = true;
            state.purchaseType = 'subscription';
            state.purchaseDate = Date.now();
            state.expiryDate = action.payload;
        },
        resetPremium: (state) => {
            state.isPremium = false;
            state.purchaseDate = null;
            state.expiryDate = null;
            state.purchaseType = null;
        },
        // Streak Protection
        useStreakProtection: (state) => {
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            // Reset count if new month
            if (state.streakProtection.monthUsed !== currentMonth ||
                state.streakProtection.yearUsed !== currentYear) {
                state.streakProtection = {
                    monthUsed: currentMonth,
                    yearUsed: currentYear,
                    countUsed: 1,
                };
            } else if (state.streakProtection.countUsed < 3) {
                state.streakProtection.countUsed += 1;
            }
        },
        // Theme Selection
        setTheme: (state, action: PayloadAction<AppTheme>) => {
            state.selectedTheme = action.payload;
        },
        // Adzan Voice Selection
        setAdzanVoice: (state, action: PayloadAction<AdzanVoice>) => {
            state.selectedAdzanVoice = action.payload;
        },
    },
});

export const {
    setPremiumStatus,
    activateLifetime,
    activateSubscription,
    resetPremium,
    useStreakProtection,
    setTheme,
    setAdzanVoice,
} = premiumSlice.actions;

export const selectIsPremium = (state: RootState) => state.premium.isPremium;
export const selectPremiumState = (state: RootState) => state.premium;
export const selectStreakProtection = (state: RootState) => state.premium.streakProtection;
export const selectTheme = (state: RootState) => state.premium.selectedTheme;
export const selectAdzanVoice = (state: RootState) => state.premium.selectedAdzanVoice;

// Helper to check remaining streak protections this month
export const selectRemainingProtections = (state: RootState) => {
    const { streakProtection } = state.premium;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (streakProtection.monthUsed !== currentMonth ||
        streakProtection.yearUsed !== currentYear) {
        return 3; // New month, full protection
    }
    return Math.max(0, 3 - streakProtection.countUsed);
};

export default premiumSlice.reducer;

