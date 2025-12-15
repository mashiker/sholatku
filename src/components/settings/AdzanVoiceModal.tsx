import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Modal, Portal, IconButton, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsPremium, selectAdzanVoice, setAdzanVoice, AdzanVoice } from '@/redux/slices/premiumSlice';
import { ADZAN_VOICES } from '@/theme/themes';

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onUpgrade: () => void;
}

export const AdzanVoiceModal: React.FC<Props> = ({ visible, onDismiss, onUpgrade }) => {
    const dispatch = useDispatch();
    const isPremium = useSelector(selectIsPremium);
    const currentVoice = useSelector(selectAdzanVoice);

    const handleSelect = (voiceKey: AdzanVoice) => {
        const voice = ADZAN_VOICES[voiceKey];
        if (voice.isPremium && !isPremium) {
            onUpgrade();
            return;
        }
        dispatch(setAdzanVoice(voiceKey));
        onDismiss();
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant="titleLarge" style={styles.title}>Pilih Suara Adzan</Text>
                    <IconButton icon="close" onPress={onDismiss} />
                </View>

                <ScrollView style={styles.content}>
                    {(Object.keys(ADZAN_VOICES) as AdzanVoice[]).map((key) => {
                        const voice = ADZAN_VOICES[key];
                        const isSelected = currentVoice === key;
                        const isLocked = voice.isPremium && !isPremium;

                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => handleSelect(key)}
                                style={[
                                    styles.voiceCard,
                                    isSelected && styles.voiceCardSelected,
                                ]}
                            >
                                <View style={[styles.voiceIcon, isLocked && styles.voiceIconLocked]}>
                                    <MaterialCommunityIcons
                                        name="volume-high"
                                        size={24}
                                        color={isLocked ? '#999' : '#1a237e'}
                                    />
                                </View>

                                <View style={styles.voiceInfo}>
                                    <View style={styles.voiceNameRow}>
                                        <Text style={styles.voiceName}>{voice.nameId}</Text>
                                        {voice.isPremium && (
                                            <View style={styles.premiumBadge}>
                                                <MaterialCommunityIcons name="crown" size={12} color="#FFD700" />
                                                <Text style={styles.premiumText}>Premium</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.voiceDesc}>{voice.description}</Text>
                                </View>

                                {isSelected && (
                                    <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                                )}
                                {isLocked && !isSelected && (
                                    <MaterialCommunityIcons name="lock" size={24} color="#999" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        💡 Suara premium akan dimainkan saat waktu sholat tiba
                    </Text>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 16,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    title: {
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    voiceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    voiceCardSelected: {
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    voiceIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#e8eaf6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    voiceIconLocked: {
        backgroundColor: '#f0f0f0',
    },
    voiceInfo: {
        flex: 1,
        marginLeft: 12,
    },
    voiceNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    voiceName: {
        fontWeight: '600',
        fontSize: 14,
    },
    voiceDesc: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a237e',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    premiumText: {
        color: '#FFD700',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    footerText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
    },
});
