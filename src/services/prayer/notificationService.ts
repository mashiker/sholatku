/**
 * Adzan Notification Service
 * Handles scheduling and playing adzan notifications
 */

import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { calculatePrayerTimes, CalculationMethodType, MadhabType } from './prayerCalculation';
import { PrayerNotificationMode, PrayerKey } from '@/redux/slices/settingsSlice';

export type NotificationType = 'full_adzan' | 'takbir' | 'beep' | 'silent';

export interface NotificationSettings {
    enabled: boolean;
    type: NotificationType;
    preReminder: boolean;
    preReminderMinutes: number;
    vibrate: boolean;
}

export interface PrayerNotificationConfig {
    fajr: NotificationSettings;
    dhuhr: NotificationSettings;
    asr: NotificationSettings;
    maghrib: NotificationSettings;
    isha: NotificationSettings;
}

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
    enabled: true,
    type: 'beep',
    preReminder: true,
    preReminderMinutes: 10,
    vibrate: true,
};

const DEFAULT_CONFIG: PrayerNotificationConfig = {
    fajr: { ...DEFAULT_NOTIFICATION_SETTINGS, type: 'full_adzan' },
    dhuhr: { ...DEFAULT_NOTIFICATION_SETTINGS },
    asr: { ...DEFAULT_NOTIFICATION_SETTINGS },
    maghrib: { ...DEFAULT_NOTIFICATION_SETTINGS, type: 'full_adzan' },
    isha: { ...DEFAULT_NOTIFICATION_SETTINGS },
};

/**
 * Convert PrayerNotificationMode to NotificationSettings
 */
export const convertModeToSettings = (mode: PrayerNotificationMode): NotificationSettings => {
    switch (mode) {
        case 'alarm':
            return { ...DEFAULT_NOTIFICATION_SETTINGS, type: 'full_adzan', enabled: true };
        case 'notification':
            return { ...DEFAULT_NOTIFICATION_SETTINGS, type: 'beep', enabled: true };
        case 'silent':
            return { ...DEFAULT_NOTIFICATION_SETTINGS, type: 'silent', enabled: true, vibrate: false };
        case 'disabled':
            return { ...DEFAULT_NOTIFICATION_SETTINGS, enabled: false };
        default:
            return DEFAULT_NOTIFICATION_SETTINGS;
    }
};

// Configure notification handler - wrapped in try-catch for Expo Go compatibility
try {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
} catch (e) {
    console.warn('Notifications not available in Expo Go:', e);
}

/**
 * Request notification permissions
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.warn('Notification permissions not granted');
            return false;
        }

        // Android specific channel - Use default sound for reliable playback
        if (Platform.OS === 'android') {
            // Main adzan channel with high priority sound
            await Notifications.setNotificationChannelAsync('adzan_v4', {
                name: 'Adzan Notifications',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 200, 500, 200, 1000],
                lightColor: '#c9a227',
                sound: 'default', // Use device default sound - more reliable
                enableVibrate: true,
                showBadge: true,
                bypassDnd: true, // Bypass Do Not Disturb for prayer alarms
            });

            // Create a channel for pre-reminders with lower priority
            await Notifications.setNotificationChannelAsync('reminder', {
                name: 'Prayer Reminders',
                importance: Notifications.AndroidImportance.HIGH,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#1b6d51',
                sound: 'default',
            });
        }

        // Add notification received listener (when app is in FOREGROUND)
        Notifications.addNotificationReceivedListener(async (notification) => {
            const data = notification.request.content.data;
            if (data?.type === 'adzan') {
                try {
                    // Play adzan sound when notification received in foreground
                    await Audio.setAudioModeAsync({
                        playsInSilentModeIOS: true,
                        staysActiveInBackground: true,
                        shouldDuckAndroid: false,
                    });
                    await playAdzanSound(data?.prayerName as string);
                } catch (e) {
                    console.log('Could not play adzan sound:', e);
                }
            }
        });

        // Add notification response listener (when user TAPS notification)
        Notifications.addNotificationResponseReceivedListener(async (response) => {
            const data = response.notification.request.content.data;
            if (data?.type === 'adzan') {
                try {
                    // Play adzan sound when user taps the notification
                    await Audio.setAudioModeAsync({
                        playsInSilentModeIOS: true,
                        staysActiveInBackground: true,
                        shouldDuckAndroid: false,
                    });
                    await playAdzanSound(data?.prayerName as string);
                } catch (e) {
                    console.log('Could not play adzan sound on tap:', e);
                }
            }
        });

        return true;
    } catch (e) {
        console.warn('Notifications not supported in Expo Go:', e);
        return false;
    }
};

/**
 * Schedule a notification for a specific prayer time
 */
export const schedulePrayerNotification = async (
    prayerName: string,
    prayerTime: Date,
    settings: NotificationSettings
): Promise<string | null> => {
    if (!settings.enabled) return null;

    const now = new Date();
    if (prayerTime <= now) return null;

    const PRAYER_MESSAGES: Record<string, string> = {
        'Subuh': 'Hayya Alash Sholah - Waktu Subuh telah tiba',
        'Dzuhur': 'Hayya Alash Sholah - Waktu Dzuhur telah tiba',
        'Ashar': 'Hayya Alash Sholah - Waktu Ashar telah tiba',
        'Maghrib': 'Hayya Alash Sholah - Waktu Maghrib telah tiba',
        'Isya': 'Hayya Alash Sholah - Waktu Isya telah tiba',
    };

    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: `🕌 ${prayerName}`,
                body: PRAYER_MESSAGES[prayerName] || `Waktu ${prayerName} telah tiba`,
                sound: 'default', // Always use sound for adzan
                vibrate: settings.vibrate ? [0, 250, 250, 250] : undefined,
                priority: 'max',
                data: { prayerName, type: 'adzan' },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: prayerTime,
                channelId: 'adzan_v4',
            },
        });

        return id;
    } catch (error) {
        console.error('Failed to schedule notification:', error);
        return null;
    }
};

/**
 * Schedule pre-reminder notification
 */
export const schedulePreReminder = async (
    prayerName: string,
    prayerTime: Date,
    minutesBefore: number
): Promise<string | null> => {
    const reminderTime = new Date(prayerTime.getTime() - minutesBefore * 60 * 1000);
    const now = new Date();

    if (reminderTime <= now) return null;

    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: `⏰ ${minutesBefore} menit menuju ${prayerName}`,
                body: `Persiapkan diri untuk sholat ${prayerName}`,
                sound: 'default',
                priority: 'high',
                data: { prayerName, type: 'pre_reminder' },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: reminderTime,
                channelId: 'reminder',
            },
        });

        return id;
    } catch (error) {
        console.error('Failed to schedule pre-reminder:', error);
        return null;
    }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
    await Notifications.cancelAllScheduledNotificationsAsync();
};

/**
 * Schedule all prayer notifications for today
 */
export const scheduleAllPrayerNotifications = async (
    latitude: number,
    longitude: number,
    method: CalculationMethodType = 'Kemenag',
    madhab: MadhabType = 'Shafi',
    config: PrayerNotificationConfig = DEFAULT_CONFIG
): Promise<void> => {
    // Cancel existing notifications first
    await cancelAllNotifications();

    // Calculate prayer times
    const prayers = calculatePrayerTimes({
        latitude,
        longitude,
        date: new Date(),
        method,
        madhab,
    });

    // Helper to create Date from time string
    const timeToDate = (timeStr: string): Date => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const prayerMap: { key: keyof PrayerNotificationConfig; name: string; time: string }[] = [
        { key: 'fajr', name: 'Subuh', time: prayers.fajr },
        { key: 'dhuhr', name: 'Dzuhur', time: prayers.dhuhr },
        { key: 'asr', name: 'Ashar', time: prayers.asr },
        { key: 'maghrib', name: 'Maghrib', time: prayers.maghrib },
        { key: 'isha', name: 'Isya', time: prayers.isha },
    ];

    for (const prayer of prayerMap) {
        const settings = config[prayer.key];
        const prayerTime = timeToDate(prayer.time);

        // Schedule main notification
        await schedulePrayerNotification(prayer.name, prayerTime, settings);

        // Schedule pre-reminder if enabled
        if (settings.preReminder && settings.preReminderMinutes > 0) {
            await schedulePreReminder(prayer.name, prayerTime, settings.preReminderMinutes);
        }
    }

    console.log('All prayer notifications scheduled');
};

/**
 * Play adzan sound - uses different sounds for Subuh vs other prayers
 */
export const playAdzanSound = async (prayerName?: string): Promise<void> => {
    try {
        // Ensure audio mode is ready
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
        });

        // Use Subuh adzan for Subuh prayer, otherwise use the other adzan
        const isSubuh = prayerName?.toLowerCase() === 'subuh' || prayerName?.toLowerCase() === 'fajr';
        const adzanSource = isSubuh
            ? require('../../../assets/adzan_subuh.mp3')
            : require('../../../assets/adzan_other.mp3');

        const { sound } = await Audio.Sound.createAsync(
            adzanSource,
            { shouldPlay: true }
        );

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync();
            }
        });
    } catch (error) {
        console.error('Failed to play adzan:', error);
    }
};

/**
 * Trigger haptic feedback for adzan
 */
export const triggerAdzanHaptic = async (): Promise<void> => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 300);
};
