import { db } from './dbInit';
import { CheckInEntity, StreakEntity, PrayerType } from '@/types';

export const TrackerRepository = {
    async insertCheckIn(checkin: CheckInEntity): Promise<void> {
        try {
            await db.runAsync(
                `INSERT OR REPLACE INTO checkins (prayer_date, prayer_type, checked_in_at, checked_in_time, notes, location)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    checkin.prayer_date,
                    checkin.prayer_type,
                    checkin.checked_in_at,
                    checkin.checked_in_time,
                    checkin.notes ?? null,
                    checkin.location ?? null
                ]
            );
        } catch (error) {
            console.error('Error inserting checkin:', error);
            throw error;
        }
    },

    async getCheckInsForDate(date: string): Promise<CheckInEntity[]> {
        try {
            const result = await db.getAllAsync<CheckInEntity>(
                'SELECT * FROM checkins WHERE prayer_date = ?',
                [date]
            );
            return result;
        } catch (error) {
            console.error('Error getting checkins:', error);
            throw error;
        }
    },

    async getStreakInfo(): Promise<StreakEntity | null> {
        try {
            const result = await db.getFirstAsync<StreakEntity>(
                'SELECT * FROM streaks ORDER BY id DESC LIMIT 1'
            );
            return result || null;
        } catch (error) {
            console.error('Error getting streak info:', error);
            throw error;
        }
    },

    async updateStreak(streak: StreakEntity): Promise<void> {
        try {
            await db.runAsync(
                'INSERT OR REPLACE INTO streaks (id, current_streak, longest_streak, total_days_tracked, last_updated) VALUES ((SELECT id FROM streaks ORDER BY id DESC LIMIT 1), ?, ?, ?, ?)',
                [streak.current_streak, streak.longest_streak, streak.total_days_tracked, streak.last_updated]
            );
        } catch (error) {
            console.error('Error updating streak:', error);
            throw error;
        }
    }
};
