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
                    <Text variant="headlineMedium" style={styles.timeUpText}>
                        Waktunya!
                    </Text>
                </View>
            );
        }

        // Format time as HH:MM display (like the design shows 13:17)
        const formattedTime = `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}`;

        return (
            <View style={styles.compactContainer}>
                <Text style={styles.largeTime}>{formattedTime}</Text>
            </View>
        );
    }

    // Full version (original)
    const timeString = timeLeft.isTime
        ? 'Waktunya Sholat'
        : `-${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`;

    return (
        <View style={styles.container}>
            <Text variant="labelMedium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Menuju {prayerName}
            </Text>
            <Text variant="displayMedium" style={{ fontWeight: 'bold', color: '#c9a227' }}>
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
    largeTime: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 2,
    },
    timeUpText: {
        color: '#c9a227',
        fontWeight: 'bold',
    },
});

