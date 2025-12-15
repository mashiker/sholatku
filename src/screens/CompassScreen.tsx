import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { Text, useTheme, ActivityIndicator, Chip, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompass } from '@/hooks/useCompass';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.8;

export default function CompassScreen() {
    const theme = useTheme();
    const {
        heading, qiblaDirection, qiblaAngle, isPointingToQibla,
        calibrationStatus, isAvailable, locationLoading, hasLocation
    } = useCompass();

    const rotateAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const prevPointing = useRef(false);

    // Smooth compass rotation
    useEffect(() => {
        Animated.spring(rotateAnim, {
            toValue: -heading,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    }, [heading]);

    // Pulse animation when pointing to Qibla
    useEffect(() => {
        if (isPointingToQibla && !prevPointing.current) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.1, duration: 500, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                ])
            ).start();
        } else if (!isPointingToQibla) {
            pulseAnim.setValue(1);
        }
        prevPointing.current = isPointingToQibla;
    }, [isPointingToQibla]);

    const rotation = rotateAnim.interpolate({
        inputRange: [-360, 360],
        outputRange: ['-360deg', '360deg'],
    });

    const getCalibrationColor = () => {
        switch (calibrationStatus) {
            case 'good': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'poor': return '#F44336';
        }
    };

    if (!isAvailable) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <MaterialCommunityIcons name="compass-off" size={64} color={theme.colors.error} />
                    <Text variant="titleMedium" style={{ marginTop: 16, textAlign: 'center' }}>
                        Sensor kompas tidak tersedia pada perangkat ini.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (locationLoading || !hasLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <ActivityIndicator size="large" />
                    <Text variant="bodyMedium" style={{ marginTop: 16 }}>
                        Mendapatkan lokasi...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1a237e', '#0d47a1', '#1565c0']}
                style={StyleSheet.absoluteFill}
            />

            {/* Header */}
            <View style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>Arah Kiblat</Text>
                <Chip
                    icon="crosshairs-gps"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    textStyle={{ color: '#fff' }}
                >
                    {Math.round(qiblaDirection)}° dari Utara
                </Chip>
            </View>

            {/* Compass */}
            <View style={styles.compassWrapper}>
                <Animated.View style={[
                    styles.compassContainer,
                    { transform: [{ rotate: rotation }, { scale: pulseAnim }] }
                ]}>
                    {/* Compass Ring */}
                    <Surface style={styles.compassRing} elevation={5}>
                        {/* Direction Markers */}
                        {['N', 'E', 'S', 'W'].map((dir, i) => (
                            <Text
                                key={dir}
                                style={[
                                    styles.directionText,
                                    {
                                        top: i === 0 ? 20 : i === 2 ? undefined : '45%',
                                        bottom: i === 2 ? 20 : undefined,
                                        left: i === 3 ? 20 : i === 1 ? undefined : '45%',
                                        right: i === 1 ? 20 : undefined,
                                        color: dir === 'N' ? '#F44336' : '#fff',
                                    }
                                ]}
                            >
                                {dir}
                            </Text>
                        ))}

                        {/* Degree Markers */}
                        {Array.from({ length: 36 }).map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.degreeMark,
                                    {
                                        transform: [
                                            { rotate: `${i * 10}deg` },
                                            { translateY: -COMPASS_SIZE / 2 + 30 },
                                        ],
                                        height: i % 3 === 0 ? 15 : 8,
                                        backgroundColor: i % 9 === 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                                    }
                                ]}
                            />
                        ))}
                    </Surface>

                    {/* Qibla Direction Indicator */}
                    <View style={[
                        styles.qiblaIndicator,
                        { transform: [{ rotate: `${qiblaDirection}deg` }] }
                    ]}>
                        <View style={styles.qiblaArrow}>
                            <MaterialCommunityIcons name="mosque" size={32} color="#FFD700" />
                        </View>
                    </View>
                </Animated.View>

                {/* Fixed Center Pointer */}
                <View style={styles.centerPointer}>
                    <MaterialCommunityIcons
                        name="navigation"
                        size={40}
                        color={isPointingToQibla ? '#4CAF50' : '#FF5722'}
                    />
                </View>
            </View>

            {/* Status */}
            <View style={styles.statusContainer}>
                {isPointingToQibla ? (
                    <Surface style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]} elevation={2}>
                        <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
                        <Text variant="titleMedium" style={{ color: '#fff', marginLeft: 8 }}>
                            Arah Kiblat Tepat!
                        </Text>
                    </Surface>
                ) : (
                    <Text variant="bodyLarge" style={{ color: '#fff', textAlign: 'center' }}>
                        Putar perangkat hingga panah hijau mengarah ke masjid
                    </Text>
                )}
            </View>

            {/* Calibration */}
            <View style={styles.calibrationContainer}>
                <View style={[styles.calibrationDot, { backgroundColor: getCalibrationColor() }]} />
                <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 8 }}>
                    Kalibrasi: {calibrationStatus === 'good' ? 'Baik' : calibrationStatus === 'medium' ? 'Sedang' : 'Buruk'}
                </Text>
            </View>

            <Text variant="bodySmall" style={styles.calibrationTip}>
                Tip: Gerakkan HP membentuk angka 8 untuk kalibrasi
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    compassWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compassContainer: {
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compassRing: {
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
        borderRadius: COMPASS_SIZE / 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionText: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
    },
    degreeMark: {
        position: 'absolute',
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    qiblaIndicator: {
        position: 'absolute',
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    qiblaArrow: {
        marginTop: 10,
    },
    centerPointer: {
        position: 'absolute',
    },
    statusContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
    },
    calibrationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    calibrationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    calibrationTip: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
        paddingBottom: 20,
    },
});
