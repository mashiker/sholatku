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
            // Set audio mode for background playback
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });

            // Load and play adzan sound
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/adzan_shubuh.mp3'),
                { shouldPlay: true, volume: 1.0 }
            );

            // Unload sound when finished
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });

            console.log('Adzan sound playing in background');
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
        await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
        console.log('Background notification handler registered');
    } catch (e) {
        console.warn('Failed to register background notification handler:', e);
    }
};
