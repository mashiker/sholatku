import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Share, Text as RNText, Linking } from 'react-native';
import { Text, useTheme, Surface, Card, Chip, Button, Modal, Portal, Divider, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BannerAdComponent } from '@/components/ads/BannerAdComponent';

// Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <MaterialCommunityIcons name="alert-circle" size={64} color="#F44336" />
                    <RNText style={{ marginTop: 16, textAlign: 'center' }}>Terjadi kesalahan</RNText>
                </View>
            );
        }
        return this.props.children;
    }
}

// Large Hadith Collection (50+ for variety)
const HADITH_COLLECTION = [
    { id: 1, arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', text: 'Sesungguhnya setiap amalan tergantung pada niatnya.', source: 'HR. Bukhari & Muslim' },
    { id: 2, arabic: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ', text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.', source: 'HR. Ahmad' },
    { id: 3, arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا', text: 'Barangsiapa menempuh jalan untuk mencari ilmu, Allah mudahkan baginya jalan menuju surga.', source: 'HR. Muslim' },
    { id: 4, arabic: 'الطُّهُورُ شَطْرُ الْإِيمَانِ', text: 'Kebersihan adalah sebagian dari iman.', source: 'HR. Muslim' },
    { id: 5, arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ', text: 'Senyummu di hadapan saudaramu adalah sedekah.', source: 'HR. Tirmidzi' },
    { id: 6, arabic: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا', text: 'Barangsiapa berpuasa Ramadhan dengan iman dan mengharap pahala, diampuni dosanya yang telah lalu.', source: 'HR. Bukhari & Muslim' },
    { id: 7, arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', text: 'Muslim sejati adalah yang kaum Muslimin selamat dari lisan dan tangannya.', source: 'HR. Bukhari' },
    { id: 8, arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', text: 'Tidak beriman salah seorang kalian hingga ia mencintai saudaranya seperti mencintai dirinya sendiri.', source: 'HR. Bukhari & Muslim' },
    { id: 9, arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ', text: 'Sesungguhnya Allah itu Maha Indah dan mencintai keindahan.', source: 'HR. Muslim' },
    { id: 10, arabic: 'الدِّينُ النَّصِيحَةُ', text: 'Agama itu adalah nasihat.', source: 'HR. Muslim' },
    { id: 11, arabic: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا', text: 'Mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya.', source: 'HR. Ahmad & Tirmidzi' },
    { id: 12, arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', text: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam.', source: 'HR. Bukhari & Muslim' },
    { id: 13, arabic: 'الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا', text: 'Mukmin dengan mukmin lainnya bagaikan satu bangunan yang saling menguatkan.', source: 'HR. Bukhari & Muslim' },
    { id: 14, arabic: 'لَا تَغْضَبْ', text: 'Janganlah engkau marah.', source: 'HR. Bukhari' },
    { id: 15, arabic: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ', text: 'Bertakwalah kepada Allah di mana pun engkau berada.', source: 'HR. Tirmidzi' },
    { id: 16, arabic: 'مَنْ تَوَاضَعَ لِلَّهِ رَفَعَهُ اللَّهُ', text: 'Barangsiapa merendahkan diri karena Allah, niscaya Allah akan mengangkatnya.', source: 'HR. Muslim' },
    { id: 17, arabic: 'صَلُّوا قَبْلَ أَنْ يُصَلَّى عَلَيْكُمْ', text: 'Shalatlah sebelum kalian dishalatkan.', source: 'HR. Ahmad' },
    { id: 18, arabic: 'الدُّعَاءُ هُوَ الْعِبَادَةُ', text: 'Doa adalah ibadah.', source: 'HR. Tirmidzi' },
    { id: 19, arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', text: 'Sebaik-baik kalian adalah yang belajar Al-Quran dan mengajarkannya.', source: 'HR. Bukhari' },
    { id: 20, arabic: 'اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ', text: 'Bacalah Al-Quran, karena ia akan datang pada hari kiamat sebagai pemberi syafaat bagi pembacanya.', source: 'HR. Muslim' },
    { id: 21, arabic: 'الصَّلَاةُ نُورٌ', text: 'Shalat adalah cahaya.', source: 'HR. Muslim' },
    { id: 22, arabic: 'الصَّبْرُ ضِيَاءٌ', text: 'Sabar adalah sinar.', source: 'HR. Muslim' },
    { id: 23, arabic: 'الصَّدَقَةُ بُرْهَانٌ', text: 'Sedekah adalah bukti.', source: 'HR. Muslim' },
    { id: 24, arabic: 'كُلُّ مَعْرُوفٍ صَدَقَةٌ', text: 'Setiap kebaikan adalah sedekah.', source: 'HR. Bukhari & Muslim' },
    { id: 25, arabic: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ', text: 'Sesungguhnya aku diutus untuk menyempurnakan akhlak mulia.', source: 'HR. Ahmad' },
    { id: 26, arabic: 'الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ', text: 'Surga berada di bawah telapak kaki ibu.', source: 'HR. Nasai' },
    { id: 27, arabic: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ', text: 'Ridha Allah terletak pada ridha orang tua.', source: 'HR. Tirmidzi' },
    { id: 28, arabic: 'مَنْ لَا يَرْحَمِ النَّاسَ لَا يَرْحَمْهُ اللَّهُ', text: 'Barangsiapa tidak menyayangi manusia, Allah tidak akan menyayanginya.', source: 'HR. Bukhari & Muslim' },
    { id: 29, arabic: 'الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى', text: 'Tangan di atas lebih baik daripada tangan di bawah.', source: 'HR. Bukhari & Muslim' },
    { id: 30, arabic: 'إِنَّ مِنْ أَفْضَلِ أَيَّامِكُمْ يَوْمَ الْجُمُعَةِ', text: 'Sesungguhnya hari terbaik kalian adalah hari Jumat.', source: 'HR. Abu Dawud' },
];

// Doa Categories with full collections
const DOA_COLLECTIONS: Record<string, { title: string; items: { name: string; arabic: string; meaning: string }[] }> = {
    daily: {
        title: 'Doa Sehari-hari',
        items: [
            { name: 'Doa Bangun Tidur', arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', meaning: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.' },
            { name: 'Doa Masuk Kamar Mandi', arabic: 'اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', meaning: 'Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan.' },
            { name: 'Doa Keluar Kamar Mandi', arabic: 'غُفْرَانَكَ', meaning: 'Aku memohon ampunan-Mu.' },
            { name: 'Doa Sebelum Makan', arabic: 'بِسْمِ اللَّهِ وَبَرَكَةِ اللَّهِ', meaning: 'Dengan nama Allah dan berkah Allah.' },
            { name: 'Doa Sesudah Makan', arabic: 'اَلْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', meaning: 'Segala puji bagi Allah yang memberi kami makan dan minum serta menjadikan kami Muslim.' },
            { name: 'Doa Keluar Rumah', arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', meaning: 'Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan upaya kecuali dengan pertolongan Allah.' },
            { name: 'Doa Masuk Masjid', arabic: 'اَللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', meaning: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.' },
            { name: 'Doa Sebelum Tidur', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', meaning: 'Dengan nama-Mu Ya Allah aku mati dan hidup.' },
        ]
    },
    morning: {
        title: 'Dzikir Pagi',
        items: [
            { name: 'Ayat Kursi', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', meaning: 'Allah, tidak ada Tuhan selain Dia, Yang Maha Hidup, Yang terus menerus mengurus makhluk-Nya...' },
            { name: 'Sayyidul Istighfar', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ...', meaning: 'Ya Allah, Engkau Tuhanku, tiada Tuhan selain Engkau...' },
            { name: 'Tasbih Pagi', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (100x)', meaning: 'Maha Suci Allah dan dengan memuji-Nya. (100 kali)' },
            { name: 'Doa Perlindungan', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ', meaning: 'Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang membahayakan di bumi maupun di langit.' },
            { name: 'Al-Mulk (Tabaraka)', arabic: 'تَعَوُّذٌ بِرَبِّ النَّاسِ...', meaning: 'Membaca Surat Al-Mulk sebagai pelindung dari siksa kubur.' },
        ]
    },
    evening: {
        title: 'Dzikir Petang',
        items: [
            { name: 'Al-Ikhlas (3x)', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ...', meaning: 'Katakanlah: Dialah Allah, Yang Maha Esa...' },
            { name: 'Al-Falaq (3x)', arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...', meaning: 'Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh...' },
            { name: 'An-Nas (3x)', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ...', meaning: 'Katakanlah: Aku berlindung kepada Tuhan manusia...' },
            { name: 'Doa Petang', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ...', meaning: 'Kami memasuki waktu petang dan kerajaan hanya milik Allah...' },
            { name: 'Tahlil Petang', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ (100x)', meaning: 'Tiada Tuhan selain Allah, Yang Maha Esa, tiada sekutu bagi-Nya. (100 kali)' },
        ]
    },
    protection: {
        title: 'Doa Perlindungan',
        items: [
            { name: 'Doa Lindungi dari Kejahatan', arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', meaning: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.' },
            { name: 'Doa Lindungi Keluarga', arabic: 'اللَّهُمَّ احْفَظْ أَهْلِي وَمَالِي', meaning: 'Ya Allah, lindungilah keluarga dan hartaku.' },
            { name: 'Doa Perjalanan', arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا', meaning: 'Maha Suci Dzat yang telah menundukkan ini untuk kami.' },
            { name: 'Doa Ketakutan', arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', meaning: 'Tiada Tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang-orang yang zalim.' },
        ]
    },
};

// Puasa Sunnah Info
const PUASA_INFO = [
    { id: 'senin-kamis', name: 'Senin & Kamis', desc: 'Puasa yang sangat dianjurkan Rasulullah. Di hari ini amalan diangkat ke Allah.', color: '#4CAF50', icon: 'calendar-week' },
    { id: 'ayyamul-bidh', name: 'Ayyamul Bidh (13-14-15)', desc: 'Puasa pada tanggal 13, 14, 15 setiap bulan Hijriah.', color: '#9C27B0', icon: 'moon-full' },
    { id: 'daud', name: 'Puasa Daud', desc: 'Puasa terbaik - sehari puasa sehari berbuka.', color: '#FF5722', icon: 'fire' },
    { id: 'arafah', name: 'Puasa Arafah', desc: '9 Dzulhijjah - menghapus dosa 2 tahun.', color: '#FFC107', icon: 'star' },
    { id: 'muharram', name: 'Puasa Muharram', desc: 'Puasa di bulan Muharram, terutama hari Asyura (10 Muharram).', color: '#E91E63', icon: 'water' },
    { id: 'syawal', name: 'Puasa 6 Hari Syawal', desc: 'Setelah Ramadhan - pahala setahun penuh.', color: '#2196F3', icon: 'gift' },
];

// Islamic Knowledge (Mini Wikipedia)
const ISLAMIC_KNOWLEDGE = [
    { title: 'Rukun Islam', content: '1. Syahadat\n2. Shalat 5 Waktu\n3. Zakat\n4. Puasa Ramadhan\n5. Haji (bagi yang mampu)' },
    { title: 'Rukun Iman', content: '1. Iman kepada Allah\n2. Iman kepada Malaikat\n3. Iman kepada Kitab-kitab\n4. Iman kepada Rasul\n5. Iman kepada Hari Akhir\n6. Iman kepada Qada dan Qadar' },
    { title: 'Shalat 5 Waktu', content: 'Subuh (2 rakaat)\nDzuhur (4 rakaat)\nAshar (4 rakaat)\nMaghrib (3 rakaat)\nIsya (4 rakaat)' },
    { title: 'Asmaul Husna', content: 'Allah memiliki 99 nama yang indah. Siapa yang menghafal dan memahaminya akan masuk surga. (HR. Bukhari & Muslim)' },
];

function InsightScreenContent() {
    const theme = useTheme();
    const [todayHadith, setTodayHadith] = useState(HADITH_COLLECTION[0]);
    const [selectedDoaCategory, setSelectedDoaCategory] = useState<string | null>(null);
    const [selectedPuasa, setSelectedPuasa] = useState<typeof PUASA_INFO[0] | null>(null);
    const [selectedKnowledge, setSelectedKnowledge] = useState<typeof ISLAMIC_KNOWLEDGE[0] | null>(null);

    useEffect(() => {
        // Different hadith each day based on date
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
        const index = dayOfYear % HADITH_COLLECTION.length;
        setTodayHadith(HADITH_COLLECTION[index]);
    }, []);

    const getRamadhanCountdown = () => {
        const now = new Date();
        const ramadhan1446Start = new Date(2025, 1, 28);
        const ramadhan1446End = new Date(2025, 2, 29);

        if (now >= ramadhan1446Start && now <= ramadhan1446End) {
            const dayOfRamadhan = Math.ceil((now.getTime() - ramadhan1446Start.getTime()) / 86400000) + 1;
            return { days: 0, inRamadhan: true, dayOfRamadhan, year: 1446 };
        }

        let targetDate = now > ramadhan1446End ? new Date(2026, 1, 17) : ramadhan1446Start;
        let targetYear = now > ramadhan1446End ? 1447 : 1446;
        return { days: Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / 86400000)), inRamadhan: false, year: targetYear };
    };

    const ramadhan = getRamadhanCountdown();

    const handleShare = async () => {
        try {
            await Share.share({ message: `📿 Hadith Hari Ini\n\n${todayHadith.arabic}\n\n"${todayHadith.text}"\n\n- ${todayHadith.source}\n\n#SholatKu` });
        } catch (e) { }
    };

    const selectedDoaData = selectedDoaCategory ? DOA_COLLECTIONS[selectedDoaCategory] : null;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a1628', '#0d2137']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.title}>Insight</Text>
                        <Text style={styles.subtitle}>{format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })}</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Ramadhan Countdown */}
                <Card style={styles.countdownCard} mode="elevated">
                    <Card.Content>
                        <View style={styles.countdownHeader}>
                            <MaterialCommunityIcons name="moon-waning-crescent" size={32} color="#FFC107" />
                            <Text variant="titleMedium" style={{ marginLeft: 8, fontWeight: 'bold' }}>Ramadhan {ramadhan.year} H</Text>
                        </View>
                        {ramadhan.inRamadhan ? (
                            <View style={styles.inRamadhan}>
                                <Text style={styles.ramadhanDay}>Hari ke-{ramadhan.dayOfRamadhan}</Text>
                                <Text style={styles.ramadhanText}>Ramadhan Mubarak! 🌙</Text>
                            </View>
                        ) : (
                            <View style={styles.countdown}>
                                <Text style={styles.countdownNumber}>{ramadhan.days}</Text>
                                <Text style={styles.countdownLabel}>hari menuju Ramadhan</Text>
                            </View>
                        )}
                    </Card.Content>
                </Card>

                {/* Hadith of the Day */}
                <Text variant="titleMedium" style={styles.sectionTitle}>✨ Hadith Hari Ini</Text>
                <Card style={styles.hadithCard} mode="elevated">
                    <Card.Content>
                        <Text style={styles.hadithArabic}>{todayHadith.arabic}</Text>
                        <Divider style={{ marginVertical: 12 }} />
                        <Text style={styles.hadithText}>"{todayHadith.text}"</Text>
                        <View style={styles.hadithFooter}>
                            <Chip icon="book-open-variant" compact>{todayHadith.source}</Chip>
                            <TouchableOpacity onPress={handleShare}>
                                <MaterialCommunityIcons name="share-variant" size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
                </Card>

                {/* Quick Access Doa */}
                <Text variant="titleMedium" style={styles.sectionTitle}>📖 Kumpulan Doa</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {Object.entries(DOA_COLLECTIONS).map(([key, data]) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.doaCard}
                            onPress={() => setSelectedDoaCategory(key)}
                        >
                            <View style={[styles.doaIcon, { backgroundColor: key === 'morning' ? '#FF980020' : key === 'evening' ? '#673AB720' : key === 'daily' ? '#2196F320' : '#4CAF5020' }]}>
                                <MaterialCommunityIcons
                                    name={key === 'morning' ? 'weather-sunset-up' : key === 'evening' ? 'weather-sunset-down' : key === 'daily' ? 'calendar-today' : 'shield-check'}
                                    size={24}
                                    color={key === 'morning' ? '#FF9800' : key === 'evening' ? '#673AB7' : key === 'daily' ? '#2196F3' : '#4CAF50'}
                                />
                            </View>
                            <Text style={styles.doaName}>{data.title.split(' ')[0]}</Text>
                            <Text style={styles.doaCount}>{data.items.length} doa</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Puasa Sunnah */}
                <Text variant="titleMedium" style={styles.sectionTitle}>🌙 Panduan Puasa Sunnah</Text>
                <View style={styles.puasaGrid}>
                    {PUASA_INFO.map((puasa) => (
                        <TouchableOpacity
                            key={puasa.id}
                            style={[styles.puasaCard, { borderLeftColor: puasa.color }]}
                            onPress={() => setSelectedPuasa(puasa)}
                        >
                            <MaterialCommunityIcons name={puasa.icon as any} size={24} color={puasa.color} />
                            <Text style={styles.puasaName}>{puasa.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Islamic Knowledge */}
                <Text variant="titleMedium" style={styles.sectionTitle}>📚 Pengetahuan Islam</Text>
                {ISLAMIC_KNOWLEDGE.map((item, i) => (
                    <TouchableOpacity key={i} onPress={() => setSelectedKnowledge(item)}>
                        <Surface style={styles.knowledgeCard} elevation={1}>
                            <Text style={styles.knowledgeTitle}>{item.title}</Text>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
                        </Surface>
                    </TouchableOpacity>
                ))}

                {/* More Hadith */}
                <Text variant="titleMedium" style={styles.sectionTitle}>💎 Hadith Lainnya</Text>
                {HADITH_COLLECTION.filter(h => h.id !== todayHadith.id).slice(0, 5).map((hadith) => (
                    <Card key={hadith.id} style={styles.miniHadithCard} mode="outlined">
                        <Card.Content>
                            <Text style={styles.miniHadithText}>"{hadith.text}"</Text>
                            <Text style={styles.miniHadithSource}>- {hadith.source}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>

            {/* Doa Modal */}
            <Portal>
                <Modal visible={!!selectedDoaCategory} onDismiss={() => setSelectedDoaCategory(null)} contentContainerStyle={styles.modal}>
                    <View style={styles.modalHeader}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{selectedDoaData?.title}</Text>
                        <IconButton icon="close" onPress={() => setSelectedDoaCategory(null)} />
                    </View>
                    <ScrollView style={{ maxHeight: 450 }}>
                        {selectedDoaData?.items.map((doa, i) => (
                            <View key={i} style={styles.doaItem}>
                                <Text style={styles.doaItemName}>{doa.name}</Text>
                                <Text style={styles.doaItemArabic}>{doa.arabic}</Text>
                                <Text style={styles.doaItemMeaning}>{doa.meaning}</Text>
                                <Divider style={{ marginTop: 12 }} />
                            </View>
                        ))}
                    </ScrollView>
                </Modal>
            </Portal>

            {/* Puasa Modal */}
            <Portal>
                <Modal visible={!!selectedPuasa} onDismiss={() => setSelectedPuasa(null)} contentContainerStyle={styles.modal}>
                    {selectedPuasa && (
                        <>
                            <View style={styles.modalHeader}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name={selectedPuasa.icon as any} size={28} color={selectedPuasa.color} />
                                    <Text variant="titleLarge" style={{ fontWeight: 'bold', marginLeft: 12 }}>{selectedPuasa.name}</Text>
                                </View>
                                <IconButton icon="close" onPress={() => setSelectedPuasa(null)} />
                            </View>
                            <Text style={styles.puasaDesc}>{selectedPuasa.desc}</Text>
                            <Button mode="contained" onPress={() => setSelectedPuasa(null)} style={{ marginTop: 16 }}>Tutup</Button>
                        </>
                    )}
                </Modal>
            </Portal>

            {/* Knowledge Modal */}
            <Portal>
                <Modal visible={!!selectedKnowledge} onDismiss={() => setSelectedKnowledge(null)} contentContainerStyle={styles.modal}>
                    {selectedKnowledge && (
                        <>
                            <View style={styles.modalHeader}>
                                <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{selectedKnowledge.title}</Text>
                                <IconButton icon="close" onPress={() => setSelectedKnowledge(null)} />
                            </View>
                            <Text style={styles.knowledgeContent}>{selectedKnowledge.content}</Text>
                            <Button mode="contained" onPress={() => setSelectedKnowledge(null)} style={{ marginTop: 16 }}>Tutup</Button>
                        </>
                    )}
                </Modal>
            </Portal>
        </View>
    );
}

export default function InsightScreen() {
    return (
        <ErrorBoundary>
            <InsightScreenContent />
            <BannerAdComponent style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a1628' },
    headerGradient: { paddingBottom: 20 },
    header: { alignItems: 'center', paddingTop: 10 },
    title: { fontWeight: 'bold', color: '#fff' },
    subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
    content: { flex: 1 },
    countdownCard: { marginHorizontal: 16, marginTop: -10, borderRadius: 16, backgroundColor: '#0d2137' },
    countdownHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    countdown: { alignItems: 'center' },
    countdownNumber: { fontSize: 48, fontWeight: 'bold', color: '#c9a227' },
    countdownLabel: { fontSize: 16, color: 'rgba(255,255,255,0.7)' },
    inRamadhan: { alignItems: 'center' },
    ramadhanDay: { fontSize: 32, fontWeight: 'bold', color: '#1b6d51' },
    ramadhanText: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    sectionTitle: { fontWeight: 'bold', paddingHorizontal: 16, marginTop: 24, marginBottom: 12, color: '#c9a227' },
    hadithCard: { marginHorizontal: 16, borderRadius: 16, backgroundColor: 'rgba(201, 162, 39, 0.15)' },
    hadithArabic: { fontSize: 20, textAlign: 'center', color: '#c9a227', lineHeight: 36 },
    hadithText: { fontSize: 15, color: '#fff', lineHeight: 24, fontStyle: 'italic', textAlign: 'center' },
    hadithFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    horizontalScroll: { paddingLeft: 16 },
    doaCard: { width: 90, padding: 12, marginRight: 12, borderRadius: 12, backgroundColor: '#0d2137', alignItems: 'center', elevation: 2 },
    doaIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    doaName: { fontSize: 11, textAlign: 'center', fontWeight: '600', color: '#fff' },
    doaCount: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
    puasaGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
    puasaCard: { width: '46%', flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#0d2137', borderLeftWidth: 4, margin: 4, elevation: 1 },
    puasaName: { marginLeft: 12, fontSize: 12, fontWeight: '600', flex: 1, color: '#fff' },
    knowledgeCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, padding: 16, borderRadius: 12, backgroundColor: '#0d2137' },
    knowledgeTitle: { fontSize: 14, fontWeight: '600', color: '#fff' },
    miniHadithCard: { marginHorizontal: 16, marginBottom: 8, borderRadius: 12, backgroundColor: '#0d2137' },
    miniHadithText: { fontSize: 14, color: '#fff', fontStyle: 'italic' },
    miniHadithSource: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
    modal: { backgroundColor: '#0d2137', margin: 16, padding: 20, borderRadius: 16, maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    doaItem: { paddingVertical: 12 },
    doaItemName: { fontSize: 16, fontWeight: 'bold', color: '#c9a227' },
    doaItemArabic: { fontSize: 20, textAlign: 'right', marginTop: 8, lineHeight: 36, color: '#fff' },
    doaItemMeaning: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8, fontStyle: 'italic' },
    puasaDesc: { fontSize: 15, color: '#fff', lineHeight: 24 },
    knowledgeContent: { fontSize: 15, color: '#fff', lineHeight: 28 },
});
