import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PrayerEntity, PrayerType } from '@/types';
import { prayerTimesApi } from '@/services/api/prayerTimesApi';
import { PrayerRepository } from '@/services/database/prayerDb';
import { RootState } from '../store';

interface PrayersState {
    todayPrayers: PrayerEntity | null;
    monthPrayers: PrayerEntity[];
    loading: boolean;
    error: string | null;
    nextPrayer: {
        type: PrayerType;
        time: string;
        minutesUntil: number;
    } | null;
    lastUpdate: number | null;
}

const initialState: PrayersState = {
    todayPrayers: null,
    monthPrayers: [],
    loading: false,
    error: null,
    nextPrayer: null,
    lastUpdate: null,
};

export const fetchPrayerTimes = createAsyncThunk(
    'prayers/fetchPrayerTimes',
    async (
        params: { date: string; latitude: number; longitude: number; method?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await prayerTimesApi.getPrayerTimes(
                params.date,
                params.latitude,
                params.longitude,
                params.method
            );

            const timings = response.data.timings;
            const meta = response.data.meta;
            const dateInfo = response.data.date;

            const entity: PrayerEntity = {
                date: dateInfo.gregorian.date,
                city: meta.timezone,
                latitude: params.latitude,
                longitude: params.longitude,
                timezone: meta.timezone,
                method: meta.method.id,
                fajr: timings.Fajr,
                shuruq: timings.Sunrise,
                dhuhr: timings.Dhuhr,
                asr: timings.Asr,
                maghrib: timings.Maghrib,
                isha: timings.Isha,
                imsak: timings.Imsak,
                dhuha: timings.Sunrise,
                hijri_date: dateInfo.hijri.date,
                hijri_month_name: dateInfo.hijri.month.en,
                day_of_week: dateInfo.gregorian.weekday.en,
                expires_at: Date.now() + 24 * 60 * 60 * 1000,
                last_updated: Date.now(),
            };

            await PrayerRepository.insertPrayerTimes(entity);
            return entity;
        } catch (apiError) {
            console.warn('API fetch failed, checking local DB:', apiError);
            const local = await PrayerRepository.getPrayerTimesForDate(params.date);
            if (local) {
                return local;
            }
            return rejectWithValue('Gagal memuat jadwal sholat. Periksa koneksi internet Anda.');
        }
    }
);

const prayersSlice = createSlice({
    name: 'prayers',
    initialState,
    reducers: {
        setNextPrayer(state, action: PayloadAction<PrayersState['nextPrayer']>) {
            state.nextPrayer = action.payload;
        },
        // New actions for offline calculation
        setPrayerTimes(state, action: PayloadAction<Partial<PrayerEntity>>) {
            state.todayPrayers = {
                ...state.todayPrayers,
                ...action.payload,
            } as PrayerEntity;
            state.loading = false;
            state.error = null;
            state.lastUpdate = Date.now();
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },
        clearPrayers(state) {
            state.todayPrayers = null;
            state.monthPrayers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrayerTimes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
                state.loading = false;
                state.todayPrayers = action.payload;
                state.lastUpdate = Date.now();
            })
            .addCase(fetchPrayerTimes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setNextPrayer, setPrayerTimes, setLoading, setError, clearPrayers } = prayersSlice.actions;
export const selectPrayerTimes = (state: RootState) => state.prayers.todayPrayers;
export default prayersSlice.reducer;
