export interface PrayerEntity {
    id?: number;
    date: string; // YYYY-MM-DD
    city: string;
    latitude: number;
    longitude: number;
    timezone: string;
    method: number;
    fajr: string;
    shuruq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    imsak?: string;
    dhuha?: string;
    hijri_date?: string;
    hijri_month_name?: string;
    day_of_week?: string;
    expires_at: number;
    last_updated: number;
}

export type PrayerType = 'fajr' | 'shuruq' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'dhuha' | 'tahajjud';

export interface CheckInEntity {
    id?: number;
    prayer_date: string;
    prayer_type: PrayerType;
    checked_in_at: number;
    checked_in_time: string;
    notes?: string;
    location?: string;
}

export interface StreakEntity {
    id?: number;
    current_streak: number;
    longest_streak: number;
    total_days_tracked: number;
    last_updated: number;
}

export interface LocationEntity {
    id?: number;
    city: string;
    country?: string;
    latitude: number;
    longitude: number;
    timezone: string;
    is_favorite: boolean;
    is_current: boolean;
    created_at?: number;
}

export interface TasbihEntity {
    id?: number;
    date: string;
    tasbih_name: string;
    count: number;
    target_count?: number;
    completed: boolean;
    created_at?: number;
    updated_at?: number;
}

export interface IslamicDateEntity {
    id?: number;
    hijri_date: string;
    gregorian_date: string;
    event_name: string;
    event_type?: string;
    notification_enabled: boolean;
}

export interface MasjidEntity {
    id?: number;
    name: string;
    address?: string;
    city: string;
    latitude: number;
    longitude: number;
    phone?: string;
    website?: string;
    rating?: number;
    amenities?: string; // JSON string
    is_verified?: boolean;
}
