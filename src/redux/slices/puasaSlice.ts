import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface PuasaEntry {
    date: string; // YYYY-MM-DD
    type: 'ramadhan' | 'sunnah';
    sunnahId?: string; // ID dari puasa sunnah jika type = sunnah
    completed: boolean;
    suhoorTime?: string;
    iftarTime?: string;
    notes?: string;
}

export interface PuasaState {
    entries: PuasaEntry[];
    currentStreak: number;
    longestStreak: number;
    ramadhanProgress: {
        completed: number;
        total: number;
    };
    sunnahTracking: {
        [sunnahId: string]: {
            totalDays: number;
            lastDate?: string;
        };
    };
}

const initialState: PuasaState = {
    entries: [],
    currentStreak: 0,
    longestStreak: 0,
    ramadhanProgress: {
        completed: 0,
        total: 30,
    },
    sunnahTracking: {},
};

const puasaSlice = createSlice({
    name: 'puasa',
    initialState,
    reducers: {
        checkInPuasa(state, action: PayloadAction<{ date: string; type: 'ramadhan' | 'sunnah'; sunnahId?: string }>) {
            const { date, type, sunnahId } = action.payload;

            // Check if already checked in
            const existingIndex = state.entries.findIndex(e =>
                e.date === date && e.type === type && e.sunnahId === sunnahId
            );

            if (existingIndex === -1) {
                // Add new entry
                state.entries.push({
                    date,
                    type,
                    sunnahId,
                    completed: true,
                });

                // Update sunnah tracking
                if (type === 'sunnah' && sunnahId) {
                    if (!state.sunnahTracking[sunnahId]) {
                        state.sunnahTracking[sunnahId] = { totalDays: 0 };
                    }
                    state.sunnahTracking[sunnahId].totalDays += 1;
                    state.sunnahTracking[sunnahId].lastDate = date;
                }

                // Update Ramadhan progress
                if (type === 'ramadhan') {
                    state.ramadhanProgress.completed = state.entries.filter(e => e.type === 'ramadhan' && e.completed).length;
                }

                // Calculate streak
                const sortedEntries = [...state.entries]
                    .filter(e => e.completed)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                let streak = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                for (let i = 0; i < sortedEntries.length; i++) {
                    const entryDate = new Date(sortedEntries[i].date);
                    entryDate.setHours(0, 0, 0, 0);

                    const expectedDate = new Date(today);
                    expectedDate.setDate(expectedDate.getDate() - streak);

                    if (entryDate.getTime() === expectedDate.getTime()) {
                        streak++;
                    } else if (i === 0 && Math.abs(entryDate.getTime() - today.getTime()) <= 86400000) {
                        // Allow for today or yesterday
                        streak++;
                    } else {
                        break;
                    }
                }

                state.currentStreak = streak;
                if (streak > state.longestStreak) {
                    state.longestStreak = streak;
                }
            }
        },
        removePuasaEntry(state, action: PayloadAction<{ date: string; type: 'ramadhan' | 'sunnah'; sunnahId?: string }>) {
            const { date, type, sunnahId } = action.payload;
            state.entries = state.entries.filter(e =>
                !(e.date === date && e.type === type && e.sunnahId === sunnahId)
            );

            // Update counters
            if (type === 'ramadhan') {
                state.ramadhanProgress.completed = state.entries.filter(e => e.type === 'ramadhan' && e.completed).length;
            }

            if (type === 'sunnah' && sunnahId && state.sunnahTracking[sunnahId]) {
                state.sunnahTracking[sunnahId].totalDays = Math.max(0, state.sunnahTracking[sunnahId].totalDays - 1);
            }
        },
        updatePuasaNotes(state, action: PayloadAction<{ date: string; notes: string }>) {
            const entry = state.entries.find(e => e.date === action.payload.date);
            if (entry) {
                entry.notes = action.payload.notes;
            }
        },
        setRamadhanTotal(state, action: PayloadAction<number>) {
            state.ramadhanProgress.total = action.payload;
        },
        resetPuasaData(state) {
            return initialState;
        },
    },
});

export const {
    checkInPuasa,
    removePuasaEntry,
    updatePuasaNotes,
    setRamadhanTotal,
    resetPuasaData,
} = puasaSlice.actions;

export const selectPuasa = (state: RootState) => state.puasa;

export const selectTodayPuasa = (state: RootState) => {
    const today = new Date().toISOString().split('T')[0];
    return state.puasa.entries.filter((e: PuasaEntry) => e.date === today);
};

export const selectPuasaByMonth = (state: RootState, year: number, month: number) => {
    return state.puasa.entries.filter((e: PuasaEntry) => {
        const date = new Date(e.date);
        return date.getFullYear() === year && date.getMonth() === month;
    });
};

export default puasaSlice.reducer;
