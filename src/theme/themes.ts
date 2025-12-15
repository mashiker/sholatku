import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export type AppTheme = 'default' | 'midnight' | 'ocean' | 'forest' | 'gold';

export interface ThemeColors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    secondary: string;
    background: string;
    surface: string;
    headerGradient: [string, string];
    accent: string;
}

export const THEME_CONFIG: Record<AppTheme, { name: string; nameId: string; colors: ThemeColors; isPremium: boolean }> = {
    default: {
        name: 'Default Blue',
        nameId: 'Biru Default',
        isPremium: false,
        colors: {
            primary: '#1a237e',
            onPrimary: '#ffffff',
            primaryContainer: '#e8eaf6',
            secondary: '#0d47a1',
            background: '#f5f5f5',
            surface: '#ffffff',
            headerGradient: ['#1a237e', '#0d47a1'],
            accent: '#FFC107',
        }
    },
    midnight: {
        name: 'Midnight',
        nameId: 'Tengah Malam',
        isPremium: true,
        colors: {
            primary: '#1a1a2e',
            onPrimary: '#ffffff',
            primaryContainer: '#16213e',
            secondary: '#0f3460',
            background: '#0f0f23',
            surface: '#1a1a2e',
            headerGradient: ['#0f0f23', '#1a1a2e'],
            accent: '#e94560',
        }
    },
    ocean: {
        name: 'Ocean',
        nameId: 'Samudra',
        isPremium: true,
        colors: {
            primary: '#006064',
            onPrimary: '#ffffff',
            primaryContainer: '#b2ebf2',
            secondary: '#00838f',
            background: '#e0f7fa',
            surface: '#ffffff',
            headerGradient: ['#006064', '#00838f'],
            accent: '#00bcd4',
        }
    },
    forest: {
        name: 'Forest',
        nameId: 'Hutan',
        isPremium: true,
        colors: {
            primary: '#1b5e20',
            onPrimary: '#ffffff',
            primaryContainer: '#c8e6c9',
            secondary: '#2e7d32',
            background: '#e8f5e9',
            surface: '#ffffff',
            headerGradient: ['#1b5e20', '#2e7d32'],
            accent: '#4caf50',
        }
    },
    gold: {
        name: 'Gold',
        nameId: 'Emas',
        isPremium: true,
        colors: {
            primary: '#5d4037',
            onPrimary: '#ffffff',
            primaryContainer: '#d7ccc8',
            secondary: '#795548',
            background: '#efebe9',
            surface: '#ffffff',
            headerGradient: ['#5d4037', '#795548'],
            accent: '#ffc107',
        }
    },
};

export const createTheme = (themeKey: AppTheme, isDark: boolean = false) => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
    const themeColors = THEME_CONFIG[themeKey].colors;

    return {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: themeColors.primary,
            onPrimary: themeColors.onPrimary,
            primaryContainer: themeColors.primaryContainer,
            secondary: themeColors.secondary,
            background: themeColors.background,
            surface: themeColors.surface,
        },
        custom: themeColors,
    };
};

export const ADZAN_VOICES = {
    default: {
        name: 'Default',
        nameId: 'Suara Default',
        description: 'Suara adzan standar',
        isPremium: false,
        subuhFile: 'adzan_subuh.mp3',
        otherFile: 'adzan_other.mp3',
    },
    mecca: {
        name: 'Mecca',
        nameId: 'Masjidil Haram (Mekah)',
        description: 'Suara adzan dari Masjidil Haram',
        isPremium: true,
        subuhFile: 'adzan_mecca_subuh.mp3',
        otherFile: 'adzan_mecca.mp3',
    },
    medina: {
        name: 'Medina',
        nameId: 'Masjid Nabawi (Madinah)',
        description: 'Suara adzan dari Masjid Nabawi',
        isPremium: true,
        subuhFile: 'adzan_medina_subuh.mp3',
        otherFile: 'adzan_medina.mp3',
    },
    mishary: {
        name: 'Mishary Rashid',
        nameId: 'Mishary Rashid Al-Afasy',
        description: 'Muadzin terkenal dari Kuwait',
        isPremium: true,
        subuhFile: 'adzan_mishary_subuh.mp3',
        otherFile: 'adzan_mishary.mp3',
    },
    abdul_basit: {
        name: 'Abdul Basit',
        nameId: 'Abdul Basit Abdul Samad',
        description: 'Qari legendaris dari Mesir',
        isPremium: true,
        subuhFile: 'adzan_abdul_basit_subuh.mp3',
        otherFile: 'adzan_abdul_basit.mp3',
    },
};
