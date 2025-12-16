import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, List, Switch, useTheme, Divider, Chip, Surface, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    selectSettings,
    toggleNotifications,
    setCalculationMethod,
    setMadhab,
    setNotificationType,
    togglePreReminder,
    setPreReminderMinutes,
    togglePrayerNotification,
    NotificationType,
} from '@/redux/slices/settingsSlice';
import {
    selectIsPremium,
    selectTheme,
    selectAdzanVoice
} from '@/redux/slices/premiumSlice';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useLocation } from '@/hooks/useLocation';
import { CALCULATION_METHODS } from '@/services/prayer/prayerCalculation';
import { requestNotificationPermissions, scheduleAllPrayerNotifications } from '@/services/prayer/notificationService';
import { ThemeSelectionModal } from '@/components/settings/ThemeSelectionModal';
import { AdzanVoiceModal } from '@/components/settings/AdzanVoiceModal';
import { THEME_CONFIG, ADZAN_VOICES } from '@/theme/themes';
import { exportAndShare } from '@/services/export/exportService';

export default function SettingsScreen() {
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectSettings);
    const isPremium = useAppSelector(selectIsPremium);
    const selectedTheme = useAppSelector(selectTheme);
    const selectedVoice = useAppSelector(selectAdzanVoice);
    const { refresh } = usePrayerTimes();
    const { currentLocation } = useLocation();

    // Modal states
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showVoiceModal, setShowVoiceModal] = useState(false);
    const [exporting, setExporting] = useState(false);

    const {
        calculationMethod,
        madhab,
        notificationsEnabled,
        notificationType,
        preReminderEnabled,
        preReminderMinutes,
        prayerNotifications,
    } = settings;

    // Request permissions and schedule notifications when settings change
    useEffect(() => {
        if (notificationsEnabled && currentLocation) {
            requestNotificationPermissions().then((granted) => {
                if (granted) {
                    const methodMap: Record<number, any> = { 20: 'Kemenag', 3: 'MuslimWorldLeague', 4: 'UmmAlQura' };
                    scheduleAllPrayerNotifications(
                        currentLocation.latitude,
                        currentLocation.longitude,
                        methodMap[calculationMethod] || 'Kemenag',
                        madhab === 'hanafi' ? 'Hanafi' : 'Shafi'
                    );
                }
            });
        }
    }, [notificationsEnabled, calculationMethod, madhab, currentLocation]);

    const handleMethodChange = () => {
        const methods = CALCULATION_METHODS.slice(0, 5); // Show first 5
        Alert.alert(
            'Metode Perhitungan',
            'Pilih metode yang sesuai dengan wilayah Anda',
            [
                ...methods.map(m => ({
                    text: `${m.name} (${m.region})`,
                    onPress: () => {
                        const methodMap: Record<string, number> = {
                            'Kemenag': 20,
                            'MuslimWorldLeague': 3,
                            'UmmAlQura': 4,
                            'Egyptian': 5,
                            'Karachi': 7,
                        };
                        dispatch(setCalculationMethod(methodMap[m.id] || 20));
                        setTimeout(refresh, 500);
                    }
                })),
                { text: 'Batal', style: 'cancel' }
            ]
        );
    };

    const handleMadhabChange = () => {
        Alert.alert('Madhab (Waktu Asar)', 'Pilih madhab untuk perhitungan waktu Asar', [
            {
                text: 'Jumhur (Syafi\'i/Maliki/Hanbali)',
                onPress: () => {
                    dispatch(setMadhab('shafi'));
                    setTimeout(refresh, 500);
                }
            },
            {
                text: 'Hanafi',
                onPress: () => {
                    dispatch(setMadhab('hanafi'));
                    setTimeout(refresh, 500);
                }
            },
            { text: 'Batal', style: 'cancel' }
        ]);
    };

    const handleNotificationTypeChange = () => {
        const types: { key: NotificationType; label: string }[] = [
            { key: 'full_adzan', label: '🔊 Adzan Penuh' },
            { key: 'takbir', label: '🔔 Takbir Saja' },
            { key: 'beep', label: '📳 Beep/Getar' },
            { key: 'silent', label: '🔕 Diam (Notifikasi Saja)' },
        ];

        Alert.alert(
            'Jenis Notifikasi',
            'Pilih jenis notifikasi adzan',
            [
                ...types.map(t => ({
                    text: t.label,
                    onPress: () => dispatch(setNotificationType(t.key))
                })),
                { text: 'Batal', style: 'cancel' }
            ]
        );
    };

    const handlePreReminderMinutes = () => {
        Alert.alert(
            'Pengingat Sebelum Adzan',
            'Berapa menit sebelum waktu sholat?',
            [
                { text: '5 menit', onPress: () => dispatch(setPreReminderMinutes(5)) },
                { text: '10 menit', onPress: () => dispatch(setPreReminderMinutes(10)) },
                { text: '15 menit', onPress: () => dispatch(setPreReminderMinutes(15)) },
                { text: '30 menit', onPress: () => dispatch(setPreReminderMinutes(30)) },
                { text: 'Batal', style: 'cancel' }
            ]
        );
    };

    const getMethodName = () => {
        const map: Record<number, string> = {
            20: 'Kemenag RI',
            3: 'Muslim World League',
            4: 'Umm Al-Qura',
            5: 'Egyptian',
            7: 'Karachi',
        };
        return map[calculationMethod] || 'Kemenag RI';
    };

    const getNotificationTypeName = () => {
        const map: Record<NotificationType, string> = {
            full_adzan: 'Adzan Penuh',
            takbir: 'Takbir Saja',
            beep: 'Beep/Getar',
            silent: 'Diam',
        };
        return map[notificationType];
    };

    const prayerNames = {
        fajr: 'Subuh',
        dhuhr: 'Dzuhur',
        asr: 'Ashar',
        maghrib: 'Maghrib',
        isha: 'Isya',
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a1628', '#0d2137']} style={styles.header}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <MaterialCommunityIcons name="cog" size={28} color="#c9a227" />
                        <Text variant="headlineSmall" style={styles.title}>Pengaturan</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content}>
                {/* Calculation Settings */}
                <Surface style={styles.section} elevation={1}>
                    <Text variant="titleSmall" style={styles.sectionTitle}>
                        ⏰ Perhitungan Waktu Sholat
                    </Text>
                    <List.Item
                        title="Metode Perhitungan"
                        description={getMethodName()}
                        left={() => <List.Icon icon="calculator" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={handleMethodChange}
                    />
                    <Divider />
                    <List.Item
                        title="Madhab (Waktu Asar)"
                        description={madhab === 'shafi' ? "Jumhur (Syafi'i/Maliki/Hanbali)" : 'Hanafi'}
                        left={() => <List.Icon icon="book-open-variant" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={handleMadhabChange}
                    />
                </Surface>

                {/* Notification Settings */}
                <Surface style={styles.section} elevation={1}>
                    <Text variant="titleSmall" style={styles.sectionTitle}>
                        🔔 Notifikasi Adzan
                    </Text>
                    <List.Item
                        title="Aktifkan Notifikasi"
                        left={() => <List.Icon icon="bell" />}
                        right={() => (
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={() => { dispatch(toggleNotifications()); }}
                            />
                        )}
                    />

                    {notificationsEnabled && (
                        <>
                            <Divider />
                            <List.Item
                                title="Jenis Notifikasi"
                                description={getNotificationTypeName()}
                                left={() => <List.Icon icon="volume-high" />}
                                right={() => <List.Icon icon="chevron-right" />}
                                onPress={handleNotificationTypeChange}
                            />
                            <Divider />
                            <List.Item
                                title="Pengingat Sebelum Adzan"
                                description={preReminderEnabled ? `${preReminderMinutes} menit sebelum` : 'Nonaktif'}
                                left={() => <List.Icon icon="clock-alert" />}
                                right={() => (
                                    <Switch
                                        value={preReminderEnabled}
                                        onValueChange={() => { dispatch(togglePreReminder()); }}
                                    />
                                )}
                                onPress={preReminderEnabled ? handlePreReminderMinutes : undefined}
                            />
                            <Divider />
                            <Text variant="labelMedium" style={styles.subSectionTitle}>
                                Notifikasi Per Waktu Sholat
                            </Text>
                            {prayerNotifications && (Object.keys(prayerNames) as Array<keyof typeof prayerNames>).map(key => (
                                <List.Item
                                    key={key}
                                    title={prayerNames[key]}
                                    left={() => <List.Icon icon="mosque" />}
                                    right={() => (
                                        <Switch
                                            value={prayerNotifications?.[key] ?? true}
                                            onValueChange={() => { dispatch(togglePrayerNotification(key)); }}
                                        />
                                    )}
                                />
                            ))}
                        </>
                    )}
                </Surface>

                {/* Premium Features */}
                <Surface style={styles.section} elevation={1}>
                    <Text variant="titleSmall" style={styles.sectionTitle}>
                        👑 Fitur Premium
                    </Text>
                    <List.Item
                        title="Tema Aplikasi"
                        description={isPremium ? THEME_CONFIG[selectedTheme].nameId : 'Islami Gelap (Upgrade untuk lebih)'}
                        left={() => <List.Icon icon="palette" color={isPremium ? '#c9a227' : '#999'} />}
                        right={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {!isPremium && <MaterialCommunityIcons name="lock" size={16} color="#999" style={{ marginRight: 8 }} />}
                                <List.Icon icon="chevron-right" />
                            </View>
                        )}
                        onPress={() => setShowThemeModal(true)}
                    />
                    <Divider />
                    <List.Item
                        title="Suara Adzan"
                        description={isPremium ? ADZAN_VOICES[selectedVoice].nameId : 'Default (Upgrade untuk lebih)'}
                        left={() => <List.Icon icon="volume-high" color={isPremium ? '#c9a227' : '#999'} />}
                        right={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {!isPremium && <MaterialCommunityIcons name="lock" size={16} color="#999" style={{ marginRight: 8 }} />}
                                <List.Icon icon="chevron-right" />
                            </View>
                        )}
                        onPress={() => setShowVoiceModal(true)}
                    />
                    <Divider />
                    <List.Item
                        title="Export Data"
                        description="Export laporan sholat ke CSV"
                        left={() => <List.Icon icon="file-export" color={isPremium ? '#c9a227' : '#999'} />}
                        right={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {!isPremium && <MaterialCommunityIcons name="lock" size={16} color="#999" style={{ marginRight: 8 }} />}
                                <List.Icon icon="chevron-right" />
                            </View>
                        )}
                        onPress={async () => {
                            if (!isPremium) {
                                navigation.navigate('Premium');
                                return;
                            }
                            setExporting(true);
                            try {
                                // Sample data - in real app, fetch from Redux/DB
                                await exportAndShare({
                                    prayerRecords: [
                                        { date: '2024-12-14', fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true },
                                        { date: '2024-12-15', fajr: true, dhuhr: true, asr: false, maghrib: true, isha: true },
                                    ],
                                    streak: 7,
                                    totalDays: 14,
                                    completionRate: 85,
                                    startDate: '1 Desember 2024',
                                    endDate: '14 Desember 2024',
                                }, 'csv');
                                Alert.alert('Sukses', 'Laporan berhasil di-export!');
                            } catch (error) {
                                Alert.alert('Error', 'Gagal export data');
                            }
                            setExporting(false);
                        }}
                    />
                </Surface>

                {/* Upgrade Banner */}
                {!isPremium && (
                    <Surface style={[styles.section, { backgroundColor: 'rgba(201, 162, 39, 0.15)' }]} elevation={1}>
                        <List.Item
                            title="⭐ Upgrade ke Premium"
                            description="Bebas iklan & fitur eksklusif"
                            left={() => <List.Icon icon="crown" color="#FFB300" />}
                            right={() => <List.Icon icon="chevron-right" />}
                            onPress={() => navigation.navigate('Premium')}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                    </Surface>
                )}

                {/* About */}
                <Surface style={styles.section} elevation={1}>
                    <Text variant="titleSmall" style={styles.sectionTitle}>
                        📱 Fitur Lainnya
                    </Text>
                    <List.Item
                        title="Kalender Hijriah"
                        description="Konversi tanggal & peristiwa Islam"
                        left={() => <List.Icon icon="calendar-star" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => navigation.navigate('Calendar')}
                    />
                    <Divider />
                    <List.Item
                        title="Kumpulan Doa"
                        description="Hisnul Muslim - Doa Sehari-hari"
                        left={() => <List.Icon icon="hand-heart" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => navigation.navigate('Doa')}
                    />
                    <Divider />
                    <List.Item
                        title="Muhasabah Tracker"
                        description="Refleksi & evaluasi diri harian"
                        left={() => <List.Icon icon="chart-box" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => navigation.navigate('Tracker')}
                    />
                </Surface>

                {/* About App */}
                <Surface style={styles.section} elevation={1}>
                    <Text variant="titleSmall" style={styles.sectionTitle}>
                        ℹ️ Tentang
                    </Text>
                    <List.Item
                        title="Versi Aplikasi"
                        description="SholatKu v1.0.0"
                        left={() => <List.Icon icon="information" />}
                    />
                    <List.Item
                        title="Perhitungan Offline"
                        description="Menggunakan library Adhan untuk akurasi tinggi"
                        left={() => <List.Icon icon="wifi-off" />}
                    />
                    <Divider />
                    <List.Item
                        title="Syarat & Ketentuan"
                        description="Ketentuan penggunaan aplikasi"
                        left={() => <List.Icon icon="file-document" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => {
                            Alert.alert(
                                'Syarat & Ketentuan',
                                'Dengan menggunakan aplikasi SholatKu, Anda menyetujui:\n\n1. Aplikasi ini dibuat untuk membantu ibadah dan bukan pengganti fatwa ulama.\n\n2. Waktu sholat dihitung berdasarkan perhitungan astronomi dan dapat berbeda dengan jadwal lokal.\n\n3. Arah kiblat menggunakan kompas digital yang akurasinya tergantung pada perangkat Anda.\n\n4. Data disimpan secara lokal di perangkat Anda.\n\n5. Aplikasi ini gratis tanpa iklan.',
                                [{ text: 'Tutup' }]
                            );
                        }}
                    />
                    <Divider />
                    <List.Item
                        title="Kebijakan Privasi"
                        description="Bagaimana kami menangani data Anda"
                        left={() => <List.Icon icon="shield-account" />}
                        right={() => <List.Icon icon="chevron-right" />}
                        onPress={() => {
                            Alert.alert(
                                'Kebijakan Privasi',
                                'SholatKu menghargai privasi Anda:\n\n📍 Lokasi\nDigunakan hanya untuk menghitung waktu sholat dan arah kiblat. Tidak dikirim ke server manapun.\n\n💾 Penyimpanan\nSemua data disimpan lokal di perangkat Anda.\n\n🔔 Notifikasi\nDigunakan hanya untuk reminder waktu sholat.\n\n🚫 Tanpa Iklan\nAplikasi ini tidak menampilkan iklan.\n\n🔐 Tanpa Tracking\nKami tidak melacak atau mengumpulkan data apapun.',
                                [{ text: 'Tutup' }]
                            );
                        }}
                    />
                </Surface>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Modals */}
            <ThemeSelectionModal
                visible={showThemeModal}
                onDismiss={() => setShowThemeModal(false)}
                onUpgrade={() => {
                    setShowThemeModal(false);
                    navigation.navigate('Premium');
                }}
            />
            <AdzanVoiceModal
                visible={showVoiceModal}
                onDismiss={() => setShowVoiceModal(false)}
                onUpgrade={() => {
                    setShowVoiceModal(false);
                    navigation.navigate('Premium');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1628',
    },
    header: {
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        gap: 12,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    section: {
        margin: 16,
        marginBottom: 0,
        borderRadius: 12,
        backgroundColor: '#0d2137',
        overflow: 'hidden',
    },
    sectionTitle: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
        color: '#c9a227',
    },
    subSectionTitle: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
        color: '#666',
    },
});
