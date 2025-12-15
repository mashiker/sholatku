import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import locationReducer from './slices/locationSlice';
import prayersReducer from './slices/prayersSlice';
import trackerReducer from './slices/trackerSlice';
import tasbihReducer from './slices/tasbihSlice';
import settingsReducer from './slices/settingsSlice';
import puasaReducer from './slices/puasaSlice';

import muhasabahReducer from './slices/muhasabahSlice';
import premiumReducer from './slices/premiumSlice';

const rootReducer = combineReducers({
    location: locationReducer,
    prayers: prayersReducer,
    tracker: trackerReducer,
    tasbih: tasbihReducer,
    settings: settingsReducer,
    puasa: puasaReducer,
    muhasabah: muhasabahReducer,
    premium: premiumReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings', 'location', 'tracker', 'tasbih', 'puasa', 'muhasabah', 'premium'], // Persist these
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
