import { db } from './dbInit';
import { PrayerEntity } from '@/types';

export const PrayerRepository = {
    async insertPrayerTimes(prayer: PrayerEntity): Promise<void> {
        try {
            await db.runAsync(
                `INSERT OR REPLACE INTO prayer_times (date, city, latitude, longitude, timezone, method, fajr, shuruq, dhuhr, asr, maghrib, isha, imsak, dhuha, hijri_date, hijri_month_name, day_of_week, expires_at, last_updated)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    prayer.date,
                    prayer.city,
                    prayer.latitude,
                    prayer.longitude,
                    prayer.timezone,
                    prayer.method,
                    prayer.fajr,
                    prayer.shuruq,
                    prayer.dhuhr,
                    prayer.asr,
                    prayer.maghrib,
                    prayer.isha,
                    prayer.imsak ?? '',
                    prayer.dhuha ?? '',
                    prayer.hijri_date ?? '',
                    prayer.hijri_month_name ?? '',
                    prayer.day_of_week ?? '',
                    prayer.expires_at,
                    Date.now(),
                ]
            );
        } catch (error) {
            console.error('Error inserting prayer times:', error);
            throw error;
        }
    },

    async getPrayerTimesForDate(date: string): Promise<PrayerEntity | null> {
        try {
            const result = await db.getFirstAsync<PrayerEntity>(
                'SELECT * FROM prayer_times WHERE date = ?',
                [date]
            );
            return result || null;
        } catch (error) {
            console.error('Error getting prayer times for date:', error);
            throw error;
        }
    },

    async getPrayerTimesMonth(year: number, month: number): Promise<PrayerEntity[]> {
        try {
            const monthStr = month.toString().padStart(2, '0');
            const startPattern = `${year}-${monthStr}%`;
            const result = await db.getAllAsync<PrayerEntity>(
                'SELECT * FROM prayer_times WHERE date LIKE ? ORDER BY date ASC',
                [startPattern]
            );
            return result;
        } catch (error) {
            console.error('Error getting prayer times for month:', error);
            throw error;
        }
    },

    async deleteExpiredCache(timestamp: number): Promise<void> {
        try {
            await db.runAsync('DELETE FROM prayer_times WHERE expires_at < ?', [timestamp]);
        } catch (error) {
            console.error('Error deleting expired cache:', error);
        }
    }
};
