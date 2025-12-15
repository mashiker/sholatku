import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, ProgressBar as PaperProgressBar, Text } from 'react-native-paper';

interface ProgressBarProps {
    completed: number; // 0-5
    total?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total = 5 }) => {
    const theme = useTheme();
    const progress = Math.min(Math.max(completed / total, 0), 1);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text variant="labelMedium">Progress Harian</Text>
                <Text variant="labelMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                    {completed}/{total}
                </Text>
            </View>
            <PaperProgressBar
                progress={progress}
                color={theme.colors.primary}
                style={styles.bar}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    bar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
    }
});
