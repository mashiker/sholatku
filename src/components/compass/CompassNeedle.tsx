import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

interface CompassNeedleProps {
    heading: number;
    qiblaDirection: number;
}

export const CompassNeedle: React.FC<CompassNeedleProps> = ({ heading, qiblaDirection }) => {
    const theme = useTheme();

    // Rotate the entire compass visualization opposite to heading to simulate "North is fixed"
    // OR rotate the needle to point North relative to fixed phone
    // Standard approach: Visual compass card rotates opposite to heading.

    // Let's rotate the NEEDLE to point North (0 deg).
    // If phone heads 90 deg (East), North is at -90 deg.
    // needleRotation = -heading

    // Qibla Indicator:
    // If Qibla is 295 deg (NW).
    // It should appear at 295 relative to North.
    // So relative to phone heading: 295 - heading.

    return (
        <View style={[styles.container, { transform: [{ rotate: `${-heading}deg` }] }]}>
            {/* North Indicator (Needle) */}
            <View style={styles.needleContainer}>
                <View style={[styles.needleHalf, styles.north, { backgroundColor: theme.colors.error }]} />
                <View style={[styles.needleHalf, styles.south, { backgroundColor: theme.colors.onSurfaceVariant }]} />
            </View>

            {/* Qibla Indicator */}
            {/* Positioned on the circle at qiblaDirection */}
            <View style={[styles.qiblaContainer, { transform: [{ rotate: `${qiblaDirection}deg` }] }]}>
                <View style={[styles.qiblaMarker, { backgroundColor: theme.colors.primary }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    needleContainer: {
        width: 10,
        height: 200,
        position: 'absolute',
        alignItems: 'center',
    },
    needleHalf: {
        width: 10,
        height: 100,
    },
    north: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    south: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    qiblaContainer: {
        width: 4,
        height: 250, // Match container diameter to place marker at edge
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start', // Top of circle
    },
    qiblaMarker: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginTop: 5,
    },
});
