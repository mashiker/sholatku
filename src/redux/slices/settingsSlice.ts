import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type NotificationType = 'full_adzan' | 'takbir' | 'beep' | 'silent';

interface SettingsState {
    // Prayer calculation
    calculationMethod: number;
    madhab: 'shafi' | 'hanafi';

    // Notifications
    notificationsEnabled: boolean;
    notificationType: NotificationType;
    preReminderEnabled: boolean;
    preReminderMinutes: number;

    // Per-prayer notification settings
    prayerNotifications: {
        fajr: boolean;
        dhuhr: boolean;
        asr: boolean;
        maghrib: boolean;
        isha: boolean;
    };

    // Theme
    theme: 'system' | 'light' | 'dark';

    // App
    language: 'id' | 'en';
}

const initialState: SettingsState = {
    calculationMethod: 20, // Kemenag
    madhab: 'shafi',
    notificationsEnabled: true,
    notificationType: 'beep',
    preReminderEnabled: true,
    preReminderMinutes: 10,
    prayerNotifications: {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
    },
    theme: 'system',
    language: 'id',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setCalculationMethod(state, action: PayloadAction<number>) {
            state.calculationMethod = action.payload;
        },
        setMadhab(state, action: PayloadAction<'shafi' | 'hanafi'>) {
            state.madhab = action.payload;
        },
        toggleNotifications(state) {
            state.notificationsEnabled = !state.notificationsEnabled;
        },
        setNotificationType(state, action: PayloadAction<NotificationType>) {
            state.notificationType = action.payload;
        },
        togglePreReminder(state) {
            state.preReminderEnabled = !state.preReminderEnabled;
        },
        setPreReminderMinutes(state, action: PayloadAction<number>) {
            state.preReminderMinutes = action.payload;
        },
        togglePrayerNotification(state, action: PayloadAction<keyof SettingsState['prayerNotifications']>) {
            state.prayerNotifications[action.payload] = !state.prayerNotifications[action.payload];
        },
        setTheme(state, action: PayloadAction<'system' | 'light' | 'dark'>) {
            state.theme = action.payload;
        },
        setLanguage(state, action: PayloadAction<'id' | 'en'>) {
            state.language = action.payload;
        },
    },
});

export const {
    setCalculationMethod,
    setMadhab,
    toggleNotifications,
    setNotificationType,
    togglePreReminder,
    setPreReminderMinutes,
    togglePrayerNotification,
    setTheme,
    setLanguage,
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;
export default settingsSlice.reducer;
