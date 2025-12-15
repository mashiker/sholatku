import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadTrackerData, toggleCheckIn, selectTracker } from '@/redux/slices/trackerSlice';
import { format } from 'date-fns';
import { PrayerType } from '@/types';

export const useTracker = () => {
    const dispatch = useAppDispatch();
    const { todayCheckins, currentStreak, longestStreak, loading } = useAppSelector(selectTracker);

    useEffect(() => {
        dispatch(loadTrackerData());
    }, []);

    const handleCheckIn = (type: PrayerType) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        dispatch(toggleCheckIn({ type, date: today }));
    };

    const isChecked = (type: PrayerType) => !!todayCheckins[type];

    const progress = Object.keys(todayCheckins).length / 5; // Assuming 5 mandatory prayers

    return {
        checkins: todayCheckins,
        currentStreak,
        longestStreak,
        loading,
        checkIn: handleCheckIn,
        isChecked,
        progress
    };
};
