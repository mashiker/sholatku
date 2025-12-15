/**
 * Hijri Calendar Service
 * Converts between Gregorian and Hijri dates
 * Provides Islamic events and important dates
 */

// Hijri month names
export const HIJRI_MONTHS = [
    { id: 1, name: 'Muharram', arabicName: 'محرم' },
    { id: 2, name: 'Safar', arabicName: 'صفر' },
    { id: 3, name: 'Rabi\' al-Awwal', arabicName: 'ربيع الأول' },
    { id: 4, name: 'Rabi\' al-Thani', arabicName: 'ربيع الثاني' },
    { id: 5, name: 'Jumada al-Awwal', arabicName: 'جمادى الأولى' },
    { id: 6, name: 'Jumada al-Thani', arabicName: 'جمادى الآخرة' },
    { id: 7, name: 'Rajab', arabicName: 'رجب' },
    { id: 8, name: 'Sha\'ban', arabicName: 'شعبان' },
    { id: 9, name: 'Ramadan', arabicName: 'رمضان' },
    { id: 10, name: 'Shawwal', arabicName: 'شوال' },
    { id: 11, name: 'Dhu al-Qi\'dah', arabicName: 'ذو القعدة' },
    { id: 12, name: 'Dhu al-Hijjah', arabicName: 'ذو الحجة' },
];

export interface HijriDate {
    day: number;
    month: number;
    monthName: string;
    monthNameArabic: string;
    year: number;
    formatted: string;
}

export interface IslamicEvent {
    name: string;
    description: string;
    hijriMonth: number;
    hijriDay: number;
    type: 'holiday' | 'fasting' | 'special' | 'sunnah';
    recommendedAmal?: string[];
}

// Important Islamic events
export const ISLAMIC_EVENTS: IslamicEvent[] = [
    {
        name: 'Tahun Baru Islam',
        description: '1 Muharram - Awal tahun Hijriah',
        hijriMonth: 1,
        hijriDay: 1,
        type: 'holiday',
        recommendedAmal: ['Puasa Muharram', 'Memperbanyak istighfar'],
    },
    {
        name: 'Hari Asyura',
        description: '10 Muharram - Hari yang penuh berkah',
        hijriMonth: 1,
        hijriDay: 10,
        type: 'fasting',
        recommendedAmal: ['Puasa Asyura', 'Puasa Tasu\'a (9 Muharram)'],
    },
    {
        name: 'Maulid Nabi',
        description: '12 Rabi\' al-Awwal - Kelahiran Nabi Muhammad SAW',
        hijriMonth: 3,
        hijriDay: 12,
        type: 'special',
        recommendedAmal: ['Bershalawat', 'Mempelajari sirah Nabi'],
    },
    {
        name: 'Isra Mi\'raj',
        description: '27 Rajab - Perjalanan malam Nabi Muhammad SAW',
        hijriMonth: 7,
        hijriDay: 27,
        type: 'special',
        recommendedAmal: ['Sholat malam', 'Membaca kisah Isra Mi\'raj'],
    },
    {
        name: 'Nisfu Sya\'ban',
        description: '15 Sya\'ban - Malam pengampunan',
        hijriMonth: 8,
        hijriDay: 15,
        type: 'special',
        recommendedAmal: ['Puasa sunnah', 'Qiyamul lail', 'Berdoa'],
    },
    {
        name: 'Awal Ramadan',
        description: '1 Ramadan - Bulan puasa dimulai',
        hijriMonth: 9,
        hijriDay: 1,
        type: 'fasting',
        recommendedAmal: ['Puasa wajib', 'Tadarus Quran', 'Tarawih'],
    },
    {
        name: 'Lailatul Qadr',
        description: '27 Ramadan - Malam lebih baik dari 1000 bulan',
        hijriMonth: 9,
        hijriDay: 27,
        type: 'special',
        recommendedAmal: ['I\'tikaf', 'Qiyamul lail', 'Berdoa', 'Baca Quran'],
    },
    {
        name: 'Idul Fitri',
        description: '1 Shawwal - Hari Raya Idul Fitri',
        hijriMonth: 10,
        hijriDay: 1,
        type: 'holiday',
        recommendedAmal: ['Sholat Ied', 'Takbiran', 'Silaturahmi', 'Zakat Fitrah'],
    },
    {
        name: 'Puasa Ayyamul Bidh',
        description: '13-14-15 setiap bulan Hijriah',
        hijriMonth: 0, // All months
        hijriDay: 13,
        type: 'sunnah',
        recommendedAmal: ['Puasa sunnah 3 hari'],
    },
    {
        name: 'Hari Arafah',
        description: '9 Dhu al-Hijjah - Wukuf di Arafah',
        hijriMonth: 12,
        hijriDay: 9,
        type: 'fasting',
        recommendedAmal: ['Puasa Arafah (bagi yang tidak haji)', 'Berdoa'],
    },
    {
        name: 'Idul Adha',
        description: '10 Dhu al-Hijjah - Hari Raya Kurban',
        hijriMonth: 12,
        hijriDay: 10,
        type: 'holiday',
        recommendedAmal: ['Sholat Ied', 'Berkurban', 'Takbiran'],
    },
    {
        name: 'Hari Tasyrik',
        description: '11-12-13 Dhu al-Hijjah',
        hijriMonth: 12,
        hijriDay: 11,
        type: 'special',
        recommendedAmal: ['Takbiran', 'Makan dan minum (haram puasa)'],
    },
];

/**
 * Convert Gregorian date to Hijri date
 * Using simplified Kuwaiti algorithm
 */
export const gregorianToHijri = (date: Date): HijriDate => {
    const jd = gregorianToJulian(date);
    const hijri = julianToHijri(jd);

    const monthInfo = HIJRI_MONTHS[hijri.month - 1];

    return {
        day: hijri.day,
        month: hijri.month,
        monthName: monthInfo.name,
        monthNameArabic: monthInfo.arabicName,
        year: hijri.year,
        formatted: `${hijri.day} ${monthInfo.name} ${hijri.year} H`,
    };
};

/**
 * Convert Gregorian to Julian Day Number
 */
const gregorianToJulian = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y +
        Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    return jd;
};

/**
 * Convert Julian Day Number to Hijri
 */
const julianToHijri = (jd: number): { day: number; month: number; year: number } => {
    const jd_epoch = 1948439.5; // Hijri epoch in Julian days

    let l = Math.floor(jd - jd_epoch + 0.5) + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
        Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
        Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    let month = Math.floor((24 * l) / 709);
    let day = l - Math.floor((709 * month) / 24);
    let year = 30 * n + j - 30;

    return { day, month, year };
};

/**
 * Get today's Hijri date
 */
export const getTodayHijri = (): HijriDate => {
    return gregorianToHijri(new Date());
};

/**
 * Get upcoming Islamic events (next 30 days)
 */
export const getUpcomingEvents = (daysAhead: number = 30): Array<IslamicEvent & { daysUntil: number; gregorianDate: Date }> => {
    const today = new Date();
    const todayHijri = gregorianToHijri(today);

    const upcoming: Array<IslamicEvent & { daysUntil: number; gregorianDate: Date }> = [];

    ISLAMIC_EVENTS.forEach(event => {
        // For Ayyamul Bidh (monthly event)
        if (event.hijriMonth === 0) {
            const daysUntil13 = event.hijriDay - todayHijri.day;
            if (daysUntil13 >= 0 && daysUntil13 <= 15) {
                upcoming.push({
                    ...event,
                    daysUntil: daysUntil13,
                    gregorianDate: new Date(today.getTime() + daysUntil13 * 24 * 60 * 60 * 1000),
                });
            }
        } else {
            // Calculate approximate days until event
            let daysUntil = 0;
            if (event.hijriMonth > todayHijri.month) {
                daysUntil = (event.hijriMonth - todayHijri.month) * 29 + event.hijriDay - todayHijri.day;
            } else if (event.hijriMonth === todayHijri.month && event.hijriDay >= todayHijri.day) {
                daysUntil = event.hijriDay - todayHijri.day;
            } else {
                // Next year
                daysUntil = (12 - todayHijri.month + event.hijriMonth) * 29 + event.hijriDay - todayHijri.day;
            }

            if (daysUntil >= 0 && daysUntil <= daysAhead) {
                upcoming.push({
                    ...event,
                    daysUntil,
                    gregorianDate: new Date(today.getTime() + daysUntil * 24 * 60 * 60 * 1000),
                });
            }
        }
    });

    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
};
