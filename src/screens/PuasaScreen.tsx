import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Text as RNText } from 'react-native';
import { Text, useTheme, Surface, Card, Chip, Button, IconButton, Modal, Portal, Divider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: string }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: '' };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error: error?.message || 'Unknown error' };
    }
    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <MaterialCommunityIcons name="alert-circle" size={64} color="#F44336" />
                    <RNText style={{ marginTop: 16, textAlign: 'center', color: '#333' }}>
                        Terjadi kesalahan pada halaman ini
                    </RNText>
                    <RNText style={{ marginTop: 8, textAlign: 'center', color: '#999', fontSize: 12 }}>
                        {this.state.error}
                    </RNText>
                </View>
            );
        }
        return this.props.children;
    }
}

// Static puasa sunnah data (inline to avoid import issues)
const PUASA_SUNNAH = [
    { id: 'senin-kamis', name: 'Puasa Senin-Kamis', color: '#4CAF50', icon: 'calendar-week', timing: 'Setiap Senin & Kamis', difficulty: 2 },
    { id: 'ayyamul-bidh', name: 'Puasa Ayyamul Bidh', color: '#9C27B0', icon: 'moon-full', timing: '13-14-15 Hijriah', difficulty: 2 },
    { id: 'daud', name: 'Puasa Daud', color: '#FF5722', icon: 'fire', timing: 'Sehari puasa, sehari tidak', difficulty: 5 },
    { id: 'syawal', name: 'Puasa 6 Hari Syawal', color: '#2196F3', icon: 'gift', timing: 'Bulan Syawal', difficulty: 3 },
    { id: 'arafah', name: 'Puasa Arafah', color: '#FFC107', icon: 'star', timing: '9 Dzulhijjah', difficulty: 2 },
    { id: 'asyura', name: 'Puasa Asyura', color: '#E91E63', icon: 'water', timing: '10 Muharram', difficulty: 2 },
    { id: 'tasua', name: "Puasa Tasu'a", color: '#673AB7', icon: 'calendar-today', timing: '9 Muharram', difficulty: 1 },
    { id: 'dzulhijjah', name: 'Puasa 9 Hari Dzulhijjah', color: '#00BCD4', icon: 'calendar-star', timing: '1-9 Dzulhijjah', difficulty: 4 },
];

function PuasaScreenContent() {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [puasaData, setPuasaData] = useState({ currentStreak: 0, longestStreak: 0, totalEntries: 0 });
    const [selectedSunnah, setSelectedSunnah] = useState<any>(null);

    // Safe initialization
    useEffect(() => {
        try {
            // Try to load Redux state
            const { store } = require('@/redux/store');
            const state = store.getState();
            if (state?.puasa) {
                setPuasaData({
                    currentStreak: state.puasa.currentStreak || 0,
                    longestStreak: state.puasa.longestStreak || 0,
                    totalEntries: state.puasa.entries?.length || 0,
                });
            }
        } catch (e) {
            console.log('Could not load puasa state:', e);
        }
        setLoading(false);
    }, []);

    const today = format(new Date(), 'yyyy-MM-dd');
    const dayOfWeek = new Date().getDay();
    const isSeninKamis = dayOfWeek === 1 || dayOfWeek === 4;

    const handleCheckIn = (type: string, sunnahId?: string) => {
        try {
            const { store } = require('@/redux/store');
            const { checkInPuasa } = require('@/redux/slices/puasaSlice');
            store.dispatch(checkInPuasa({ date: today, type, sunnahId }));
            Alert.alert('Berhasil', 'Puasa berhasil dicatat!');
        } catch (e) {
            Alert.alert('Error', 'Gagal mencatat puasa');
        }
    };

    const getDifficultyStars = (difficulty: number) => {
        return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

    // Calculate Ramadhan countdown (simplified)
    const getRamadhanCountdown = () => {
        const now = new Date();
        // Approximate next Ramadhan: March 2025
        const ramadhan2025 = new Date(2025, 2, 1);
        const diff = ramadhan2025.getTime() - now.getTime();
        const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        return { days, year: 1446 };
    };

    const countdown = getRamadhanCountdown();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 16 }}>Memuat...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1565c0', '#1976d2', '#42a5f5']} style={styles.headerGradient}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.title}>Puasa Tracker</Text>
                        <Text style={styles.subtitle}>{format(new Date(), 'd MMMM yyyy', { locale: id })}</Text>
                    </View>

                    {/* Ramadhan Countdown Card */}
                    <Card style={styles.countdownCard} mode="elevated">
                        <Card.Content>
                            <View style={styles.countdown}>
                                <View style={styles.countdownTop}>
                                    <MaterialCommunityIcons name="timer-sand" size={40} color="#1565c0" />
                                    <View style={styles.countdownText}>
                                        <Text variant="displaySmall" style={styles.countdownNumber}>
                                            {countdown.days}
                                        </Text>
                                        <Text style={styles.countdownLabel}>hari menuju Ramadhan</Text>
                                    </View>
                                </View>
                                <Text style={styles.countdownDate}>
                                    Ramadhan {countdown.year} H
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Today's Sunnah */}
                <Text variant="titleMedium" style={styles.sectionTitle}>
                    Puasa Sunnah Hari Ini
                </Text>
                <View style={styles.todaySunnah}>
                    {isSeninKamis ? (
                        <TouchableOpacity
                            style={styles.todayCard}
                            onPress={() => handleCheckIn('sunnah', 'senin-kamis')}
                        >
                            <MaterialCommunityIcons name="circle-outline" size={24} color="#999" />
                            <Text style={styles.todayCardText}>
                                Puasa {dayOfWeek === 1 ? 'Senin' : 'Kamis'}
                            </Text>
                            <Chip compact>Tap untuk catat</Chip>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.noSunnahToday}>Tidak ada puasa sunnah khusus hari ini</Text>
                    )}
                </View>

                {/* Puasa Sunnah Library */}
                <Text variant="titleMedium" style={styles.sectionTitle}>
                    Jenis Puasa Sunnah
                </Text>
                <View style={styles.sunnahGrid}>
                    {PUASA_SUNNAH.map((sunnah) => (
                        <TouchableOpacity
                            key={sunnah.id}
                            style={[styles.sunnahCard, { borderLeftColor: sunnah.color }]}
                            onPress={() => setSelectedSunnah(sunnah)}
                        >
                            <View style={[styles.sunnahIcon, { backgroundColor: sunnah.color + '20' }]}>
                                <MaterialCommunityIcons name={sunnah.icon as any} size={24} color={sunnah.color} />
                            </View>
                            <View style={styles.sunnahInfo}>
                                <Text style={styles.sunnahName}>{sunnah.name}</Text>
                                <Text style={styles.sunnahDifficulty}>{getDifficultyStars(sunnah.difficulty)}</Text>
                                <Text style={styles.sunnahCategory}>{sunnah.timing}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats */}
                <Text variant="titleMedium" style={styles.sectionTitle}>
                    Statistik Anda
                </Text>
                <View style={styles.statsRow}>
                    <Surface style={styles.statCard} elevation={1}>
                        <Text style={styles.statNumber}>{puasaData.currentStreak}</Text>
                        <Text style={styles.statLabel}>Hari Berturut</Text>
                    </Surface>
                    <Surface style={styles.statCard} elevation={1}>
                        <Text style={styles.statNumber}>{puasaData.longestStreak}</Text>
                        <Text style={styles.statLabel}>Rekor Terbaik</Text>
                    </Surface>
                    <Surface style={styles.statCard} elevation={1}>
                        <Text style={styles.statNumber}>{puasaData.totalEntries}</Text>
                        <Text style={styles.statLabel}>Total Puasa</Text>
                    </Surface>
                </View>
            </ScrollView>

            {/* Detail Modal */}
            <Portal>
                <Modal visible={!!selectedSunnah} onDismiss={() => setSelectedSunnah(null)} contentContainerStyle={styles.modal}>
                    {selectedSunnah && (
                        <ScrollView>
                            <View style={styles.modalHeader}>
                                <View style={[styles.modalIcon, { backgroundColor: selectedSunnah.color + '20' }]}>
                                    <MaterialCommunityIcons name={selectedSunnah.icon} size={32} color={selectedSunnah.color} />
                                </View>
                                <IconButton icon="close" onPress={() => setSelectedSunnah(null)} style={styles.closeBtn} />
                            </View>
                            <Text variant="headlineSmall" style={styles.modalTitle}>{selectedSunnah.name}</Text>
                            <Text style={styles.modalDescription}>Waktu: {selectedSunnah.timing}</Text>
                            <Text style={styles.modalDescription}>Tingkat kesulitan: {getDifficultyStars(selectedSunnah.difficulty)}</Text>

                            <Button
                                mode="contained"
                                onPress={() => {
                                    setSelectedSunnah(null);
                                    handleCheckIn('sunnah', selectedSunnah.id);
                                }}
                                style={styles.modalBtn}
                                icon="check"
                            >
                                Catat Puasa Ini
                            </Button>
                        </ScrollView>
                    )}
                </Modal>
            </Portal>
        </View>
    );
}

export default function PuasaScreen() {
    return (
        <ErrorBoundary>
            <PuasaScreenContent />
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    headerGradient: { paddingBottom: 80 },
    header: { alignItems: 'center', paddingTop: 10 },
    title: { fontWeight: 'bold', color: '#fff' },
    subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
    countdownCard: { marginHorizontal: 16, marginTop: 16, borderRadius: 16 },
    countdown: { alignItems: 'center' },
    countdownTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    countdownText: { marginLeft: 16 },
    countdownNumber: { fontWeight: 'bold', color: '#1565c0' },
    countdownLabel: { color: '#666', fontSize: 14 },
    countdownDate: { color: '#999', fontSize: 12 },
    content: { flex: 1, marginTop: -50 },
    sectionTitle: { fontWeight: 'bold', paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
    todaySunnah: { paddingHorizontal: 16 },
    todayCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, elevation: 2 },
    todayCardText: { flex: 1, marginLeft: 12, fontSize: 16 },
    noSunnahToday: { color: '#999', fontStyle: 'italic' },
    sunnahGrid: { paddingHorizontal: 16 },
    sunnahCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8, borderLeftWidth: 4 },
    sunnahIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    sunnahInfo: { flex: 1, marginLeft: 12 },
    sunnahName: { fontSize: 14, fontWeight: '600' },
    sunnahDifficulty: { fontSize: 10, marginTop: 2 },
    sunnahCategory: { fontSize: 11, color: '#666', marginTop: 2 },
    statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
    statCard: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center' },
    statNumber: { fontSize: 24, fontWeight: 'bold', color: '#1565c0' },
    statLabel: { fontSize: 11, color: '#666', textAlign: 'center' },
    modal: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 16, maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    modalIcon: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center' },
    closeBtn: { position: 'absolute', right: -8, top: -8 },
    modalTitle: { fontWeight: 'bold', marginTop: 12 },
    modalDescription: { color: '#666', marginTop: 8 },
    modalBtn: { marginTop: 20 },
});
