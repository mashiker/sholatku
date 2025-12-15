import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ currentStreak, longestStreak }) => {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (currentStreak > 0) {
            Animated.sequence([
                Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }),
                Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
            ]).start();
        }
    }, [currentStreak]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.streakContainer, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.emoji}>🔥</Text>
                <View>
                    <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                        {currentStreak} Hari
                    </Text>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        Streak Saat Ini
                    </Text>
                </View>
            </Animated.View>

            <View style={styles.recordContainer}>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Rekor Terbaik: {longestStreak} Hari 🏆
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 16,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    emoji: {
        fontSize: 40,
    },
    recordContainer: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
    }
});
