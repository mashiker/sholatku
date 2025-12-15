import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PremiumState {
    isPremium: boolean;
    purchaseDate: number | null;
    expiryDate: number | null; // For subscription
    purchaseType: 'lifetime' | 'subscription' | null;
}

const initialState: PremiumState = {
    isPremium: false,
    purchaseDate: null,
    expiryDate: null,
    purchaseType: null,
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
    },
});

export const { setPremiumStatus, activateLifetime, activateSubscription, resetPremium } = premiumSlice.actions;

export const selectIsPremium = (state: RootState) => state.premium.isPremium;
export const selectPremiumState = (state: RootState) => state.premium;

export default premiumSlice.reducer;
