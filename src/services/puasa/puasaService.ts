/**
 * Puasa Service
 * Ramadhan countdown, sunnah detection, and utilities
 */

import { gregorianToHijri, HijriDate } from '../calendar/hijriCalendar';

/**
 * Calculate days until next Ramadhan
 */
export const getDaysUntilRamadhan = (): { days: number; startDate: Date; hijriYear: number } => {
    const today = new Date();
    const hijriToday = gregorianToHijri(today);

    let targetYear = hijriToday.year;

    // If we're past Ramadhan (month 9) or in Ramadhan, target next year
    if (hijriToday.month > 9 || (hijriToday.month === 9 && hijriToday.day > 1)) {
        targetYear += 1;
    }

    // Approximate Ramadhan 1 start date
    // Using rough calculation: Hijri year ≈ Gregorian year - 622 + (offset for lunar drift)
    // More accurate: count months from a known date

    // Known reference: 1 Ramadhan 1446 ≈ 1 March 2025
    // Each Hijri year is ~354.37 days
    const reference1446 = new Date(2025, 2, 1); // March 1, 2025
    const yearsDiff = targetYear - 1446;
    const daysDiff = Math.round(yearsDiff * 354.37);

    const targetDate = new Date(reference1446);
    targetDate.setDate(targetDate.getDate() + daysDiff);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
        days: Math.max(0, diffDays),
        startDate: targetDate,
        hijriYear: targetYear,
    };
};

/**
 * Check if we're currently in Ramadhan
 */
export const isRamadhan = (): boolean => {
    const hijriToday = gregorianToHijri(new Date());
    return hijriToday.month === 9; // Ramadhan is month 9 in Hijri calendar
};

/**
 * Get current Ramadhan day (1-30)
 */
export const getRamadhanDay = (): number | null => {
    if (!isRamadhan()) return null;
    const hijriToday = gregorianToHijri(new Date());
    return hijriToday.day;
};

/**
 * Get Ramadhan progress info
 */
export const getRamadhanInfo = (): {
    isRamadhan: boolean;
    currentDay: number | null;
    totalDays: number;
    daysRemaining: number | null;
} => {
    const inRamadhan = isRamadhan();
    const currentDay = getRamadhanDay();
    const totalDays = 30; // Ramadhan is 29 or 30 days

    return {
        isRamadhan: inRamadhan,
        currentDay,
        totalDays,
        daysRemaining: currentDay ? totalDays - currentDay : null,
    };
};

/**
 * Get upcoming important puasa dates
 */
export const getUpcomingPuasaDates = (): Array<{
    name: string;
    hijriDate: string;
    estimatedDate: Date;
    daysUntil: number;
    type: string;
}> => {
    const today = new Date();
    const hijriToday = gregorianToHijri(today);
    const upcoming: Array<{
        name: string;
        hijriDate: string;
        estimatedDate: Date;
        daysUntil: number;
        type: string;
    }> = [];

    // Calculate approximate dates for important fasting days
    // This is a simplified calculation - real apps would use a precise Hijri calendar library

    // Helper to estimate Gregorian date from Hijri
    const estimateGregorianDate = (hijriMonth: number, hijriDay: number, hijriYear: number): Date => {
        const reference = new Date(2025, 2, 1); // 1 Ramadhan 1446
        const refMonth = 9;
        const refDay = 1;
        const refYear = 1446;

        let monthsDiff = (hijriYear - refYear) * 12 + (hijriMonth - refMonth);
        let daysDiff = hijriDay - refDay;

        // Average Hijri month is ~29.53 days
        const totalDays = Math.round(monthsDiff * 29.53 + daysDiff);

        const result = new Date(reference);
        result.setDate(result.getDate() + totalDays);
        return result;
    };

    // Important dates for current/next year
    const importantDates = [
        { name: 'Puasa Asyura', month: 1, day: 10, type: 'asyura' },
        { name: 'Puasa Tasu\'a', month: 1, day: 9, type: 'tasua' },
        { name: 'Awal Ramadhan', month: 9, day: 1, type: 'ramadhan' },
        { name: 'Puasa 6 Hari Syawal', month: 10, day: 2, type: 'syawal' },
        { name: 'Puasa Arafah', month: 12, day: 9, type: 'arafah' },
    ];

    for (const d of importantDates) {
        let targetYear = hijriToday.year;

        // If the date has passed this year, use next year
        if (hijriToday.month > d.month || (hijriToday.month === d.month && hijriToday.day > d.day)) {
            targetYear += 1;
        }

        const estimatedDate = estimateGregorianDate(d.month, d.day, targetYear);
        const daysUntil = Math.ceil((estimatedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntil > 0 && daysUntil <= 365) {
            upcoming.push({
                name: d.name,
                hijriDate: `${d.day} ${getHijriMonthName(d.month)} ${targetYear} H`,
                estimatedDate,
                daysUntil,
                type: d.type,
            });
        }
    }

    // Sort by days until
    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
};

/**
 * Get Hijri month name
 */
const getHijriMonthName = (month: number): string => {
    const months = [
        'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
        'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
        'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
    ];
    return months[month - 1] || '';
};

/**
 * Format countdown text
 */
export const formatCountdown = (days: number): string => {
    if (days === 0) return 'Hari ini!';
    if (days === 1) return 'Besok!';
    if (days < 7) return `${days} hari lagi`;
    if (days < 30) return `${Math.floor(days / 7)} minggu lagi`;
    return `${Math.floor(days / 30)} bulan lagi`;
};
