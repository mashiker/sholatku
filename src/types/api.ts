export interface ApiResponse<T> {
    code: number;
    status: string;
    data: T;
}

export interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
}

export interface PrayerDate {
    readable: string;
    timestamp: string;
    gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
    };
    hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
    };
}

export interface PrayerMeta {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
        id: number;
        name: string;
        params: { Fajr: number; Isha: number };
    };
    latitudeAdjustmentMethod: string;
    midnightMode: string;
    school: string;
    offset: { [key: string]: number };
}

export interface PrayerData {
    timings: PrayerTimings;
    date: PrayerDate;
    meta: PrayerMeta;
}

export interface SinglePrayerResponse extends ApiResponse<PrayerData> { }
export interface MultiPrayerResponse extends ApiResponse<PrayerData[]> { }
