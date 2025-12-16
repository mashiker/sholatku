import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Modal, Portal, IconButton, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsPremium, selectTheme, setTheme, AppTheme } from '@/redux/slices/premiumSlice';
import { THEME_CONFIG } from '@/theme/themes';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    visible: boolean;
    onDismiss: () => void;
    onUpgrade: () => void;
}

export const ThemeSelectionModal: React.FC<Props> = ({ visible, onDismiss, onUpgrade }) => {
    const dispatch = useDispatch();
    const isPremium = useSelector(selectIsPremium);
    const currentTheme = useSelector(selectTheme);

    const handleSelect = (themeKey: AppTheme) => {
        const theme = THEME_CONFIG[themeKey];
        if (theme.isPremium && !isPremium) {
            onUpgrade();
            return;
        }
        dispatch(setTheme(themeKey));
        onDismiss();
    };

    // Order themes: default first, then new premium dark themes, then legacy themes
    const themeOrder: AppTheme[] = [
        'default',
        'royal_purple',
        'desert_sand',
        'ocean_night',
        'rose_garden',
        'emerald_palace',
        'midnight',
        'classic',
        'ocean',
        'forest',
        'gold',
    ];

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant="titleLarge" style={styles.title}>Pilih Tema</Text>
                    <IconButton icon="close" iconColor="#fff" onPress={onDismiss} />
                </View>

                <Text style={styles.subtitle}>
                    {isPremium ? '✨ Akses ke semua tema premium' : '👑 Upgrade untuk membuka semua tema'}
                </Text>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {themeOrder.map((key) => {
                        const theme = THEME_CONFIG[key];
                        if (!theme) return null;
                        const isSelected = currentTheme === key;
                        const isLocked = theme.isPremium && !isPremium;

                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => handleSelect(key)}
                                style={[
                                    styles.themeCard,
                                    isSelected && styles.themeCardSelected,
                                ]}
                            >
                                <LinearGradient
                                    colors={theme.colors.headerGradient}
                                    style={styles.themePreview}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={[styles.previewSurface, { backgroundColor: theme.colors.surface }]}>
                                        <View style={[styles.previewAccent, { backgroundColor: theme.colors.accent }]} />
                                    </View>
                                </LinearGradient>

                                <View style={styles.themeInfo}>
                                    <View style={styles.themeNameRow}>
                                        <Text style={styles.themeName}>{theme.nameId}</Text>
                                        {isLocked && (
                                            <View style={styles.premiumBadge}>
                                                <MaterialCommunityIcons name="crown" size={10} color="#FFD700" />
                                            </View>
                                        )}
                                        {!theme.isPremium && (
                                            <View style={styles.freeBadge}>
                                                <Text style={styles.freeText}>Gratis</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.themeDesc} numberOfLines={1}>
                                        {theme.description || theme.name}
                                    </Text>
                                </View>

                                {isSelected && (
                                    <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                                )}
                                {isLocked && (
                                    <MaterialCommunityIcons name="lock" size={20} color="#666" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#0d2137',
        margin: 16,
        borderRadius: 16,
        maxHeight: '85%',
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
        color: '#fff',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    content: {
        padding: 16,
        paddingTop: 8,
    },
    themeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    themeCardSelected: {
        borderWidth: 2,
        borderColor: '#c9a227',
        backgroundColor: 'rgba(201, 162, 39, 0.1)',
    },
    themePreview: {
        width: 56,
        height: 40,
        borderRadius: 8,
        padding: 4,
        justifyContent: 'flex-end',
    },
    previewSurface: {
        flex: 1,
        borderRadius: 4,
        padding: 4,
        justifyContent: 'flex-end',
    },
    previewAccent: {
        width: 16,
        height: 4,
        borderRadius: 2,
    },
    themeInfo: {
        flex: 1,
        marginLeft: 12,
    },
    themeNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeName: {
        fontWeight: '600',
        fontSize: 14,
        color: '#fff',
    },
    themeDesc: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        marginTop: 2,
    },
    premiumBadge: {
        marginLeft: 6,
    },
    freeBadge: {
        backgroundColor: '#1b6d51',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 8,
        marginLeft: 6,
    },
    freeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
    },
});

