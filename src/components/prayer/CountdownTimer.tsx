import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { differenceInSeconds, parse, addDays } from 'date-fns';

interface CountdownTimerProps {
    targetTime: string; // HH:mm
    prayerName: string;
    compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime, prayerName, compact = false }) => {
    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isTime: false });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let target = parse(targetTime, 'HH:mm', now);

            if (target < now) {
                target = addDays(target, 1);
            }

            const diff = differenceInSeconds(target, now);

            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isTime: true });
                return;
            }

            setTimeLeft({
                hours: Math.floor(diff / 3600),
                minutes: Math.floor((diff % 3600) / 60),
                seconds: diff % 60,
                isTime: false,
            });
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    if (compact) {
        if (timeLeft.isTime) {
            return (
                <View style={styles.compactContainer}>
                    <Text variant="titleLarge" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                        Waktunya!
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.compactContainer}>
                <View style={styles.compactRow}>
                    <View style={styles.compactUnit}>
                        <Text style={styles.compactNumber}>{timeLeft.hours.toString().padStart(2, '0')}</Text>
                        <Text style={styles.compactLabel}>Jam</Text>
                    </View>
                    <Text style={styles.compactSeparator}>:</Text>
                    <View style={styles.compactUnit}>
                        <Text style={styles.compactNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</Text>
                        <Text style={styles.compactLabel}>Menit</Text>
                    </View>
                    <Text style={styles.compactSeparator}>:</Text>
                    <View style={styles.compactUnit}>
                        <Text style={styles.compactNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</Text>
                        <Text style={styles.compactLabel}>Detik</Text>
                    </View>
                </View>
            </View>
        );
    }

    // Full version (original)
    const timeString = timeLeft.isTime
        ? 'Waktunya Sholat'
        : `-${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;

    return (
        <View style={styles.container}>
            <Text variant="labelMedium" style={{ color: theme.colors.onPrimaryContainer }}>
                Menuju {prayerName}
            </Text>
            <Text variant="displayMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                {timeString}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    compactContainer: {
        alignItems: 'center',
    },
    compactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    compactUnit: {
        alignItems: 'center',
        minWidth: 40,
    },
    compactNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    compactLabel: {
        fontSize: 10,
        color: '#666',
    },
    compactSeparator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
        marginHorizontal: 4,
    },
});
