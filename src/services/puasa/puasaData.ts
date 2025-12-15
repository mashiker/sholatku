/**
 * Puasa Data Service
 * Complete data for 8 types of Sunnah fasting with Islamic references
 */

export interface PuasaSunnah {
    id: string;
    name: string;
    arabicName: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    category: 'weekly' | 'monthly' | 'yearly' | 'special';
    description: string;
    keistimewaan: string[];
    dalil: {
        type: 'quran' | 'hadis';
        source: string;
        arabic?: string;
        text: string;
    }[];
    niat: {
        arabic: string;
        transliteration: string;
        translation: string;
    };
    timing: string;
    tips: string[];
    color: string;
    icon: string;
}

export const PUASA_SUNNAH_DATA: PuasaSunnah[] = [
    {
        id: 'senin-kamis',
        name: 'Puasa Senin-Kamis',
        arabicName: 'صوم الاثنين والخميس',
        difficulty: 2,
        category: 'weekly',
        description: 'Puasa sunnah setiap hari Senin dan Kamis. Merupakan puasa yang paling sering dilakukan Rasulullah SAW.',
        keistimewaan: [
            'Amal perbuatan dinaikkan kepada Allah pada hari Senin dan Kamis',
            'Menghapus dosa antara dua Senin atau dua Kamis',
            'Mengikuti sunnah Rasulullah SAW',
            'Dicintai oleh Allah SWT',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Tirmidzi No. 745',
                arabic: 'تُعْرَضُ الأعمال يوم الاثنين والخميس فأحب أن يعرض عملي وأنا صائم',
                text: 'Amal perbuatan dinaikkan kepada Allah pada hari Senin dan Kamis, maka aku menyukai amalku dinaikkan sementara aku sedang berpuasa.',
            },
            {
                type: 'hadis',
                source: 'HR. Muslim No. 1162',
                text: 'Rasulullah SAW paling banyak berpuasa pada hari Senin dan Kamis.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ يَوْمِ الاِثْنَيْنِ / الْخَمِيْسِ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma yaumil itsnaini/khamisi sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa hari Senin/Kamis sunnah karena Allah Ta\'ala',
        },
        timing: 'Setiap hari Senin dan Kamis sepanjang tahun',
        tips: [
            'Mulai dengan satu hari dulu (Senin atau Kamis)',
            'Perlahan tambah menjadi dua hari',
            'Konsistensi lebih penting dari intensitas',
            'Sahur sebelum Subuh meskipun sedikit',
        ],
        color: '#4CAF50',
        icon: 'calendar-week',
    },
    {
        id: 'ayyamul-bidh',
        name: 'Puasa Ayyamul Bidh',
        arabicName: 'صوم أيام البيض',
        difficulty: 2,
        category: 'monthly',
        description: 'Puasa 3 hari setiap bulan pada tanggal 13, 14, 15 bulan Hijriah (hari-hari bulan purnama).',
        keistimewaan: [
            'Setara dengan puasa satu tahun penuh (3 hari × 10 = 30 hari per bulan)',
            'Bulan purnama = cahaya terang = hati bersih',
            'Ibadah ringan dengan pahala besar',
            'Menjaga kesehatan tubuh secara teratur',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Bukhari & Muslim',
                text: 'Puasalah kamu tiga hari dari setiap bulan, sesungguhnya itu sama dengan puasa selamanya.',
            },
            {
                type: 'hadis',
                source: 'HR. Nasa\'i No. 2413',
                text: 'Puasa tiga hari setiap bulan adalah puasa selamanya, dan puasa itu adalah puasa Daud.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ أَيَّامِ الْبِيْضِ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma ayyaamil biidhi sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa Ayyamul Bidh sunnah karena Allah Ta\'ala',
        },
        timing: 'Tanggal 13, 14, 15 setiap bulan Hijriah',
        tips: [
            'Tandai tanggal di kalender Hijriah',
            'Tidak harus berturut-turut jika berhalangan',
            'Bisa diganti hari lain dalam bulan yang sama',
            'Perhatikan kalender Hijriah untuk akurasi',
        ],
        color: '#9C27B0',
        icon: 'moon-full',
    },
    {
        id: 'daud',
        name: 'Puasa Daud',
        arabicName: 'صوم داود',
        difficulty: 5,
        category: 'special',
        description: 'Puasa sehari dan berbuka sehari secara bergantian. Puasa paling utama setelah Ramadhan.',
        keistimewaan: [
            'Puasa paling utama dan dicintai Allah',
            'Keseimbangan ibadah dan kehidupan dunia',
            'Latihan pengendalian diri yang sempurna',
            'Mengikuti sunnah Nabi Daud AS',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Bukhari No. 3418',
                arabic: 'أفضل الصيام صيام داود كان يصوم يوما ويفطر يوما',
                text: 'Sebaik-baik puasa adalah puasa Daud, dia berpuasa sehari dan tidak berpuasa sehari.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ دَاوُدَ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma daawuda sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa Daud sunnah karena Allah Ta\'ala',
        },
        timing: 'Sehari puasa, sehari berbuka - sepanjang tahun',
        tips: [
            'Level kesulitan TINGGI - pastikan tubuh mampu',
            'Konsultasi kesehatan jika ragu',
            'Jangan dipaksakan jika tidak mampu',
            'Cukup Senin-Kamis jika belum kuat',
        ],
        color: '#FF5722',
        icon: 'fire',
    },
    {
        id: 'syawal',
        name: 'Puasa 6 Hari Syawal',
        arabicName: 'صوم ستة أيام من شوال',
        difficulty: 3,
        category: 'yearly',
        description: 'Puasa 6 hari di bulan Syawal setelah Ramadhan. Melengkapi pahala puasa setahun penuh.',
        keistimewaan: [
            'Ramadhan (30 hari) + 6 Syawal = setara puasa 1 tahun',
            'Melanjutkan momentum spiritual Ramadhan',
            'Menambah pahala puasa Ramadhan',
            'Membersihkan kekurangan puasa Ramadhan',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Muslim',
                text: 'Siapa yang berpuasa Ramadhan lalu mengikutinya dengan enam hari dari Syawal, itu sama dengan puasa setahun.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ سِتَّةِ أَيَّامٍ مِنْ شَوَّالٍ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma sittati ayyaamin min syawwaalin sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa 6 hari Syawal sunnah karena Allah Ta\'ala',
        },
        timing: 'Bulan Syawal (2-30 Syawal, setelah Idul Fitri)',
        tips: [
            'Mulai setelah Idul Fitri (2 Syawal)',
            'Tidak harus berturut-turut',
            'Manfaatkan momentum pasca-Ramadhan',
            'Jangan puasa pada hari Raya (1 Syawal)',
        ],
        color: '#2196F3',
        icon: 'gift',
    },
    {
        id: 'arafah',
        name: 'Puasa Arafah',
        arabicName: 'صوم يوم عرفة',
        difficulty: 2,
        category: 'yearly',
        description: 'Puasa pada tanggal 9 Dzulhijjah (hari wukuf di Arafah). Menghapus dosa 2 tahun!',
        keistimewaan: [
            'Menghapus dosa 1 tahun sebelumnya',
            'Menghapus dosa 1 tahun sesudahnya',
            'Pahala terbesar untuk effort paling ringan',
            'Bagian dari 10 hari terbaik dalam setahun',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Muslim',
                arabic: 'صيام يوم عرفة أحتسب على الله أن يكفر السنة التي قبله والسنة التي بعده',
                text: 'Puasa di hari Arafah menghapuskan dosa setahun sebelumnya dan setahun sesudahnya.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ يَوْمِ عَرَفَةَ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma yaumi 'arafata sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa hari Arafah sunnah karena Allah Ta\'ala',
        },
        timing: '9 Dzulhijjah (1 hari sebelum Idul Adha)',
        tips: [
            'Jangan lupa puasa hari ini setiap tahun!',
            'JANGAN puasa jika sedang melaksanakan haji',
            'Pahala terbesar dengan effort minimal',
            'Set pengingat tahunan di aplikasi',
        ],
        color: '#FFC107',
        icon: 'star',
    },
    {
        id: 'asyura',
        name: 'Puasa Asyura',
        arabicName: 'صوم يوم عاشوراء',
        difficulty: 2,
        category: 'yearly',
        description: 'Puasa pada tanggal 10 Muharram. Hari diselamatkannya Nabi Musa AS dari Firaun.',
        keistimewaan: [
            'Menghapus dosa 1 tahun yang lalu',
            'Hari bersejarah - penyelamatan Nabi Musa',
            'Bulan Muharram adalah bulan yang mulia',
            'Sunnah ditambah puasa Tasu\'a (9 Muharram)',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Muslim',
                text: 'Puasa di hari Asyura menghapuskan dosa 1 tahun sebelumnya.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ يَوْمِ عَاشُورَاءَ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma yaumi 'aasyuuraa'a sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa hari Asyura sunnah karena Allah Ta\'ala',
        },
        timing: '10 Muharram (dianjurkan + 9 Muharram)',
        tips: [
            'Kombinasikan dengan puasa Tasu\'a (9 Muharram)',
            'Untuk membedakan dengan tradisi Yahudi',
            'Banyak berdoa dan istighfar',
            'Pahala besar untuk ibadah sederhana',
        ],
        color: '#E91E63',
        icon: 'water',
    },
    {
        id: 'tasua',
        name: 'Puasa Tasu\'a',
        arabicName: 'صوم يوم تاسوعاء',
        difficulty: 1,
        category: 'yearly',
        description: 'Puasa pada tanggal 9 Muharram. Disunnahkan bersamaan dengan puasa Asyura.',
        keistimewaan: [
            'Melengkapi puasa Asyura',
            'Menyelisihi tradisi Yahudi yang hanya puasa 10 Muharram',
            'Sunnah Nabi Muhammad SAW',
            'Menambah pahala puasa Asyura',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Abu Daud',
                text: 'Nabi Muhammad SAW bersabda: Jika aku masih hidup tahun depan, aku akan puasa hari ke-9 (bersama hari ke-10).',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ يَوْمِ تَاسُوعَاءَ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma yaumi taasuu'aa'a sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa hari Tasu\'a sunnah karena Allah Ta\'ala',
        },
        timing: '9 Muharram (sehari sebelum Asyura)',
        tips: [
            'Selalu kombinasikan dengan puasa Asyura',
            'Jangan puasa hanya Tasu\'a saja',
            'Persiapkan dari tanggal 8 Muharram',
        ],
        color: '#673AB7',
        icon: 'calendar-today',
    },
    {
        id: 'dzulhijjah',
        name: 'Puasa 9 Hari Dzulhijjah',
        arabicName: 'صوم تسعة أيام من ذي الحجة',
        difficulty: 4,
        category: 'yearly',
        description: 'Puasa pada 9 hari pertama bulan Dzulhijjah (1-9 Dzulhijjah). Hari-hari terbaik dalam setahun.',
        keistimewaan: [
            'Hari-hari paling dicintai Allah untuk beribadah',
            '1 hari amal = 70x lipat pahala',
            'Persiapan menyambut Idul Adha',
            'Puncak musim ibadah tahunan',
        ],
        dalil: [
            {
                type: 'hadis',
                source: 'HR. Tirmidzi',
                text: 'Tidak ada amal yang lebih dicintai Allah dalam hari-hari ini (10 hari pertama Dzulhijjah) selain daripada pekerti yang baik.',
            },
        ],
        niat: {
            arabic: 'نَوَيْتُ صَوْمَ يَوْمٍ مِنْ ذِي الْحِجَّةِ سُنَّةً لِلّٰهِ تَعَالَى',
            transliteration: "Nawaitu shauma yaumin min dzil hijjati sunnatan lillahi ta'ala",
            translation: 'Aku niat puasa hari dari Dzulhijjah sunnah karena Allah Ta\'ala',
        },
        timing: '1-9 Dzulhijjah (sebelum Idul Adha)',
        tips: [
            'Tidak harus 9 hari penuh - beberapa hari saja tetap dapat pahala',
            'Minimal puasa hari ke-9 (Arafah)',
            'JANGAN puasa hari ke-10 (Idul Adha)',
            'Perbanyak ibadah lain juga (dzikir, sedekah)',
        ],
        color: '#00BCD4',
        icon: 'calendar-star',
    },
];

/**
 * Get all sunnah fasting types
 */
export const getAllPuasaSunnah = (): PuasaSunnah[] => {
    return PUASA_SUNNAH_DATA;
};

/**
 * Get puasa sunnah by ID
 */
export const getPuasaSunnahById = (id: string): PuasaSunnah | undefined => {
    return PUASA_SUNNAH_DATA.find(p => p.id === id);
};

/**
 * Get puasa sunnah by category
 */
export const getPuasaSunnahByCategory = (category: PuasaSunnah['category']): PuasaSunnah[] => {
    return PUASA_SUNNAH_DATA.filter(p => p.category === category);
};

/**
 * Check if today is a sunnah fasting day
 */
export const getTodaySunnahFasting = (hijriDay: number, hijriMonth: number, dayOfWeek: number): PuasaSunnah[] => {
    const applicable: PuasaSunnah[] = [];

    // Senin (1) atau Kamis (4)
    if (dayOfWeek === 1 || dayOfWeek === 4) {
        const seninKamis = PUASA_SUNNAH_DATA.find(p => p.id === 'senin-kamis');
        if (seninKamis) applicable.push(seninKamis);
    }

    // Ayyamul Bidh (13, 14, 15 Hijriah)
    if ([13, 14, 15].includes(hijriDay)) {
        const ayyamulBidh = PUASA_SUNNAH_DATA.find(p => p.id === 'ayyamul-bidh');
        if (ayyamulBidh) applicable.push(ayyamulBidh);
    }

    // Asyura (10 Muharram)
    if (hijriMonth === 1 && hijriDay === 10) {
        const asyura = PUASA_SUNNAH_DATA.find(p => p.id === 'asyura');
        if (asyura) applicable.push(asyura);
    }

    // Tasu'a (9 Muharram)
    if (hijriMonth === 1 && hijriDay === 9) {
        const tasua = PUASA_SUNNAH_DATA.find(p => p.id === 'tasua');
        if (tasua) applicable.push(tasua);
    }

    // Arafah (9 Dzulhijjah)
    if (hijriMonth === 12 && hijriDay === 9) {
        const arafah = PUASA_SUNNAH_DATA.find(p => p.id === 'arafah');
        if (arafah) applicable.push(arafah);
    }

    // 9 hari Dzulhijjah (1-9)
    if (hijriMonth === 12 && hijriDay >= 1 && hijriDay <= 9) {
        const dzulhijjah = PUASA_SUNNAH_DATA.find(p => p.id === 'dzulhijjah');
        if (dzulhijjah) applicable.push(dzulhijjah);
    }

    // Syawal (2-30 Syawal)
    if (hijriMonth === 10 && hijriDay >= 2) {
        const syawal = PUASA_SUNNAH_DATA.find(p => p.id === 'syawal');
        if (syawal) applicable.push(syawal);
    }

    return applicable;
};
