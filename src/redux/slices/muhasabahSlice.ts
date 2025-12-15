import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { saveMuhasabahEntry, getMuhasabahEntry, calculateStreak, MuhasabahEntry } from '@/services/muhasabah/muhasabahRepository';

interface MuhasabahState {
    todayEntry: MuhasabahEntry | null;
    currentStreak: number;
    loading: boolean;
    error: string | null;
}

const initialState: MuhasabahState = {
    todayEntry: null,
    currentStreak: 0,
    loading: false,
    error: null,
};

// Async Thunks
export const loadTodayEntry = createAsyncThunk(
    'muhasabah/loadToday',
    async (_, { rejectWithValue }) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const entry = await getMuhasabahEntry(today);
            const streak = await calculateStreak();
            return { entry, streak };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const saveEntry = createAsyncThunk(
    'muhasabah/save',
    async (entry: MuhasabahEntry, { rejectWithValue }) => {
        try {
            await saveMuhasabahEntry(entry);
            const streak = await calculateStreak();
            return { entry, streak };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const refreshStreak = createAsyncThunk(
    'muhasabah/refreshStreak',
    async () => {
        const streak = await calculateStreak();
        return streak;
    }
);

const muhasabahSlice = createSlice({
    name: 'muhasabah',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Load Today
            .addCase(loadTodayEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTodayEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.todayEntry = action.payload.entry;
                state.currentStreak = action.payload.streak; // Update streak too
            })
            .addCase(loadTodayEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Save Entry
            .addCase(saveEntry.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.todayEntry = action.payload.entry;
                state.currentStreak = action.payload.streak;
            })
            .addCase(saveEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Refresh Streak
            .addCase(refreshStreak.fulfilled, (state, action) => {
                state.currentStreak = action.payload;
            });
    },
});

export const selectMuhasabah = (state: RootState) => state.muhasabah;
export const selectStreak = (state: RootState) => state.muhasabah.currentStreak;

export default muhasabahSlice.reducer;
