import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface TasbihCounterProps {
    count: number;
    target?: number;
    name: string;
    onIncrement: () => void;
    onReset: () => void;
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

export const TasbihCounter: React.FC<TasbihCounterProps> = ({
    count, target, name, onIncrement, onReset
}) => {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (count > 0) {
            Animated.sequence([
                Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }),
                Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
            ]).start();
        }
    }, [count]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onIncrement}
                style={styles.touchable}
                testID="tasbih-touch-area"
            >
                <Animated.View style={[
                    styles.circle,
                    {
                        transform: [{ scale: scaleAnim }],
                        backgroundColor: theme.colors.primary,
                        shadowColor: theme.colors.shadow,
                    }
                ]}>
                    <Text variant="displayLarge" style={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}>
                        {count}
                    </Text>
                    {target && (
                        <Text variant="titleMedium" style={{ color: theme.colors.onPrimary }}>
                            Target: {target}
                        </Text>
                    )}
                    <Text variant="labelLarge" style={{ color: theme.colors.onPrimary, marginTop: 10 }}>
                        {name}
                    </Text>
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
                <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                    Reset Counter
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    touchable: {},
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    resetBtn: {
        marginTop: 30,
        padding: 10,
    }
});
