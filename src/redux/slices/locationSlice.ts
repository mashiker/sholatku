import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationEntity } from '@/types';

interface LocationState {
    currentLocation: LocationEntity | null;
    favoriteLocations: LocationEntity[];
    isAutoDetect: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    currentLocation: null,
    favoriteLocations: [],
    isAutoDetect: true,
    loading: false,
    error: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation(state, action: PayloadAction<LocationEntity>) {
            state.currentLocation = action.payload;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        setAutoDetect(state, action: PayloadAction<boolean>) {
            state.isAutoDetect = action.payload;
        },
    },
});

export const { setLocation, setLoading, setError, setAutoDetect } = locationSlice.actions;
export default locationSlice.reducer;
