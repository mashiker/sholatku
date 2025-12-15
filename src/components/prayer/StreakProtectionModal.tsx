import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Modal, Portal, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectIsPremium,
    selectRemainingProtections,
    useStreakProtection
} from '@/redux/slices/premiumSlice';

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onUpgrade: () => void;
    onProtectionUsed: () => void;
    currentStreak: number;
}

export const StreakProtectionModal: React.FC<Props> = ({
    visible,
    onDismiss,
    onUpgrade,
    onProtectionUsed,
    currentStreak
}) => {
    const dispatch = useDispatch();
    const isPremium = useSelector(selectIsPremium);
    const remainingProtections = useSelector(selectRemainingProtections);

    const handleUseProtection = () => {
        if (!isPremium) {
            onUpgrade();
            return;
        }

        if (remainingProtections > 0) {
            dispatch(useStreakProtection());
            onProtectionUsed();
            onDismiss();
        }
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <IconButton icon="close" onPress={onDismiss} style={styles.closeBtn} />
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="shield-check" size={64} color="#1a237e" />
                    </View>

                    <Text variant="headlineSmall" style={styles.title}>
                        Lindungi Streak Anda!
                    </Text>

                    <View style={styles.streakInfo}>
                        <MaterialCommunityIcons name="fire" size={32} color="#FF5722" />
                        <Text style={styles.streakNumber}>{currentStreak}</Text>
                        <Text style={styles.streakLabel}>hari berturut-turut</Text>
                    </View>

                    <Text style={styles.description}>
                        Anda melewatkan sholat, tapi streak Anda bisa dilindungi!
                        Gunakan Streak Protection untuk menjaga momentum ibadah Anda.
                    </Text>

                    {isPremium ? (
                        <View style={styles.protectionInfo}>
                            <MaterialCommunityIcons name="shield" size={20} color="#4CAF50" />
                            <Text style={styles.protectionText}>
                                Sisa perlindungan bulan ini: {remainingProtections}/3
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.premiumPromo}>
                            <MaterialCommunityIcons name="crown" size={24} color="#FFD700" />
                            <Text style={styles.premiumPromoText}>
                                Fitur Premium - 3x perlindungan per bulan
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.actions}>
                    {isPremium && remainingProtections > 0 ? (
                        <Button
                            mode="contained"
                            onPress={handleUseProtection}
                            style={styles.primaryBtn}
                            icon="shield-check"
                        >
                            Gunakan Perlindungan
                        </Button>
                    ) : isPremium ? (
                        <Button
                            mode="outlined"
                            onPress={onDismiss}
                            style={styles.secondaryBtn}
                        >
                            Perlindungan Habis
                        </Button>
                    ) : (
                        <Button
                            mode="contained"
                            onPress={onUpgrade}
                            style={styles.upgradeBtn}
                            buttonColor="#FFD700"
                            textColor="#000"
                            icon="crown"
                        >
                            Upgrade ke Premium
                        </Button>
                    )}

                    <Button
                        mode="text"
                        onPress={onDismiss}
                        style={styles.skipBtn}
                    >
                        Biarkan Streak Reset
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        margin: 24,
        borderRadius: 20,
        overflow: 'hidden',
    },
    header: {
        alignItems: 'flex-end',
        padding: 8,
    },
    closeBtn: {
        margin: 0,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e8eaf6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a237e',
    },
    streakInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        padding: 12,
        backgroundColor: '#fff3e0',
        borderRadius: 12,
    },
    streakNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF5722',
        marginLeft: 8,
    },
    streakLabel: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    description: {
        textAlign: 'center',
        color: '#666',
        lineHeight: 22,
        marginBottom: 16,
    },
    protectionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#e8f5e9',
        borderRadius: 8,
    },
    protectionText: {
        marginLeft: 8,
        color: '#2e7d32',
        fontWeight: '500',
    },
    premiumPromo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#1a237e',
        borderRadius: 8,
    },
    premiumPromoText: {
        marginLeft: 8,
        color: '#fff',
        fontWeight: '500',
    },
    actions: {
        padding: 16,
        gap: 8,
    },
    primaryBtn: {
        borderRadius: 12,
    },
    secondaryBtn: {
        borderRadius: 12,
    },
    upgradeBtn: {
        borderRadius: 12,
    },
    skipBtn: {
        marginTop: 4,
    },
});
