/**
 * Offline Prayer Time Calculation Service
 * Uses the 'adhan' library for local computation without API dependency
 */

import { Coordinates, PrayerTimes, CalculationMethod, CalculationParameters, Madhab } from 'adhan';
import { format } from 'date-fns';

export type CalculationMethodType =
    | 'MuslimWorldLeague'
    | 'Egyptian'
    | 'Karachi'
    | 'UmmAlQura'
    | 'Dubai'
    | 'MoonsightingCommittee'
    | 'NorthAmerica'
    | 'Kuwait'
    | 'Qatar'
    | 'Singapore'
    | 'Tehran'
    | 'Turkey'
    | 'Kemenag'; // Indonesia Kemenag

export type MadhabType = 'Shafi' | 'Hanafi';

export interface PrayerTimesResult {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    date: string;
    hijriDate?: string;
    calculationMethod: string;
}

export interface PrayerCalculationOptions {
    latitude: number;
    longitude: number;
    date?: Date;
    method?: CalculationMethodType;
    madhab?: MadhabType;
    adjustments?: {
        fajr?: number;
        sunrise?: number;
        dhuhr?: number;
        asr?: number;
        maghrib?: number;
        isha?: number;
    };
}

/**
 * Get calculation parameters based on method name
 */
const getCalculationParams = (method: CalculationMethodType): CalculationParameters => {
    switch (method) {
        case 'MuslimWorldLeague':
            return CalculationMethod.MuslimWorldLeague();
        case 'Egyptian':
            return CalculationMethod.Egyptian();
        case 'Karachi':
            return CalculationMethod.Karachi();
        case 'UmmAlQura':
            return CalculationMethod.UmmAlQura();
        case 'Dubai':
            return CalculationMethod.Dubai();
        case 'MoonsightingCommittee':
            return CalculationMethod.MoonsightingCommittee();
        case 'NorthAmerica':
            return CalculationMethod.NorthAmerica();
        case 'Kuwait':
            return CalculationMethod.Kuwait();
        case 'Qatar':
            return CalculationMethod.Qatar();
        case 'Singapore':
            return CalculationMethod.Singapore();
        case 'Tehran':
            return CalculationMethod.Tehran();
        case 'Turkey':
            return CalculationMethod.Turkey();
        case 'Kemenag':
        default:
            // Kemenag Indonesia uses specific angles
            const params = CalculationMethod.Singapore(); // Close to Indonesia
            params.fajrAngle = 20; // Kemenag uses 20 degrees for Fajr
            params.ishaAngle = 18; // Kemenag uses 18 degrees for Isha
            return params;
    }
};

/**
 * Format time to HH:mm string
 */
const formatTime = (date: Date): string => {
    return format(date, 'HH:mm');
};

/**
 * Calculate prayer times for a given location and date
 */
export const calculatePrayerTimes = (options: PrayerCalculationOptions): PrayerTimesResult => {
    const {
        latitude,
        longitude,
        date = new Date(),
        method = 'Kemenag',
        madhab = 'Shafi',
        adjustments = {},
    } = options;

    // Create coordinates
    const coordinates = new Coordinates(latitude, longitude);

    // Get calculation parameters
    const params = getCalculationParams(method);

    // Set madhab for Asr calculation
    params.madhab = madhab === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;

    // Apply manual adjustments (offsets in minutes)
    if (adjustments.fajr) params.adjustments.fajr = adjustments.fajr;
    if (adjustments.sunrise) params.adjustments.sunrise = adjustments.sunrise;
    if (adjustments.dhuhr) params.adjustments.dhuhr = adjustments.dhuhr;
    if (adjustments.asr) params.adjustments.asr = adjustments.asr;
    if (adjustments.maghrib) params.adjustments.maghrib = adjustments.maghrib;
    if (adjustments.isha) params.adjustments.isha = adjustments.isha;

    // Calculate prayer times
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    return {
        fajr: formatTime(prayerTimes.fajr),
        sunrise: formatTime(prayerTimes.sunrise),
        dhuhr: formatTime(prayerTimes.dhuhr),
        asr: formatTime(prayerTimes.asr),
        maghrib: formatTime(prayerTimes.maghrib),
        isha: formatTime(prayerTimes.isha),
        date: format(date, 'yyyy-MM-dd'),
        calculationMethod: method,
    };
};

/**
 * Get next prayer info
 */
export const getNextPrayer = (
    latitude: number,
    longitude: number,
    method: CalculationMethodType = 'Kemenag',
    madhab: MadhabType = 'Shafi'
): { name: string; time: Date } | null => {
    const coordinates = new Coordinates(latitude, longitude);
    const params = getCalculationParams(method);
    params.madhab = madhab === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;

    const prayerTimes = new PrayerTimes(coordinates, new Date(), params);
    const nextPrayer = prayerTimes.nextPrayer();

    if (!nextPrayer) return null;

    const prayerNames: Record<string, string> = {
        fajr: 'Subuh',
        sunrise: 'Syuruq',
        dhuhr: 'Dzuhur',
        asr: 'Ashar',
        maghrib: 'Maghrib',
        isha: 'Isya',
    };

    return {
        name: prayerNames[nextPrayer] || nextPrayer,
        time: prayerTimes.timeForPrayer(nextPrayer)!,
    };
};

/**
 * Available calculation methods for settings
 */
export const CALCULATION_METHODS: { id: CalculationMethodType; name: string; region: string }[] = [
    { id: 'Kemenag', name: 'Kemenag RI', region: 'Indonesia' },
    { id: 'MuslimWorldLeague', name: 'Muslim World League', region: 'Global' },
    { id: 'Egyptian', name: 'Egyptian General Authority', region: 'Africa' },
    { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', region: 'Pakistan' },
    { id: 'UmmAlQura', name: 'Umm Al-Qura University', region: 'Saudi Arabia' },
    { id: 'Dubai', name: 'Dubai', region: 'UAE' },
    { id: 'Singapore', name: 'MUIS Singapore', region: 'Singapore' },
    { id: 'Turkey', name: 'Diyanet İşleri Başkanlığı', region: 'Turkey' },
    { id: 'Tehran', name: 'Institute of Geophysics, Tehran', region: 'Iran' },
];
