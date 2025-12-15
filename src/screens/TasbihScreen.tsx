import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, TextInput, Dimensions, Vibration, Platform, Text as RNText, ScrollView } from 'react-native';
import { Text, useTheme, IconButton, Modal, Portal, Button, RadioButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const BEAD_COUNT = 33;
const CIRCLE_SIZE = width * 0.75;

// Default dzikir options
const DZIKIR_OPTIONS = [
    { id: 'subhanallah', name: 'Subhanallah', arabic: 'سُبْحَانَ اللَّهِ' },
    { id: 'alhamdulillah', name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ' },
    { id: 'allahuakbar', name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ' },
    { id: 'astaghfirullah', name: "Astaghfirullahal'azim", arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ' },
    { id: 'lailaha', name: 'Laa Ilaaha Illallaah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ' },
    { id: 'tahlil', name: 'Subhanallah walhamdulillah', arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ' },
];

// Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="alert-circle" size={64} color="#F44336" />
                    <RNText style={{ color: '#fff', marginTop: 16 }}>Terjadi kesalahan</RNText>
                </View>
            );
        }
        return this.props.children;
    }
}

// Bead component
const Bead = ({ active, index, total, color }: { active: boolean; index: number; total: number; color: string }) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = CIRCLE_SIZE / 2 - 25;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
        <View
            style={[
                styles.bead,
                {
                    transform: [{ translateX: x }, { translateY: y }],
                    backgroundColor: active ? color : 'rgba(255,255,255,0.3)',
                    width: active ? 18 : 14,
                    height: active ? 18 : 14,
                    borderRadius: active ? 9 : 7,
                }
            ]}
        />
    );
};

function TasbihScreenContent() {
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedDzikir, setSelectedDzikir] = useState(DZIKIR_OPTIONS[0]);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [beadColor, setBeadColor] = useState('#E8D5B7');

    // Modals
    const [dzikirModalVisible, setDzikirModalVisible] = useState(false);
    const [targetModalVisible, setTargetModalVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const [newTarget, setNewTarget] = useState('33');

    // Load from Redux
    useEffect(() => {
        try {
            const { store } = require('@/redux/store');
            const state = store.getState();
            if (state?.tasbih?.counters?.length > 0) {
                const activeId = state.tasbih.activeCounterId;
                const counter = state.tasbih.counters.find((c: any) => c.id === activeId) || state.tasbih.counters[0];
                setCount(counter.count || 0);
                setTarget(counter.target_count || 33);
                // Calculate total from all counters
                const total = state.tasbih.counters.reduce((sum: number, c: any) => sum + (c.count || 0), 0);
                setTotalCount(total);
            }
        } catch (e) { }
    }, []);

    const handleTap = async () => {
        const newCount = count + 1;
        const newTotal = totalCount + 1;
        setCount(newCount);
        setTotalCount(newTotal);

        // Save to Redux
        try {
            const { store } = require('@/redux/store');
            const { incrementCount } = require('@/redux/slices/tasbihSlice');
            const state = store.getState();
            const activeId = state?.tasbih?.activeCounterId || 1;
            store.dispatch(incrementCount({ id: activeId }));
        } catch (e) { }

        // Only vibrate on target milestone
        if (newCount > 0 && newCount % target === 0) {
            try {
                if (Platform.OS === 'android') {
                    Vibration.vibrate([0, 300, 100, 300, 100, 400]);
                } else {
                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 150);
                    setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), 300);
                }
            } catch (e) { }
        }
    };

    const handleReset = () => {
        Alert.alert('Reset Counter', 'Apakah Anda yakin?', [
            { text: 'Batal', style: 'cancel' },
            {
                text: 'Reset',
                style: 'destructive',
                onPress: () => {
                    setCount(0);
                    try {
                        const { store } = require('@/redux/store');
                        const { resetCount } = require('@/redux/slices/tasbihSlice');
                        const state = store.getState();
                        store.dispatch(resetCount({ id: state?.tasbih?.activeCounterId || 1 }));
                    } catch (e) { }
                },
            },
        ]);
    };

    const handleTargetChange = () => {
        const t = parseInt(newTarget);
        if (t > 0 && t <= 1000) {
            setTarget(t);
            try {
                const { store } = require('@/redux/store');
                const { updateTarget } = require('@/redux/slices/tasbihSlice');
                const state = store.getState();
                store.dispatch(updateTarget({ id: state?.tasbih?.activeCounterId || 1, target: t }));
            } catch (e) { }
        }
        setTargetModalVisible(false);
    };

    const handleDzikirSelect = (dzikir: typeof DZIKIR_OPTIONS[0]) => {
        setSelectedDzikir(dzikir);
        setDzikirModalVisible(false);
    };

    const cycleProgress = count % target;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Tasbih Digital</Text>
                    <View style={styles.headerButtons}>
                        <IconButton icon={soundEnabled ? 'volume-high' : 'volume-off'} iconColor="#fff" onPress={() => setSoundEnabled(!soundEnabled)} />
                        <IconButton icon="refresh" iconColor="#fff" onPress={handleReset} />
                        <IconButton icon="dots-grid" iconColor="#fff" onPress={() => setSettingsModalVisible(true)} />
                    </View>
                </View>

                {/* Counter Display */}
                <View style={styles.counterSection}>
                    <TouchableOpacity onPress={() => setTargetModalVisible(true)}>
                        <Text style={styles.countDisplay}>
                            {cycleProgress}<Text style={styles.countTarget}>/{target}</Text>
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.totalDisplay}>Total: {totalCount}</Text>
                    <TouchableOpacity style={styles.dzikirSelector} onPress={() => setDzikirModalVisible(true)}>
                        <Text style={styles.dzikirName}>{selectedDzikir.name}</Text>
                        <MaterialCommunityIcons name="chevron-down" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Beads Circle - Tap Area */}
                <TouchableOpacity style={styles.beadsContainer} activeOpacity={0.9} onPress={handleTap}>
                    <View style={styles.beadsCircle}>
                        {Array.from({ length: BEAD_COUNT }).map((_, i) => (
                            <Bead
                                key={i}
                                index={i}
                                total={BEAD_COUNT}
                                active={i < cycleProgress}
                                color={beadColor}
                            />
                        ))}
                        {/* Center tassel */}
                        <View style={styles.tasselContainer}>
                            <View style={[styles.tasselTop, { backgroundColor: beadColor }]} />
                            <View style={[styles.tasselBeads, { backgroundColor: beadColor }]} />
                            <MaterialCommunityIcons name="rhombus" size={24} color={beadColor} />
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={styles.tapHint}>Ketuk area tasbih untuk menghitung</Text>
            </SafeAreaView>

            {/* Dzikir Selection Modal */}
            <Portal>
                <Modal visible={dzikirModalVisible} onDismiss={() => setDzikirModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>Pilih Bacaan Dzikir</Text>
                    <ScrollView style={{ maxHeight: 350 }}>
                        {DZIKIR_OPTIONS.map((dzikir) => (
                            <TouchableOpacity
                                key={dzikir.id}
                                style={styles.dzikirOption}
                                onPress={() => handleDzikirSelect(dzikir)}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.dzikirOptionName}>{dzikir.name}</Text>
                                    <Text style={styles.dzikirOptionArabic}>{dzikir.arabic}</Text>
                                </View>
                                <RadioButton
                                    value={dzikir.id}
                                    status={selectedDzikir.id === dzikir.id ? 'checked' : 'unchecked'}
                                    onPress={() => handleDzikirSelect(dzikir)}
                                    color="#FFC107"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Divider style={{ marginVertical: 12 }} />
                    <View style={styles.modalButtons}>
                        <Button mode="outlined" onPress={() => setDzikirModalVisible(false)} textColor="#fff" style={styles.modalBtn}>BATAL</Button>
                        <Button mode="contained" onPress={() => setDzikirModalVisible(false)} buttonColor="#2196F3">SIMPAN</Button>
                    </View>
                </Modal>
            </Portal>

            {/* Target Change Modal */}
            <Portal>
                <Modal visible={targetModalVisible} onDismiss={() => setTargetModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>Ganti Batas Hitung</Text>
                    <Text style={styles.modalSubtitle}>Masukkan batas hitung dzikir</Text>
                    <TextInput
                        style={styles.targetInput}
                        value={newTarget}
                        onChangeText={setNewTarget}
                        keyboardType="number-pad"
                        placeholderTextColor="#999"
                    />
                    <View style={styles.modalButtons}>
                        <Button mode="outlined" onPress={() => setTargetModalVisible(false)} textColor="#fff" style={styles.modalBtn}>BATAL</Button>
                        <Button mode="contained" onPress={handleTargetChange} buttonColor="#2196F3">SIMPAN</Button>
                    </View>
                </Modal>
            </Portal>

            {/* Settings Modal */}
            <Portal>
                <Modal visible={settingsModalVisible} onDismiss={() => setSettingsModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>Pengaturan</Text>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setBeadColor('#E8D5B7')}>
                        <Text style={styles.settingText}>Warna Krem</Text>
                        <View style={[styles.colorDot, { backgroundColor: '#E8D5B7' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setBeadColor('#F48FB1')}>
                        <Text style={styles.settingText}>Warna Pink</Text>
                        <View style={[styles.colorDot, { backgroundColor: '#F48FB1' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setBeadColor('#81D4FA')}>
                        <Text style={styles.settingText}>Warna Biru</Text>
                        <View style={[styles.colorDot, { backgroundColor: '#81D4FA' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem} onPress={() => setBeadColor('#A5D6A7')}>
                        <Text style={styles.settingText}>Warna Hijau</Text>
                        <View style={[styles.colorDot, { backgroundColor: '#A5D6A7' }]} />
                    </TouchableOpacity>
                    <View style={styles.modalButtons}>
                        <Button mode="contained" onPress={() => setSettingsModalVisible(false)} buttonColor="#2196F3">TUTUP</Button>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

export default function TasbihScreen() {
    return (
        <ErrorBoundary>
            <TasbihScreenContent />
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e' },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
    headerTitle: { fontSize: 20, color: '#fff', fontWeight: '600' },
    headerButtons: { flexDirection: 'row' },
    counterSection: { alignItems: 'center', marginTop: 20 },
    countDisplay: { fontSize: 56, fontWeight: 'bold', color: '#fff' },
    countTarget: { fontSize: 32, color: 'rgba(255,255,255,0.6)' },
    totalDisplay: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    dzikirSelector: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingHorizontal: 16, paddingVertical: 8 },
    dzikirName: { fontSize: 16, color: '#fff', marginRight: 4 },
    beadsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    beadsCircle: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, justifyContent: 'center', alignItems: 'center' },
    bead: { position: 'absolute' },
    tasselContainer: { position: 'absolute', bottom: -10, alignItems: 'center' },
    tasselTop: { width: 12, height: 12, borderRadius: 6 },
    tasselBeads: { width: 8, height: 30, borderRadius: 4, marginTop: 4, marginBottom: 4 },
    tapHint: { textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12, paddingBottom: 20 },
    modal: { backgroundColor: '#252540', margin: 20, padding: 20, borderRadius: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    modalSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 },
    dzikirOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    dzikirOptionName: { fontSize: 16, color: '#fff' },
    dzikirOptionArabic: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
    modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 16 },
    modalBtn: { borderColor: 'rgba(255,255,255,0.3)' },
    targetInput: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, fontSize: 18, color: '#fff', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    settingText: { fontSize: 16, color: '#fff' },
    colorDot: { width: 24, height: 24, borderRadius: 12 },
});
