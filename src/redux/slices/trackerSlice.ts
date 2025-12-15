import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CheckInEntity, StreakEntity, PrayerType } from '@/types';
import { TrackerRepository } from '@/services/database/trackerDb';
import { RootState } from '../store';
import { format } from 'date-fns';

interface TrackerState {
    todayCheckins: Record<string, CheckInEntity>; // Keyed by prayer_type
    currentStreak: number;
    longestStreak: number;
    loading: boolean;
    error: string | null;
    lastUpdated: number;
}

const initialState: TrackerState = {
    todayCheckins: {},
    currentStreak: 0,
    longestStreak: 0,
    loading: false,
    error: null,
    lastUpdated: 0,
};

export const loadTrackerData = createAsyncThunk(
    'tracker/loadData',
    async (_, { rejectWithValue }) => {
        try {
            const today = format(new Date(), 'yyyy-MM-dd');
            const checkins = await TrackerRepository.getCheckInsForDate(today);
            const streak = await TrackerRepository.getStreakInfo();

            return { checkins, streak };
        } catch (error) {
            return rejectWithValue('Gagal memuat data tracker.');
        }
    }
);

export const toggleCheckIn = createAsyncThunk(
    'tracker/toggleCheckIn',
    async (params: { type: PrayerType; date: string }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const existing = state.tracker.todayCheckins[params.type];

            if (existing) {
                // Ideally we delete, but repo doesn't have delete yet. 
                // For MVP, we might just not implement uncheck or implement delete in repo.
                // Let's assume insertCheckIn handles upsert/replace. 
                // If we want to toggle OFF, we need a delete method in DB.
                // For now, let's just allow checking IN. Use a boolean 'completed' field in future.
                // Wait, CheckInEntity implies existence = checked in.
                // Implementing delete logic here requires DB update.
                // Let's just implement Check-In for now.
                return existing;
            }

            const entity: CheckInEntity = {
                prayer_date: params.date,
                prayer_type: params.type,
                checked_in_at: Date.now(),
                checked_in_time: format(new Date(), 'HH:mm'),
            };

            await TrackerRepository.insertCheckIn(entity);

            // Check if all 5 are done to update streak (simplified logic)
            // We would need to reload streak or calc locally.
            return entity;
        } catch (error) {
            return rejectWithValue('Gagal check-in.');
        }
    }
);

const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTrackerData.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadTrackerData.fulfilled, (state, action) => {
                state.loading = false;
                const checkinMap: Record<string, CheckInEntity> = {};
                action.payload.checkins.forEach(c => {
                    checkinMap[c.prayer_type] = c;
                });
                state.todayCheckins = checkinMap;
                state.currentStreak = action.payload.streak?.current_streak || 0;
                state.longestStreak = action.payload.streak?.longest_streak || 0;
            })
            .addCase(toggleCheckIn.fulfilled, (state, action) => {
                state.todayCheckins[action.payload.prayer_type] = action.payload;
            });
    },
});

export const selectTracker = (state: RootState) => state.tracker;
export default trackerSlice.reducer;
