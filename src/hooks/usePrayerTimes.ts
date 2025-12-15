import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setPrayerTimes, setLoading, setError } from '@/redux/slices/prayersSlice';
import { selectSettings } from '@/redux/slices/settingsSlice';
import { useLocation } from './useLocation';
import { calculatePrayerTimes, CalculationMethodType, MadhabType } from '@/services/prayer/prayerCalculation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Map settings method numbers to adhan method names
const methodMap: Record<number, CalculationMethodType> = {
    0: 'Kemenag',
    3: 'MuslimWorldLeague',
    4: 'UmmAlQura',
    5: 'Egyptian',
    7: 'Karachi',
    9: 'Singapore',
    13: 'Turkey',
    20: 'Kemenag', // Default Indonesia
};

export const usePrayerTimes = () => {
    const dispatch = useAppDispatch();
    const { todayPrayers, loading, error } = useAppSelector((state) => state.prayers);
    const { calculationMethod, madhab } = useAppSelector(selectSettings);
    const { currentLocation } = useLocation();

    const calculateAndSetPrayers = useCallback(() => {
        if (!currentLocation) {
            dispatch(setError('Lokasi belum tersedia'));
            return;
        }

        dispatch(setLoading(true));

        try {
            const method = methodMap[calculationMethod] || 'Kemenag';
            const madhabType: MadhabType = madhab === 'hanafi' ? 'Hanafi' : 'Shafi';

            const result = calculatePrayerTimes({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                date: new Date(),
                method,
                madhab: madhabType,
            });

            // Format dates
            const today = new Date();
            const formattedDate = format(today, 'EEEE, d MMMM yyyy', { locale: id });

            dispatch(setPrayerTimes({
                fajr: result.fajr,
                shuruq: result.sunrise,
                dhuhr: result.dhuhr,
                asr: result.asr,
                maghrib: result.maghrib,
                isha: result.isha,
                date: formattedDate,
                hijri_date: '', // Will be added with Hijri calendar feature
                method: methodMap[calculationMethod] ? calculationMethod : 20,
            }));
        } catch (err) {
            console.error('Prayer calculation error:', err);
            dispatch(setError('Gagal menghitung waktu sholat'));
        }
    }, [currentLocation, calculationMethod, madhab, dispatch]);

    useEffect(() => {
        calculateAndSetPrayers();
    }, [calculateAndSetPrayers]);

    // Recalculate at midnight for next day
    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const msUntilMidnight = tomorrow.getTime() - now.getTime();

        const timer = setTimeout(() => {
            calculateAndSetPrayers();
        }, msUntilMidnight);

        return () => clearTimeout(timer);
    }, [calculateAndSetPrayers]);

    return {
        prayers: todayPrayers,
        loading,
        error,
        refresh: calculateAndSetPrayers,
    };
};
