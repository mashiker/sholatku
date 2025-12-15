import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Text, ActivityIndicator, Button, useTheme, Surface, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { PrayerCard } from '@/components/prayer/PrayerCard';
import { CountdownTimer } from '@/components/prayer/CountdownTimer';
import { PrayerType } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BannerAdComponent } from '@/components/ads/BannerAdComponent';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const theme = useTheme();
    const { currentLocation, loading: locationLoading, error: locationError, getLocation } = useLocation();
    const { prayers, loading: prayersLoading, error: prayersError, refresh } = usePrayerTimes();

    const loading = locationLoading || prayersLoading;
    const error = locationError || prayersError;

    const today = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

    if (loading && !prayers) {
        return (
            <View style={styles.center}>
                <LinearGradient colors={['#1a237e', '#0d47a1']} style={StyleSheet.absoluteFill} />
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ marginTop: 10, color: '#fff' }}>Memuat Jadwal Sholat...</Text>
            </View>
        );
    }

    if (error && !prayers) {
        return (
            <View style={styles.center}>
                <LinearGradient colors={['#1a237e', '#0d47a1']} style={StyleSheet.absoluteFill} />
                <MaterialCommunityIcons name="alert-circle" size={64} color="#ff8a80" />
                <Text variant="titleMedium" style={{ color: '#fff', textAlign: 'center', marginVertical: 16 }}>
                    {error}
                </Text>
                <Button mode="contained" onPress={() => { getLocation(); refresh(); }} buttonColor="#fff" textColor="#1a237e">
                    Coba Lagi
                </Button>
            </View>
        );
    }

    const PRAYER_NAMES: Record<string, string> = {
        fajr: 'Subuh',
        shuruq: 'Syuruq',
        dhuhr: 'Dzuhur',
        asr: 'Ashar',
        maghrib: 'Maghrib',
        isha: 'Isya',
    };

    const PRAYER_ICONS: Record<string, string> = {
        fajr: 'weather-sunset-up',
        shuruq: 'white-balance-sunny',
        dhuhr: 'weather-sunny',
        asr: 'weather-sunny-alert',
        maghrib: 'weather-sunset-down',
        isha: 'weather-night',
    };

    const getNextPrayer = () => {
        if (!prayers) return null;
        const now = new Date();
        const timeToDate = (timeStr: string) => {
            const [h, m] = timeStr.split(':').map(Number);
            const d = new Date();
            d.setHours(h, m, 0, 0);
            return d;
        };

        const list: PrayerType[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        for (const type of list) {
            const prayerTime = prayers[type as keyof typeof prayers] as string;
            if (timeToDate(prayerTime) > now) {
                return { type, name: PRAYER_NAMES[type], time: prayerTime, icon: PRAYER_ICONS[type] };
            }
        }
        return { type: 'fajr', name: 'Subuh', time: prayers.fajr, icon: PRAYER_ICONS.fajr };
    };

    const nextPrayer = getNextPrayer();

    const prayerList = ['fajr', 'shuruq', 'dhuhr', 'asr', 'maghrib', 'isha'];

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a237e', '#283593', '#3949ab']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <View>
                            <Text variant="headlineMedium" style={styles.appTitle}>SholatKu</Text>
                            <View style={styles.locationRow}>
                                <MaterialCommunityIcons name="map-marker" size={16} color="rgba(255,255,255,0.8)" />
                                <Text style={styles.locationText}>
                                    {currentLocation?.city || 'Menentukan lokasi...'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>{today}</Text>
                            <Text style={styles.hijriText}>{prayers?.hijri_date || ''}</Text>
                        </View>
                    </View>

                    {/* Next Prayer Countdown */}
                    {nextPrayer && (
                        <Card style={styles.countdownCard} mode="elevated">
                            <Card.Content style={styles.countdownContent}>
                                <View style={styles.countdownLeft}>
                                    <Text variant="labelMedium" style={{ color: '#666' }}>Waktu Sholat Berikutnya</Text>
                                    <View style={styles.nextPrayerRow}>
                                        <MaterialCommunityIcons name={nextPrayer.icon as any} size={28} color="#1a237e" />
                                        <Text variant="headlineSmall" style={styles.nextPrayerName}>{nextPrayer.name}</Text>
                                    </View>
                                    <Text variant="displaySmall" style={styles.nextPrayerTime}>{nextPrayer.time}</Text>
                                </View>
                                <View style={styles.countdownRight}>
                                    <CountdownTimer targetTime={nextPrayer.time} prayerName={nextPrayer.name} compact />
                                </View>
                            </Card.Content>
                        </Card>
                    )}
                </SafeAreaView>
            </LinearGradient>

            {/* Prayer List */}
            <ScrollView style={styles.prayerList} contentContainerStyle={{ paddingBottom: 100 }}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Jadwal Hari Ini</Text>
                {prayers && prayerList.map((type) => {
                    const prayerTime = prayers[type as keyof typeof prayers] as string;
                    const isPast = (() => {
                        const [h, m] = prayerTime.split(':').map(Number);
                        const d = new Date();
                        d.setHours(h, m, 0, 0);
                        return d < new Date();
                    })();

                    return (
                        <Surface key={type} style={[
                            styles.prayerRow,
                            nextPrayer?.type === type && styles.prayerRowActive
                        ]} elevation={1}>
                            <View style={styles.prayerIcon}>
                                <MaterialCommunityIcons
                                    name={PRAYER_ICONS[type] as any}
                                    size={24}
                                    color={nextPrayer?.type === type ? '#1a237e' : isPast ? '#999' : '#333'}
                                />
                            </View>
                            <Text style={[
                                styles.prayerName,
                                isPast && { color: '#999' },
                                nextPrayer?.type === type && { color: '#1a237e', fontWeight: 'bold' }
                            ]}>
                                {PRAYER_NAMES[type]}
                            </Text>
                            <Text style={[
                                styles.prayerTime,
                                isPast && { color: '#999' },
                                nextPrayer?.type === type && { color: '#1a237e', fontWeight: 'bold' }
                            ]}>
                                {prayerTime}
                            </Text>
                            {nextPrayer?.type === type && (
                                <View style={styles.nextBadge}>
                                    <Text style={styles.nextBadgeText}>Berikutnya</Text>
                                </View>
                            )}
                        </Surface>
                    );
                })}
            </ScrollView>

            {/* Banner Ad */}
            <BannerAdComponent style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    headerGradient: {
        paddingBottom: 80, // Space for the overlapping card
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    appTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        color: 'rgba(255,255,255,0.8)',
        marginLeft: 4,
        fontSize: 14,
    },
    dateContainer: {
        alignItems: 'flex-end',
    },
    dateText: {
        color: '#fff',
        fontSize: 12,
    },
    hijriText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 11,
    },
    countdownCard: {
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 16,
        backgroundColor: '#fff',
    },
    countdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countdownLeft: {},
    countdownRight: {
        alignItems: 'flex-end',
    },
    nextPrayerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    nextPrayerName: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    nextPrayerTime: {
        fontWeight: 'bold',
        color: '#1a237e',
        marginTop: 4,
    },
    prayerList: {
        flex: 1,
        marginTop: -50, // Overlap with header
        paddingTop: 60,
    },
    sectionTitle: {
        paddingHorizontal: 20,
        marginBottom: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    prayerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 4,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    prayerRowActive: {
        backgroundColor: '#e8eaf6',
        borderLeftWidth: 4,
        borderLeftColor: '#1a237e',
    },
    prayerIcon: {
        width: 40,
        alignItems: 'center',
    },
    prayerName: {
        flex: 1,
        fontSize: 16,
    },
    prayerTime: {
        fontSize: 18,
        fontWeight: '600',
    },
    nextBadge: {
        backgroundColor: '#1a237e',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    nextBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
