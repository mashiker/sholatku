import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    incrementCount, resetCount, selectTasbih,
    toggleSound, toggleVibration, setActiveCounter,
    addCounter, updateTarget
} from '@/redux/slices/tasbihSlice';
import * as Haptics from 'expo-haptics';
import { Vibration, Platform } from 'react-native';

// Default counter for fallback
const DEFAULT_COUNTER = {
    id: 1,
    date: new Date().toISOString(),
    tasbih_name: 'Subhanallah',
    count: 0,
    target_count: 33,
    completed: false,
};

export const useTasbih = () => {
    const dispatch = useAppDispatch();

    // Safe state access with fallback
    let tasbihState: any = {
        counters: [DEFAULT_COUNTER],
        activeCounterId: 1,
        soundEnabled: true,
        vibrationEnabled: true,
    };

    try {
        const state = useAppSelector(selectTasbih);
        if (state && state.counters && state.counters.length > 0) {
            tasbihState = state;
        }
    } catch (e) {
        console.warn('Error accessing tasbih state:', e);
    }

    const { counters, activeCounterId, soundEnabled, vibrationEnabled } = tasbihState;
    const activeCounter = counters.find((c: any) => c.id === activeCounterId) || counters[0] || DEFAULT_COUNTER;

    const handleIncrement = async () => {
        if (!activeCounter?.id) return;

        try {
            const newCount = (activeCounter.count || 0) + 1;
            dispatch(incrementCount({ id: activeCounter.id }));

            // Check if this is a milestone (multiple of target)
            const target = activeCounter.target_count || 33;
            const isMilestone = newCount > 0 && newCount % target === 0;

            if (vibrationEnabled) {
                if (isMilestone) {
                    // MILESTONE: Long strong vibration pattern for target completion
                    try {
                        if (Platform.OS === 'android') {
                            // Long vibration pattern: [wait, vibrate, wait, vibrate, wait, vibrate]
                            Vibration.vibrate([0, 300, 100, 300, 100, 500]);
                        } else {
                            // iOS: Use strong haptics multiple times with longer delays
                            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            await new Promise(resolve => setTimeout(resolve, 150));
                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                            await new Promise(resolve => setTimeout(resolve, 150));
                            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            await new Promise(resolve => setTimeout(resolve, 150));
                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        }
                    } catch (e) {
                        console.log('Milestone vibration error:', e);
                    }
                } else {
                    // Normal tap: Light short vibration
                    try {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    } catch (e) { }
                }
            }
        } catch (e) {
            console.warn('Error incrementing:', e);
        }
    };

    const handleReset = async () => {
        if (activeCounter?.id) {
            try {
                dispatch(resetCount({ id: activeCounter.id }));
                if (vibrationEnabled) {
                    try {
                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    } catch (e) { }
                }
            } catch (e) {
                console.warn('Error resetting:', e);
            }
        }
    };

    const handleAddCounter = (name: string, target: number) => {
        try {
            dispatch(addCounter({ name, target }));
        } catch (e) {
            console.warn('Error adding counter:', e);
        }
    };

    const handleUpdateTarget = (target: number) => {
        if (activeCounter?.id) {
            try {
                dispatch(updateTarget({ id: activeCounter.id, target }));
            } catch (e) {
                console.warn('Error updating target:', e);
            }
        }
    };

    return {
        counter: activeCounter,
        allCounters: counters,
        soundEnabled,
        vibrationEnabled,
        increment: handleIncrement,
        reset: handleReset,
        toggleSound: () => { try { dispatch(toggleSound()); } catch (e) { } },
        toggleVibration: () => { try { dispatch(toggleVibration()); } catch (e) { } },
        setCounter: (id: number) => { try { dispatch(setActiveCounter(id)); } catch (e) { } },
        addNewCounter: handleAddCounter,
        updateTarget: handleUpdateTarget,
    };
};
