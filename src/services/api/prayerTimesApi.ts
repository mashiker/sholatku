import { apiClient } from './client';
import { SinglePrayerResponse, MultiPrayerResponse } from '@/types/api';

export const prayerTimesApi = {
    async getPrayerTimes(
        date: string, // DD-MM-YYYY
        latitude: number,
        longitude: number,
        method: number = 11 // JAKIM default
    ): Promise<SinglePrayerResponse> {
        const response = await apiClient.get<SinglePrayerResponse>(`/timings/${date}`, {
            params: {
                latitude,
                longitude,
                method,
            },
        });
        return response.data;
    },

    async getPrayerTimesMonth(
        year: number,
        month: number,
        latitude: number,
        longitude: number,
        method: number = 11
    ): Promise<MultiPrayerResponse> {
        const response = await apiClient.get<MultiPrayerResponse>(`/calendar/${year}/${month}`, {
            params: {
                latitude,
                longitude,
                method,
            },
        });
        return response.data;
    },

    async getQiblaDirection(latitude: number, longitude: number): Promise<{ direction: number }> {
        const response = await apiClient.get<{ data: { direction: number } }>(`/qibla/${latitude}/${longitude}`);
        return response.data.data; // Aladhan Qibla response structure
    }
};
