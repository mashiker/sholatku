import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Surface, List, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { activateLifetime, selectPremiumState } from '@/redux/slices/premiumSlice';
import { AppDispatch } from '@/redux/store';

export default function PremiumScreen() {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const premiumState = useSelector(selectPremiumState);

    const handlePurchase = () => {
        // In a real app, this would trigger RevenueCat/IAP flow
        // For now, we'll just simulate a purchase
        Alert.alert(
            "Upgrade ke Premium",
            "Fitur pembelian akan segera tersedia melalui Google Play. Terima kasih atas dukungan Anda!",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "OK (Demo)",
                    onPress: () => {
                        // Demo activation
                        dispatch(activateLifetime());
                        Alert.alert("Alhamdulillah!", "Anda sekarang pengguna Premium! Iklan telah dihilangkan.");
                    }
                }
            ]
        );
    };

    const features = [
        { icon: 'cancel', title: 'Bebas Iklan', desc: 'Pengalaman tanpa gangguan' },
        { icon: 'chart-line', title: 'Statistik Lengkap', desc: 'Data historis tanpa batas' },
        { icon: 'shield-check', title: 'Streak Protection', desc: 'Lindungi streak ibadah Anda' },
        { icon: 'palette', title: 'Tema Premium', desc: 'Akses 10 tema eksklusif' },
        { icon: 'volume-high', title: 'Suara Adzan Premium', desc: 'Pilihan muadzin terkenal' },
        { icon: 'file-export', title: 'Export Data', desc: 'Export laporan ke PDF/Excel' },
    ];

    if (premiumState.isPremium) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#c9a227', '#d4af37']} style={styles.premiumHeader}>
                    <SafeAreaView edges={['top']}>
                        <View style={styles.header}>
                            <MaterialCommunityIcons name="crown" size={64} color="#fff" />
                            <Text variant="headlineMedium" style={styles.title}>SholatKu Premium</Text>
                            <Text style={styles.subtitle}>Anda adalah pengguna Premium</Text>
                        </View>
                    </SafeAreaView>
                </LinearGradient>

                <View style={styles.content}>
                    <Surface style={styles.thankYouCard} elevation={2}>
                        <MaterialCommunityIcons name="heart" size={48} color="#c9a227" />
                        <Text variant="titleMedium" style={styles.thankYouTitle}>
                            Jazakallahu Khairan!
                        </Text>
                        <Text style={styles.thankYouText}>
                            Terima kasih atas dukungan Anda. Semoga Allah membalas kebaikan Anda dengan berlipat ganda.
                        </Text>
                    </Surface>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a1628', '#0d2137']} style={styles.header}>
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <MaterialCommunityIcons name="crown" size={48} color="#c9a227" />
                        <Text variant="headlineMedium" style={styles.title}>SholatKu Premium</Text>
                        <Text style={styles.subtitle}>Tingkatkan pengalaman ibadah Anda</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content}>
                {/* Features List */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Fitur Premium</Text>
                <Surface style={styles.featureCard} elevation={1}>
                    {features.map((feature, index) => (
                        <React.Fragment key={feature.title}>
                            <List.Item
                                title={feature.title}
                                description={feature.desc}
                                titleStyle={styles.featureTitle}
                                descriptionStyle={styles.featureDesc}
                                left={() => (
                                    <View style={styles.featureIcon}>
                                        <MaterialCommunityIcons name={feature.icon as any} size={24} color="#c9a227" />
                                    </View>
                                )}
                            />
                            {index < features.length - 1 && <Divider style={styles.divider} />}
                        </React.Fragment>
                    ))}
                </Surface>

                {/* Pricing */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Pilih Paket</Text>

                <Surface style={[styles.priceCard, styles.recommendedCard]} elevation={2}>
                    <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedText}>REKOMENDASI</Text>
                    </View>
                    <Text variant="titleLarge" style={styles.priceTitle}>Seumur Hidup</Text>
                    <Text variant="displaySmall" style={styles.price}>Rp 49.000</Text>
                    <Text style={styles.priceDesc}>Sekali bayar, akses selamanya</Text>
                    <Button mode="contained" onPress={handlePurchase} style={styles.buyButton} buttonColor="#c9a227" textColor="#000">
                        Beli Sekarang
                    </Button>
                </Surface>

                <Surface style={styles.priceCard} elevation={1}>
                    <Text variant="titleLarge" style={styles.priceTitle}>Langganan Tahunan</Text>
                    <Text variant="displaySmall" style={styles.price}>Rp 99.000 / tahun</Text>
                    <Text style={styles.priceDesc}>Hemat 2 bulan!</Text>
                    <Button mode="outlined" onPress={handlePurchase} style={styles.buyButton} textColor="#c9a227">
                        Langganan
                    </Button>
                </Surface>

                <Text style={styles.note}>
                    💡 Pembelian Anda adalah bentuk infaq untuk pengembangan aplikasi Islami ini.
                </Text>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1628',
    },
    header: {
        paddingBottom: 30,
    },
    premiumHeader: {
        paddingBottom: 30,
    },
    headerContent: {
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 12,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 12,
        color: '#c9a227',
    },
    featureCard: {
        borderRadius: 12,
        backgroundColor: '#0d2137',
        overflow: 'hidden',
    },
    featureTitle: {
        color: '#fff',
        fontWeight: '600',
    },
    featureDesc: {
        color: 'rgba(255,255,255,0.6)',
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(201, 162, 39, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    divider: {
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    priceCard: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#0d2137',
        marginBottom: 16,
        alignItems: 'center',
    },
    recommendedCard: {
        borderWidth: 2,
        borderColor: '#c9a227',
    },
    recommendedBadge: {
        position: 'absolute',
        top: -12,
        backgroundColor: '#c9a227',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 12,
    },
    recommendedText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    priceTitle: {
        fontWeight: 'bold',
        marginTop: 8,
        color: '#fff',
    },
    price: {
        fontWeight: 'bold',
        color: '#c9a227',
        marginTop: 8,
    },
    priceDesc: {
        color: 'rgba(255,255,255,0.6)',
        marginTop: 4,
    },
    buyButton: {
        marginTop: 16,
        width: '100%',
    },
    note: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        marginTop: 16,
        paddingHorizontal: 20,
    },
    thankYouCard: {
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#0d2137',
    },
    thankYouTitle: {
        marginTop: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    thankYouText: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
        lineHeight: 22,
    },
});

