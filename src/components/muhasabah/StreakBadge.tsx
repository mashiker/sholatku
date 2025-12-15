import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    streak: number;
}

export const StreakBadge: React.FC<Props> = ({ streak }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="fire" size={24} color="#FFD700" />
            <Text style={styles.text}>{streak} Hari</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 4,
    },
});
