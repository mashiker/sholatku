import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Portal, Modal, Text, RadioButton, useTheme, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrayerNotificationMode, PrayerKey } from '@/redux/slices/settingsSlice';

interface NotificationSettingsModalProps {
    visible: boolean;
    onDismiss: () => void;
    prayerName: string;
    prayerKey: PrayerKey;
    currentMode: PrayerNotificationMode;
    onModeChange: (prayer: PrayerKey, mode: PrayerNotificationMode) => void;
}

const NOTIFICATION_OPTIONS: { mode: PrayerNotificationMode; label: string; icon: string; description: string }[] = [
    {
        mode: 'alarm',
        label: 'Suara alarm',
        icon: 'bell-ring',
        description: 'Putar adzan lengkap',
    },
    {
        mode: 'notification',
        label: 'Suara notifikasi',
        icon: 'bell',
        description: 'Bunyi notifikasi standar',
    },
    {
        mode: 'silent',
        label: 'Tanpa suara (hanya notif)',
        icon: 'bell-off-outline',
        description: 'Tampilkan notifikasi tanpa suara',
    },
    {
        mode: 'disabled',
        label: 'Nonaktifkan',
        icon: 'bell-cancel',
        description: 'Tidak ada notifikasi',
    },
];

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
    visible,
    onDismiss,
    prayerName,
    prayerKey,
    currentMode,
    onModeChange,
}) => {
    const theme = useTheme();

    const handleSelect = (mode: PrayerNotificationMode) => {
        onModeChange(prayerKey, mode);
        onDismiss();
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.header}>
                    <MaterialCommunityIcons name="bell" size={24} color="#1a237e" />
                    <Text variant="titleMedium" style={styles.headerTitle}>
                        Atur Notifikasi {prayerName}
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {NOTIFICATION_OPTIONS.map((option) => (
                        <TouchableOpacity
                            key={option.mode}
                            style={[
                                styles.optionRow,
                                currentMode === option.mode && styles.optionRowSelected,
                            ]}
                            onPress={() => handleSelect(option.mode)}
                            activeOpacity={0.7}
                        >
                            <RadioButton
                                value={option.mode}
                                status={currentMode === option.mode ? 'checked' : 'unchecked'}
                                onPress={() => handleSelect(option.mode)}
                                color="#1a237e"
                            />
                            <MaterialCommunityIcons
                                name={option.icon as any}
                                size={22}
                                color={currentMode === option.mode ? '#1a237e' : '#666'}
                                style={styles.optionIcon}
                            />
                            <View style={styles.optionTextContainer}>
                                <Text style={[
                                    styles.optionLabel,
                                    currentMode === option.mode && styles.optionLabelSelected,
                                ]}>
                                    {option.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
                    <Text style={styles.cancelText}>BATAL</Text>
                </TouchableOpacity>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    headerTitle: {
        marginLeft: 12,
        fontWeight: '600',
        color: '#1a237e',
    },
    optionsContainer: {
        marginBottom: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginVertical: 2,
    },
    optionRowSelected: {
        backgroundColor: '#e8eaf6',
    },
    optionIcon: {
        marginLeft: 4,
        marginRight: 12,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionLabel: {
        fontSize: 16,
        color: '#333',
    },
    optionLabelSelected: {
        color: '#1a237e',
        fontWeight: '600',
    },
    cancelButton: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    cancelText: {
        color: '#1a237e',
        fontWeight: '600',
        fontSize: 14,
    },
});
