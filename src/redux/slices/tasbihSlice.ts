import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasbihEntity } from '@/types';
import { RootState } from '../store';

interface TasbihState {
    counters: TasbihEntity[];
    activeCounterId: number | null;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
}

const defaultCounter: TasbihEntity = {
    id: 1,
    date: new Date().toISOString(),
    tasbih_name: 'Subhanallah',
    count: 0,
    target_count: 33,
    completed: false,
};

const initialState: TasbihState = {
    counters: [defaultCounter],
    activeCounterId: 1,
    soundEnabled: true,
    vibrationEnabled: true,
};

const tasbihSlice = createSlice({
    name: 'tasbih',
    initialState,
    reducers: {
        incrementCount(state, action: PayloadAction<{ id: number }>) {
            const counter = state.counters.find(c => c.id === action.payload.id);
            if (counter) {
                counter.count += 1;
                if (counter.target_count && counter.count >= counter.target_count) {
                    counter.completed = true;
                }
            }
        },
        resetCount(state, action: PayloadAction<{ id: number }>) {
            const counter = state.counters.find(c => c.id === action.payload.id);
            if (counter) {
                counter.count = 0;
                counter.completed = false;
            }
        },
        addCounter(state, action: PayloadAction<{ name: string; target: number }>) {
            const newId = (state.counters.length > 0 ? Math.max(...state.counters.map(c => c.id || 0)) : 0) + 1;
            state.counters.push({
                id: newId,
                date: new Date().toISOString(),
                tasbih_name: action.payload.name,
                count: 0,
                target_count: action.payload.target,
                completed: false,
            });
            state.activeCounterId = newId;
        },
        deleteCounter(state, action: PayloadAction<number>) {
            state.counters = state.counters.filter(c => c.id !== action.payload);
            if (state.activeCounterId === action.payload) {
                state.activeCounterId = state.counters[0]?.id || null;
            }
        },
        setActiveCounter(state, action: PayloadAction<number>) {
            state.activeCounterId = action.payload;
        },
        toggleSound(state) {
            state.soundEnabled = !state.soundEnabled;
        },
        toggleVibration(state) {
            state.vibrationEnabled = !state.vibrationEnabled;
        },
        updateTarget(state, action: PayloadAction<{ id: number; target: number }>) {
            const counter = state.counters.find(c => c.id === action.payload.id);
            if (counter) {
                counter.target_count = action.payload.target;
                counter.completed = counter.count >= action.payload.target;
            }
        },
    },
});

export const {
    incrementCount, resetCount, addCounter, deleteCounter,
    setActiveCounter, toggleSound, toggleVibration, updateTarget
} = tasbihSlice.actions;

export const selectTasbih = (state: RootState) => state.tasbih;

export default tasbihSlice.reducer;
