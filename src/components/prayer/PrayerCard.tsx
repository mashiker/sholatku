import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { PrayerType } from '@/types';

interface PrayerCardProps {
    name: string;
    time: string;
    type: PrayerType;
    status: 'passed' | 'next' | 'pending';
    checked?: boolean;
    onCheckIn?: () => void;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
    name,
    time,
    status,
    checked,
    onCheckIn
}) => {
    const theme = useTheme();

    const getBackgroundColor = () => {
        switch (status) {
            case 'next': return theme.colors.primaryContainer;
            case 'passed': return theme.colors.surfaceVariant;
            default: return theme.colors.surface;
        }
    };

    const getIcon = () => {
        if (checked) return 'check-circle';
        if (status === 'passed') return 'clock-outline';
        if (status === 'next') return 'bell-ring';
        return 'clock-outline';
    };

    return (
        <Card style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
            <Card.Content style={styles.content}>
                <View style={styles.left}>
                    <Text variant="titleMedium" style={{ fontWeight: status === 'next' ? 'bold' : 'normal' }}>
                        {name}
                    </Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                        {time}
                    </Text>
                </View>
                <IconButton
                    icon={getIcon()}
                    iconColor={status === 'next' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                    size={24}
                    onPress={onCheckIn}
                    disabled={status === 'pending'}
                />
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 8,
        marginHorizontal: 16,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    left: {
        flexDirection: 'column',
    }
});
