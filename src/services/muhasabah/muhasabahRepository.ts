import { db } from '@/services/database/dbInit';

export interface MuhasabahEntry {
    date: string; // YYYY-MM-DD
    answers: string; // JSON string of { questionId: number, answer: string, rating: number }[]
    reflection: string;
    created_at: number;
}

// Initialize tables - MOVED TO dbInit.ts
// export const initMuhasabahDB = async (): Promise<void> => { ... }

// Save or Update Entry
export const saveMuhasabahEntry = async (entry: MuhasabahEntry): Promise<void> => {
    try {
        await db.runAsync(
            `INSERT OR REPLACE INTO muhasabah_entries (date, answers, reflection, created_at)
             VALUES (?, ?, ?, ?);`,
            [entry.date, entry.answers, entry.reflection, Date.now()]
        );
    } catch (error) {
        console.error("Error saving Muhasabah entry", error);
        throw error;
    }
};

// Get Entry by Date
export const getMuhasabahEntry = async (date: string): Promise<MuhasabahEntry | null> => {
    try {
        const result = await db.getFirstAsync<MuhasabahEntry>(
            `SELECT * FROM muhasabah_entries WHERE date = ?;`,
            [date]
        );
        return result || null;
    } catch (error) {
        console.error("Error getting Muhasabah entry", error);
        throw error;
    }
};

// Get All History (for Calendar)
export const getMuhasabahHistory = async (): Promise<MuhasabahEntry[]> => {
    try {
        const result = await db.getAllAsync<MuhasabahEntry>(
            `SELECT * FROM muhasabah_entries ORDER BY date DESC;`
        );
        return result;
    } catch (error) {
        console.error("Error getting Muhasabah history", error);
        throw error;
    }
};

// Get Current Streak
export const calculateStreak = async (): Promise<number> => {
    try {
        const allEntries = await db.getAllAsync<{ date: string }>(
            `SELECT date FROM muhasabah_entries ORDER BY date DESC;`
        );

        if (allEntries.length === 0) {
            return 0;
        }

        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if last entry is today or yesterday
        const lastDate = allEntries[0].date;
        if (lastDate !== today && lastDate !== yesterday) {
            return 0;
        }

        // Count consecutive days
        let currentDate = new Date(lastDate);

        for (let i = 0; i < allEntries.length; i++) {
            const entryDateStr = allEntries[i].date;
            const expectedDateStr = currentDate.toISOString().split('T')[0];

            if (entryDateStr === expectedDateStr) {
                streak++;
                // Move to previous day
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                // If the next entry is not the previous day, check if it's the *same* day (duplicates shouldn't happen due to PK)
                // If gap > 1 day, break.
                // Since array is ordered DESC, we expect date to be <= expected.
                // If date < expected (gap), we break.
                // But simplified logic: just match dates.

                // If we found a gap, break.
                break;
            }
        }
        return streak;
    } catch (error) {
        console.error("Error calculating streak", error);
        return 0;
    }
};
