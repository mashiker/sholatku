import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform, Image } from 'react-native';
import { Text, useTheme, ActivityIndicator, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompass } from '@/hooks/useCompass';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Circle, Line, Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop, Rect, Polygon, Ellipse } from 'react-native-svg';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.85;
const COMPASS_RADIUS = COMPASS_SIZE / 2;

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
                    Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, useNativeDriver: true }),
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

    const getCalibrationText = () => {
        switch (calibrationStatus) {
            case 'good': return 'Baik';
            case 'medium': return 'Sedang';
            case 'poor': return 'Buruk';
        }
    };

    const getCalibrationColor = () => {
        switch (calibrationStatus) {
            case 'good': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'poor': return '#F44336';
        }
    };

    // Calculate distance from Makkah (approximate)
    const getDistanceFromMakkah = () => {
        // This is a placeholder - actual distance would come from location service
        return '12,560';
    };

    // Get direction text (NE, NW, SE, SW, N, S, E, W)
    const getDirectionText = (degrees: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    if (!isAvailable) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />
                <View style={styles.errorContainer}>
                    <MaterialCommunityIcons name="compass-off" size={64} color="#c9a227" />
                    <Text variant="titleMedium" style={{ marginTop: 16, textAlign: 'center', color: '#fff' }}>
                        Sensor kompas tidak tersedia pada perangkat ini.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (locationLoading || !hasLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />
                <View style={styles.errorContainer}>
                    <ActivityIndicator size="large" color="#c9a227" />
                    <Text variant="bodyMedium" style={{ marginTop: 16, color: '#fff' }}>
                        Mendapatkan lokasi...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0a1628', '#0d2137']} style={StyleSheet.absoluteFill} />

            {/* Accuracy Badge */}
            <View style={styles.accuracyBadge}>
                <MaterialCommunityIcons name="signal-cellular-3" size={18} color={getCalibrationColor()} />
                <Text style={styles.accuracyText}>Akurasi: </Text>
                <Text style={[styles.accuracyValue, { color: getCalibrationColor() }]}>
                    {getCalibrationText()}
                </Text>
                <View style={styles.signalBars}>
                    <View style={[styles.signalBar, { backgroundColor: getCalibrationColor() }]} />
                    <View style={[styles.signalBar, { backgroundColor: calibrationStatus !== 'poor' ? getCalibrationColor() : '#555' }]} />
                    <View style={[styles.signalBar, { backgroundColor: calibrationStatus === 'good' ? getCalibrationColor() : '#555' }]} />
                    <View style={[styles.signalBar, { backgroundColor: calibrationStatus === 'good' ? getCalibrationColor() : '#555' }]} />
                </View>
            </View>

            {/* Compass */}
            <View style={styles.compassWrapper}>
                <Animated.View style={[
                    styles.compassContainer,
                    { transform: [{ rotate: rotation }, { scale: pulseAnim }] }
                ]}>
                    {/* Compass Ring SVG */}
                    <Svg width={COMPASS_SIZE} height={COMPASS_SIZE} viewBox={`0 0 ${COMPASS_SIZE} ${COMPASS_SIZE}`}>
                        <Defs>
                            <SvgLinearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <Stop offset="0%" stopColor="#1b6d51" stopOpacity="1" />
                                <Stop offset="50%" stopColor="#2d8a6e" stopOpacity="1" />
                                <Stop offset="100%" stopColor="#1b6d51" stopOpacity="1" />
                            </SvgLinearGradient>
                        </Defs>

                        {/* Outer ring */}
                        <Circle
                            cx={COMPASS_RADIUS}
                            cy={COMPASS_RADIUS}
                            r={COMPASS_RADIUS - 8}
                            fill="none"
                            stroke="url(#ringGradient)"
                            strokeWidth="12"
                        />

                        {/* Inner dark circle */}
                        <Circle
                            cx={COMPASS_RADIUS}
                            cy={COMPASS_RADIUS}
                            r={COMPASS_RADIUS - 25}
                            fill="#0a1628"
                        />

                        {/* Degree marks */}
                        {Array.from({ length: 72 }).map((_, i) => {
                            const angle = (i * 5 * Math.PI) / 180;
                            const isMajor = i % 18 === 0;
                            const isMinor = i % 6 === 0;
                            const length = isMajor ? 15 : isMinor ? 10 : 5;
                            const startRadius = COMPASS_RADIUS - 25;
                            const endRadius = startRadius - length;

                            return (
                                <Line
                                    key={i}
                                    x1={COMPASS_RADIUS + startRadius * Math.sin(angle)}
                                    y1={COMPASS_RADIUS - startRadius * Math.cos(angle)}
                                    x2={COMPASS_RADIUS + endRadius * Math.sin(angle)}
                                    y2={COMPASS_RADIUS - endRadius * Math.cos(angle)}
                                    stroke={isMajor ? '#fff' : 'rgba(255,255,255,0.4)'}
                                    strokeWidth={isMajor ? 2 : 1}
                                />
                            );
                        })}

                        {/* Cardinal directions */}
                        <SvgText x={COMPASS_RADIUS} y={55} fill="#fff" fontSize="24" fontWeight="bold" textAnchor="middle">N</SvgText>
                        <SvgText x={COMPASS_SIZE - 45} y={COMPASS_RADIUS + 8} fill="#fff" fontSize="20" fontWeight="bold" textAnchor="middle">E</SvgText>
                        <SvgText x={COMPASS_RADIUS} y={COMPASS_SIZE - 40} fill="#fff" fontSize="20" fontWeight="bold" textAnchor="middle">S</SvgText>
                        <SvgText x={45} y={COMPASS_RADIUS + 8} fill="#fff" fontSize="20" fontWeight="bold" textAnchor="middle">W</SvgText>
                    </Svg>

                    {/* Qibla Direction Indicator */}
                    <View style={[
                        styles.qiblaIndicator,
                        { transform: [{ rotate: `${qiblaDirection}deg` }] }
                    ]}>
                        <View style={[styles.qiblaArrow, { transform: [{ rotate: '45deg' }] }]}>
                            <MaterialCommunityIcons name="navigation-variant" size={28} color="#c9a227" />
                        </View>
                    </View>

                    {/* Center Kaaba Icon */}
                    <View style={styles.centerIcon}>
                        <View style={styles.kaabaContainer}>
                            {/* Kaaba SVG - simplified but recognizable */}
                            <Svg width={60} height={65} viewBox="0 0 60 65">
                                {/* Shadow ellipse */}
                                <Ellipse cx={30} cy={62} rx={22} ry={3} fill="rgba(0,0,0,0.3)" />

                                {/* Main Kaaba body - black cube */}
                                <Rect x={8} y={15} width={44} height={45} fill="#1a1a1a" stroke="#333" strokeWidth={1} />

                                {/* Gold decorative band (Kiswah) */}
                                <Rect x={8} y={22} width={44} height={6} fill="#c9a227" />

                                {/* Arabic calligraphy lines on gold band */}
                                <Line x1={12} y1={25} x2={20} y2={25} stroke="#0a1628" strokeWidth={1} />
                                <Line x1={25} y1={25} x2={35} y2={25} stroke="#0a1628" strokeWidth={1} />
                                <Line x1={40} y1={25} x2={48} y2={25} stroke="#0a1628" strokeWidth={1} />

                                {/* Door (Multazam) */}
                                <Rect x={22} y={35} width={16} height={25} fill="#c9a227" rx={3} />
                                <Rect x={25} y={38} width={10} height={22} fill="#0a1628" rx={2} />

                                {/* Hajr Aswad (Black Stone) corner */}
                                <Circle cx={10} cy={57} r={4} fill="#c9a227" />
                                <Circle cx={10} cy={57} r={2} fill="#1a1a1a" />

                                {/* Top edge highlight */}
                                <Line x1={8} y1={15} x2={52} y2={15} stroke="#c9a227" strokeWidth={1} />
                            </Svg>
                        </View>
                    </View>
                </Animated.View>

                {/* Fixed pointer at top */}
                <View style={styles.fixedPointer}>
                    <MaterialCommunityIcons
                        name="menu-down"
                        size={36}
                        color={isPointingToQibla ? '#4CAF50' : '#c9a227'}
                    />
                </View>
            </View>

            {/* Direction Info */}
            <View style={styles.directionInfo}>
                <Text style={styles.directionTitle}>
                    Arah Kiblat: {Math.round(qiblaDirection)}° {getDirectionText(qiblaDirection)}
                </Text>
                <Text style={styles.distanceText}>
                    {getDistanceFromMakkah()} km dari Makkah
                </Text>
            </View>

            {/* Status */}
            {isPointingToQibla && (
                <View style={styles.statusBadge}>
                    <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
                    <Text style={styles.statusText}>Arah Kiblat Tepat!</Text>
                </View>
            )}

            <Text variant="bodySmall" style={styles.calibrationTip}>
                Tip: Gerakkan HP membentuk angka 8 untuk kalibrasi
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1628',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    accuracyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(13, 33, 55, 0.9)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    accuracyText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 14,
    },
    accuracyValue: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    signalBars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 8,
        height: 16,
    },
    signalBar: {
        width: 4,
        marginHorizontal: 1,
        borderRadius: 1,
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
    qiblaIndicator: {
        position: 'absolute',
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    qiblaArrow: {
        marginTop: 35,
    },
    centerIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    kaabaContainer: {
        backgroundColor: 'rgba(13, 33, 55, 0.9)',
        borderRadius: 40,
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(201, 162, 39, 0.5)',
    },
    fixedPointer: {
        position: 'absolute',
        top: -10,
    },
    directionInfo: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    directionTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    distanceText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        marginTop: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        marginBottom: 10,
    },
    statusText: {
        color: '#4CAF50',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    calibrationTip: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        paddingBottom: 30,
    },
});
