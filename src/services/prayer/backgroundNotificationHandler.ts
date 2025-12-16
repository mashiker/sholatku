/**
 * Background Notification Handler
 * Handles playing adzan sound when notification is received in background
 */

import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

export const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_TASK';

// Define the background task for handling notifications
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Background task error:', error);
        return;
    }

    const notification = data as { notification: Notifications.Notification };
    const notifData = notification?.notification?.request?.content?.data;

    if (notifData?.type === 'adzan') {
        try {
            const prayerName = notifData?.prayerName as string;

            // Set audio mode for background playback
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });

            // Determine which adzan to play based on prayer name
            const isSubuh = prayerName?.toLowerCase() === 'subuh' || prayerName?.toLowerCase() === 'fajr';
            const soundAsset = isSubuh
                ? require('../../../assets/adzan_subuh.mp3')
                : require('../../../assets/adzan_other.mp3');

            // Load and play adzan sound
            const { sound } = await Audio.Sound.createAsync(
                soundAsset,
                { shouldPlay: true, volume: 1.0 }
            );

            // Unload sound when finished
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });

            console.log(`Adzan sound playing in background for ${prayerName}`);
        } catch (e) {
            console.error('Failed to play adzan in background:', e);
        }
    }
});

/**
 * Register background notification handler
 * Should be called once at app startup
 */
export const registerBackgroundNotificationHandler = async () => {
    try {
        // Check if task is already registered
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
        if (!isRegistered) {
            await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
            console.log('Background notification handler registered');
        } else {
            console.log('Background notification handler already registered');
        }
    } catch (e) {
        console.warn('Failed to register background notification handler:', e);
    }
};

