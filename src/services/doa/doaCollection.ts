/**
 * Doa Collection Service
 * Based on Hisnul Muslim (Fortress of the Muslim)
 */

export interface Doa {
    id: number;
    title: string;
    arabic: string;
    transliteration: string;
    translation: string;
    source?: string;
    benefit?: string;
}

export interface DoaCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    doas: Doa[];
}

// Complete Doa Collection
export const DOA_CATEGORIES: DoaCategory[] = [
    {
        id: 'daily',
        name: 'Doa Harian',
        icon: 'sun-clock',
        color: '#FF9800',
        doas: [
            {
                id: 1,
                title: 'Doa Bangun Tidur',
                arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
                transliteration: 'Alhamdulillahilladzi ahyana ba\'da ma amatana wa ilaihin nusyur',
                translation: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.',
                source: 'HR. Bukhari',
            },
            {
                id: 2,
                title: 'Doa Sebelum Tidur',
                arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
                transliteration: 'Bismikallahumma amutu wa ahya',
                translation: 'Dengan nama-Mu ya Allah, aku mati dan aku hidup.',
                source: 'HR. Bukhari',
            },
            {
                id: 3,
                title: 'Doa Masuk Rumah',
                arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
                transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'alallahi rabbina tawakkalna',
                translation: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami, kami bertawakkal.',
                source: 'HR. Abu Dawud',
            },
            {
                id: 4,
                title: 'Doa Keluar Rumah',
                arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
                transliteration: 'Bismillahi tawakkaltu \'alallah, la haula wa la quwwata illa billah',
                translation: 'Dengan nama Allah, aku bertawakkal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan (pertolongan) Allah.',
                source: 'HR. Abu Dawud, At-Tirmidzi',
            },
            {
                id: 5,
                title: 'Doa Sebelum Makan',
                arabic: 'بِسْمِ اللَّهِ',
                transliteration: 'Bismillah',
                translation: 'Dengan nama Allah.',
                source: 'HR. Abu Dawud, At-Tirmidzi',
                benefit: 'Jika lupa, ucapkan: Bismillahi fi awwalihi wa akhirihi',
            },
            {
                id: 6,
                title: 'Doa Sesudah Makan',
                arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ',
                transliteration: 'Alhamdulillahilladzi ath\'amani hadza wa razaqanihi min ghairi haulin minni wa la quwwatin',
                translation: 'Segala puji bagi Allah yang telah memberi makan ini kepadaku dan memberikan rezeki kepadaku tanpa daya dan kekuatan dariku.',
                source: 'HR. Abu Dawud, At-Tirmidzi',
            },
        ],
    },
    {
        id: 'prayer',
        name: 'Doa Sholat',
        icon: 'hands-pray',
        color: '#4CAF50',
        doas: [
            {
                id: 10,
                title: 'Doa Masuk Masjid',
                arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
                transliteration: 'Allahummaftah li abwaba rahmatik',
                translation: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
                source: 'HR. Muslim',
            },
            {
                id: 11,
                title: 'Doa Keluar Masjid',
                arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
                transliteration: 'Allahumma inni as\'aluka min fadlik',
                translation: 'Ya Allah, aku memohon karunia-Mu.',
                source: 'HR. Muslim',
            },
            {
                id: 12,
                title: 'Doa Setelah Sholat',
                arabic: 'أَسْتَغْفِرُ اللَّهَ (ثلاثاً) اللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالْإِكْرَامِ',
                transliteration: 'Astaghfirullah (3x). Allahumma antas salam, wa minkas salam, tabarakta ya dzal jalali wal ikram',
                translation: 'Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Maha Sejahtera, dan dari-Mu kesejahteraan. Maha Suci Engkau, wahai Tuhan Yang Maha Agung dan Maha Mulia.',
                source: 'HR. Muslim',
            },
            {
                id: 13,
                title: 'Doa Qunut',
                arabic: 'اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ، وَعَافِنَا فِيمَنْ عَافَيْتَ، وَتَوَلَّنَا فِيمَنْ تَوَلَّيْتَ',
                transliteration: 'Allahummahdina fiman hadait, wa \'afina fiman \'afait, wa tawallana fiman tawallait',
                translation: 'Ya Allah, berilah kami petunjuk sebagaimana orang-orang yang Engkau beri petunjuk, dan berilah kami kesehatan sebagaimana orang-orang yang Engkau beri kesehatan, dan peliharalah kami sebagaimana orang-orang yang Engkau pelihara.',
                source: 'HR. Abu Dawud',
            },
        ],
    },
    {
        id: 'protection',
        name: 'Doa Perlindungan',
        icon: 'shield-cross',
        color: '#2196F3',
        doas: [
            {
                id: 20,
                title: 'Ayat Kursi',
                arabic: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ، لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ',
                transliteration: 'Allahu la ilaha illa huwal hayyul qayyum, la ta\'khuzuhu sinatun wa la naum...',
                translation: 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang Terus-menerus Mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur...',
                source: 'QS. Al-Baqarah: 255',
                benefit: 'Dibaca setelah sholat dan sebelum tidur untuk perlindungan',
            },
            {
                id: 21,
                title: 'Doa Minta Perlindungan',
                arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
                transliteration: 'A\'udzu bikalimatillahit tammaati min syarri ma khalaq',
                translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.',
                source: 'HR. Muslim',
                benefit: 'Dibaca 3x di pagi dan petang',
            },
            {
                id: 22,
                title: 'Doa Pagi Hari',
                arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
                transliteration: 'Ashbahna wa ashbahal mulku lillah, wal hamdulillah, la ilaha illallahu wahdahu la syarikalah',
                translation: 'Kami memasuki waktu pagi dan kerajaan milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.',
                source: 'HR. Abu Dawud',
            },
            {
                id: 23,
                title: 'Doa Petang Hari',
                arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
                transliteration: 'Amsaina wa amsal mulku lillah, wal hamdulillah, la ilaha illallahu wahdahu la syarikalah',
                translation: 'Kami memasuki waktu petang dan kerajaan milik Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya.',
                source: 'HR. Abu Dawud',
            },
        ],
    },
    {
        id: 'travel',
        name: 'Doa Perjalanan',
        icon: 'airplane',
        color: '#9C27B0',
        doas: [
            {
                id: 30,
                title: 'Doa Naik Kendaraan',
                arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
                transliteration: 'Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
                translation: 'Maha Suci (Allah) yang telah menundukkan ini untuk kami padahal kami tidak mampu menguasainya. Dan sungguh, hanya kepada Tuhan kamilah kami akan kembali.',
                source: 'QS. Az-Zukhruf: 13-14',
            },
            {
                id: 31,
                title: 'Doa Bepergian',
                arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
                transliteration: 'Allahumma inna nas\'aluka fi safarina hadza al-birra wat-taqwa, wa minal \'amali ma tardha',
                translation: 'Ya Allah, kami memohon kepada-Mu dalam perjalanan kami ini kebajikan dan takwa, serta amal yang Engkau ridhai.',
                source: 'HR. Muslim',
            },
            {
                id: 32,
                title: 'Doa Pulang dari Perjalanan',
                arabic: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
                transliteration: 'Ayibuna ta\'ibuna \'abiduna lirabbina hamidun',
                translation: 'Kami kembali, bertaubat, beribadah, dan memuji Tuhan kami.',
                source: 'HR. Muslim',
            },
        ],
    },
    {
        id: 'illness',
        name: 'Doa Kesehatan',
        icon: 'heart-pulse',
        color: '#E91E63',
        doas: [
            {
                id: 40,
                title: 'Doa Menjenguk Orang Sakit',
                arabic: 'لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
                transliteration: 'La ba\'sa, thahuurun insya Allah',
                translation: 'Tidak apa-apa, (sakitnya ini) penyuci (dosa) insya Allah.',
                source: 'HR. Bukhari',
            },
            {
                id: 41,
                title: 'Doa Kesembuhan',
                arabic: 'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ شِفَاءً لاَ يُغَادِرُ سَقَمًا',
                transliteration: 'Allahumma rabban nas, adzhibil ba\'s, isyfi antasy syafi, la syifa\'a illa syifa\'uka, syifa\'an la yughadiru saqaman',
                translation: 'Ya Allah, Tuhan manusia, hilangkanlah penyakit, sembuhkanlah (dia), Engkaulah Yang Maha Menyembuhkan, tidak ada kesembuhan kecuali kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit.',
                source: 'HR. Bukhari, Muslim',
            },
        ],
    },
    {
        id: 'forgiveness',
        name: 'Doa Istighfar',
        icon: 'hand-peace',
        color: '#607D8B',
        doas: [
            {
                id: 50,
                title: 'Sayyidul Istighfar',
                arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
                transliteration: 'Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastatha\'tu...',
                translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan yang berhak disembah selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu, dan aku berpegang pada perjanjian dan janji-Mu sekuat kemampuanku...',
                source: 'HR. Bukhari',
                benefit: 'Barangsiapa mengucapkannya di pagi hari dengan keyakinan penuh, lalu mati sebelum sore hari, maka ia termasuk penghuni surga.',
            },
            {
                id: 51,
                title: 'Istighfar Pendek',
                arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
                transliteration: 'Astaghfirullah wa atubu ilaih',
                translation: 'Aku memohon ampun kepada Allah dan bertaubat kepada-Nya.',
                source: 'HR. Bukhari, Muslim',
                benefit: 'Dianjurkan dibaca 100x sehari',
            },
        ],
    },
];

/**
 * Get all doa categories
 */
export const getAllCategories = (): DoaCategory[] => {
    return DOA_CATEGORIES;
};

/**
 * Get doas by category
 */
export const getDoasByCategory = (categoryId: string): Doa[] => {
    const category = DOA_CATEGORIES.find(c => c.id === categoryId);
    return category?.doas || [];
};

/**
 * Search doas by keyword
 */
export const searchDoas = (keyword: string): Doa[] => {
    const lowerKeyword = keyword.toLowerCase();
    const results: Doa[] = [];

    DOA_CATEGORIES.forEach(category => {
        category.doas.forEach(doa => {
            if (
                doa.title.toLowerCase().includes(lowerKeyword) ||
                doa.translation.toLowerCase().includes(lowerKeyword) ||
                doa.transliteration.toLowerCase().includes(lowerKeyword)
            ) {
                results.push(doa);
            }
        });
    });

    return results;
};

/**
 * Get featured/popular doas
 */
export const getFeaturedDoas = (): Doa[] => {
    return [
        getDoasByCategory('daily')[0], // Doa Bangun Tidur
        getDoasByCategory('protection')[0], // Ayat Kursi
        getDoasByCategory('forgiveness')[0], // Sayyidul Istighfar
    ].filter(Boolean);
};
