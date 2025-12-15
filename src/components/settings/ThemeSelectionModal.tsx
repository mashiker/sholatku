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

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant="titleLarge" style={styles.title}>Pilih Tema</Text>
                    <IconButton icon="close" onPress={onDismiss} />
                </View>

                <ScrollView style={styles.content}>
                    {(Object.keys(THEME_CONFIG) as AppTheme[]).map((key) => {
                        const theme = THEME_CONFIG[key];
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
                                    end={{ x: 1, y: 0 }}
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
                                                <MaterialCommunityIcons name="crown" size={12} color="#FFD700" />
                                                <Text style={styles.premiumText}>Premium</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.themeDesc}>{theme.name}</Text>
                                </View>

                                {isSelected && (
                                    <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                                )}
                                {isLocked && (
                                    <MaterialCommunityIcons name="lock" size={24} color="#999" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
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
    themeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    themeCardSelected: {
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    themePreview: {
        width: 60,
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
        fontSize: 15,
    },
    themeDesc: {
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
});
