import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Button, useTheme, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { CountdownTimer } from '@/components/prayer/CountdownTimer';
import { NotificationSettingsModal } from '@/components/prayer/NotificationSettingsModal';
import { PrayerType } from '@/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BannerAdComponent } from '@/components/ads/BannerAdComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSettings, setPrayerNotificationMode, PrayerKey, PrayerNotificationMode } from '@/redux/slices/settingsSlice';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Islamic Arch SVG Component
const IslamicArch = () => (
    <Svg width={width} height={180} viewBox={`0 0 ${width} 180`} style={styles.archSvg}>
        <Defs>
            <SvgLinearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#1b6d51" stopOpacity="0.6" />
                <Stop offset="100%" stopColor="#0d2137" stopOpacity="0.3" />
            </SvgLinearGradient>
        </Defs>
        <Path
            d={`M0,180 L0,100 Q${width / 2},0 ${width},100 L${width},180 Z`}
            fill="url(#archGradient)"
        />
        <Path
            d={`M20,180 L20,110 Q${width / 2},20 ${width - 20},110 L${width - 20},180`}
            fill="none"
            stroke="#c9a227"
            strokeWidth="2"
            strokeOpacity="0.5"
        />
    </Svg>
);

export default function HomeScreen() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const settings = useAppSelector(selectSettings);
    const { currentLocation, loading: locationLoading, error: locationError, getLocation } = useLocation();
    const { prayers, loading: prayersLoading, error: prayersError, refresh } = usePrayerTimes();

    // Modal state for notification settings
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPrayer, setSelectedPrayer] = useState<{ key: PrayerKey; name: string } | null>(null);

    const loading = locationLoading || prayersLoading;
    const error = locationError || prayersError;

    const today = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

    if (loading && !prayers) {
        return (
            <View style={styles.center}>
                <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />
                <ActivityIndicator size="large" color="#c9a227" />
                <Text style={{ marginTop: 10, color: '#fff' }}>Memuat Jadwal Sholat...</Text>
            </View>
        );
    }

    if (error && !prayers) {
        return (
            <View style={styles.center}>
                <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />
                <MaterialCommunityIcons name="alert-circle" size={64} color="#c9a227" />
                <Text variant="titleMedium" style={{ color: '#fff', textAlign: 'center', marginVertical: 16 }}>
                    {error}
                </Text>
                <Button mode="contained" onPress={() => { getLocation(); refresh(); }} buttonColor="#c9a227" textColor="#0a1628">
                    Coba Lagi
                </Button>
            </View>
        );
    }

    const PRAYER_NAMES: Record<string, string> = {
        imsak: 'Imsak',
        fajr: 'Shubuh',
        shuruq: 'Terbit',
        dhuhr: 'Dzuhur',
        asr: 'Ashar',
        maghrib: 'Maghrib',
        isha: 'Isya',
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
                return { type, name: PRAYER_NAMES[type], time: prayerTime };
            }
        }
        return { type: 'fajr', name: 'Shubuh', time: prayers.fajr };
    };

    const nextPrayer = getNextPrayer();

    const prayerList = ['imsak', 'fajr', 'shuruq', 'dhuhr', 'asr', 'maghrib', 'isha'];

    // Get notification icon based on mode
    const getNotificationIcon = (mode: PrayerNotificationMode): string => {
        switch (mode) {
            case 'alarm':
                return 'bell-ring';
            case 'notification':
                return 'bell';
            case 'silent':
                return 'bell-off-outline';
            case 'disabled':
                return 'bell-cancel-outline';
            default:
                return 'bell';
        }
    };

    // Get notification icon color based on mode
    const getNotificationColor = (mode: PrayerNotificationMode, isActive: boolean): string => {
        if (mode === 'disabled') return '#555';
        if (mode === 'silent') return '#777';
        if (isActive) return '#c9a227';
        return '#1b6d51';
    };

    // Handle notification icon press
    const handleNotificationPress = (prayerKey: PrayerKey, prayerName: string) => {
        setSelectedPrayer({ key: prayerKey, name: prayerName });
        setModalVisible(true);
    };

    // Handle mode change from modal
    const handleModeChange = (prayer: PrayerKey, mode: PrayerNotificationMode) => {
        dispatch(setPrayerNotificationMode({ prayer, mode }));
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />

            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.appTitle}>𝒮holatku</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.headerIcon}>
                            <MaterialCommunityIcons name="cog-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIcon}>
                            <MaterialCommunityIcons name="bell-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Islamic Arch with Countdown */}
                <View style={styles.archContainer}>
                    <IslamicArch />
                    <View style={styles.countdownOverlay}>
                        <Text style={styles.upcomingLabel}>Upcoming</Text>
                        {nextPrayer && (
                            <>
                                <CountdownTimer targetTime={nextPrayer.time} prayerName={nextPrayer.name} compact />
                                <Text style={styles.nextPrayerName}>{nextPrayer.name}</Text>
                            </>
                        )}
                    </View>
                </View>

                {/* Prayer List */}
                <View style={styles.prayerListContainer}>
                    <ScrollView style={styles.prayerList} contentContainerStyle={{ paddingBottom: 180 }} showsVerticalScrollIndicator={false}>
                        {prayers && prayerList.map((type, index) => {
                            const prayerTime = prayers[type as keyof typeof prayers] as string;
                            if (!prayerTime) return null;
                            const isPast = (() => {
                                const [h, m] = prayerTime.split(':').map(Number);
                                const d = new Date();
                                d.setHours(h, m, 0, 0);
                                return d < new Date();
                            })();
                            const notifMode = settings.prayerNotificationModes?.[type as PrayerKey] ?? 'notification';
                            const isNextPrayer = nextPrayer?.type === type;
                            const isFirstItem = index === 0;
                            const isLastItem = index === prayerList.length - 1;

                            return (
                                <Surface key={type} style={[
                                    styles.prayerRow,
                                    isNextPrayer && styles.prayerRowActive,
                                    isFirstItem && styles.prayerRowFirst,
                                    isLastItem && styles.prayerRowLast,
                                ]} elevation={0}>
                                    <View style={styles.prayerIcon}>
                                        <MaterialCommunityIcons
                                            name="mosque"
                                            size={20}
                                            color={isNextPrayer ? '#c9a227' : isPast ? '#555' : '#888'}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.prayerName,
                                        isPast && { color: '#555' },
                                        isNextPrayer && { color: '#fff', fontWeight: 'bold' }
                                    ]}>
                                        {PRAYER_NAMES[type]}
                                    </Text>
                                    <Text style={[
                                        styles.prayerTime,
                                        isPast && { color: '#555' },
                                        isNextPrayer && { color: '#c9a227', fontWeight: 'bold' }
                                    ]}>
                                        {prayerTime}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.notificationButton}
                                        onPress={() => handleNotificationPress(type as PrayerKey, PRAYER_NAMES[type])}
                                    >
                                        <MaterialCommunityIcons
                                            name={getNotificationIcon(notifMode) as any}
                                            size={22}
                                            color={getNotificationColor(notifMode, isNextPrayer)}
                                        />
                                    </TouchableOpacity>
                                </Surface>
                            );
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>

            {/* Banner Ad */}
            <BannerAdComponent style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

            {/* Notification Settings Modal */}
            {selectedPrayer && (
                <NotificationSettingsModal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    prayerName={selectedPrayer.name}
                    prayerKey={selectedPrayer.key}
                    currentMode={settings.prayerNotificationModes?.[selectedPrayer.key] ?? 'notification'}
                    onModeChange={handleModeChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1628',
    },
    safeArea: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },
    appTitle: {
        color: '#fff',
        fontSize: 28,
        fontStyle: 'italic',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginLeft: 16,
        padding: 4,
    },
    archContainer: {
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    archSvg: {
        position: 'absolute',
        top: 0,
    },
    countdownOverlay: {
        alignItems: 'center',
        paddingTop: 30,
    },
    upcomingLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginBottom: 4,
    },
    nextPrayerName: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        marginTop: 8,
    },
    prayerListContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#c9a227',
        backgroundColor: 'rgba(13, 33, 55, 0.8)',
        overflow: 'hidden',
    },
    prayerList: {
        flex: 1,
    },
    prayerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(201, 162, 39, 0.2)',
    },
    prayerRowActive: {
        backgroundColor: 'rgba(27, 109, 81, 0.3)',
    },
    prayerRowFirst: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    prayerRowLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    prayerIcon: {
        width: 36,
        alignItems: 'center',
    },
    prayerName: {
        flex: 1,
        fontSize: 16,
        color: '#aaa',
    },
    prayerTime: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8,
        color: '#888',
    },
    notificationButton: {
        padding: 8,
        marginLeft: 4,
    },
});
