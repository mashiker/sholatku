import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export const CompassCircle = () => {
    const theme = useTheme();

    return (
        <View style={[styles.container, { borderColor: theme.colors.outline }]}>
            <Text style={[styles.marker, styles.north, { color: theme.colors.primary }]}>N</Text>
            <Text style={[styles.marker, styles.east, { color: theme.colors.onSurface }]}>E</Text>
            <Text style={[styles.marker, styles.south, { color: theme.colors.onSurface }]}>S</Text>
            <Text style={[styles.marker, styles.west, { color: theme.colors.onSurface }]}>W</Text>

            {/* Degree ticks could be added here with SVG or Views */}
            <View style={[styles.tick, styles.tickN, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.tick, styles.tickE, { backgroundColor: theme.colors.onSurfaceVariant }]} />
            <View style={[styles.tick, styles.tickS, { backgroundColor: theme.colors.onSurfaceVariant }]} />
            <View style={[styles.tick, styles.tickW, { backgroundColor: theme.colors.onSurfaceVariant }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    marker: {
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 18,
    },
    north: { top: 10 },
    east: { right: 10 },
    south: { bottom: 10 },
    west: { left: 10 },
    tick: {
        position: 'absolute',
        width: 4,
        height: 10,
    },
    tickN: { top: 0 },
    tickE: { right: 0, width: 10, height: 4 },
    tickS: { bottom: 0 },
    tickW: { left: 0, width: 10, height: 4 },
});
