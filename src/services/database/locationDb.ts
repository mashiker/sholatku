import { db } from './dbInit';
import { LocationEntity } from '@/types';

export const LocationRepository = {
    async saveLocation(location: LocationEntity): Promise<void> {
        try {
            // If setting as current, unset others
            if (location.is_current) {
                await db.runAsync('UPDATE locations SET is_current = 0');
            }

            await db.runAsync(
                `INSERT OR REPLACE INTO locations (city, country, latitude, longitude, timezone, is_favorite, is_current, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    location.city,
                    location.country ?? '',
                    location.latitude,
                    location.longitude,
                    location.timezone,
                    location.is_favorite ? 1 : 0,
                    location.is_current ? 1 : 0,
                    Date.now()
                ]
            );
        } catch (error) {
            console.error('Error saving location:', error);
            throw error;
        }
    },

    async getCurrentLocation(): Promise<LocationEntity | null> {
        try {
            const result = await db.getFirstAsync<LocationEntity>(
                'SELECT * FROM locations WHERE is_current = 1'
            );
            return result || null;
        } catch (error) {
            console.error('Error getting current location:', error);
            throw error;
        }
    },

    async getFavoriteLocations(): Promise<LocationEntity[]> {
        try {
            const result = await db.getAllAsync<LocationEntity>(
                'SELECT * FROM locations WHERE is_favorite = 1 ORDER BY city ASC'
            );
            return result;
        } catch (error) {
            console.error('Error getting favorite locations:', error);
            throw error;
        }
    }
};
