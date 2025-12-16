import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export type AppTheme = 'default' | 'royal_purple' | 'desert_sand' | 'ocean_night' | 'rose_garden' | 'emerald_palace' | 'classic' | 'midnight' | 'ocean' | 'forest' | 'gold';

export interface ThemeColors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    secondary: string;
    background: string;
    surface: string;
    headerGradient: [string, string];
    accent: string;
    // Extended colors for Islamic theme
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    gold: string;
    greenHighlight: string;
    border: string;
}

export const THEME_CONFIG: Record<AppTheme, { name: string; nameId: string; colors: ThemeColors; isPremium: boolean; description?: string }> = {
    // ========== FREE THEME ==========
    default: {
        name: 'Islamic Dark',
        nameId: 'Islami Gelap',
        description: 'Tema default dengan nuansa teal gelap dan aksen emas',
        isPremium: false,
        colors: {
            primary: '#0d2137',
            onPrimary: '#ffffff',
            primaryContainer: '#1a3a52',
            secondary: '#1b6d51',
            background: '#0a1628',
            surface: '#0d2137',
            headerGradient: ['#0a1628', '#0d2137'],
            accent: '#c9a227',
            cardBackground: '#0d2137',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#c9a227',
            greenHighlight: '#1b6d51',
            border: '#1a3a52',
        }
    },

    // ========== PREMIUM DARK THEMES ==========
    royal_purple: {
        name: 'Royal Purple',
        nameId: 'Ungu Kerajaan',
        description: 'Nuansa ungu elegan dengan aksen perak',
        isPremium: true,
        colors: {
            primary: '#1a1025',
            onPrimary: '#ffffff',
            primaryContainer: '#2d1f3d',
            secondary: '#6b3fa0',
            background: '#0f0a15',
            surface: '#1a1025',
            headerGradient: ['#0f0a15', '#1a1025'],
            accent: '#b388ff',
            cardBackground: '#1a1025',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#b388ff',
            greenHighlight: '#7c4dff',
            border: '#2d1f3d',
        }
    },
    desert_sand: {
        name: 'Desert Sand',
        nameId: 'Pasir Gurun',
        description: 'Nuansa hangat gurun dengan aksen amber',
        isPremium: true,
        colors: {
            primary: '#2a1f14',
            onPrimary: '#ffffff',
            primaryContainer: '#3d2e1f',
            secondary: '#8b5a2b',
            background: '#1a140d',
            surface: '#2a1f14',
            headerGradient: ['#1a140d', '#2a1f14'],
            accent: '#ffb74d',
            cardBackground: '#2a1f14',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#ffb74d',
            greenHighlight: '#d4a373',
            border: '#3d2e1f',
        }
    },
    ocean_night: {
        name: 'Ocean Night',
        nameId: 'Malam Samudera',
        description: 'Biru laut dalam dengan aksen teal',
        isPremium: true,
        colors: {
            primary: '#0a1929',
            onPrimary: '#ffffff',
            primaryContainer: '#132f4c',
            secondary: '#0288d1',
            background: '#051218',
            surface: '#0a1929',
            headerGradient: ['#051218', '#0a1929'],
            accent: '#4fc3f7',
            cardBackground: '#0a1929',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#4fc3f7',
            greenHighlight: '#00acc1',
            border: '#132f4c',
        }
    },
    rose_garden: {
        name: 'Rose Garden',
        nameId: 'Taman Mawar',
        description: 'Nuansa rose lembut dengan aksen pink',
        isPremium: true,
        colors: {
            primary: '#2a1520',
            onPrimary: '#ffffff',
            primaryContainer: '#3d2030',
            secondary: '#c2185b',
            background: '#1a0d14',
            surface: '#2a1520',
            headerGradient: ['#1a0d14', '#2a1520'],
            accent: '#f48fb1',
            cardBackground: '#2a1520',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#f48fb1',
            greenHighlight: '#e91e63',
            border: '#3d2030',
        }
    },
    emerald_palace: {
        name: 'Emerald Palace',
        nameId: 'Istana Zamrud',
        description: 'Hijau zamrud mewah dengan aksen emas',
        isPremium: true,
        colors: {
            primary: '#0a2618',
            onPrimary: '#ffffff',
            primaryContainer: '#143d28',
            secondary: '#2e7d32',
            background: '#051a0f',
            surface: '#0a2618',
            headerGradient: ['#051a0f', '#0a2618'],
            accent: '#ffd54f',
            cardBackground: '#0a2618',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#ffd54f',
            greenHighlight: '#4caf50',
            border: '#143d28',
        }
    },

    // ========== LEGACY PREMIUM THEMES ==========
    classic: {
        name: 'Classic Blue',
        nameId: 'Biru Klasik',
        description: 'Tema terang klasik dengan nuansa biru',
        isPremium: true,
        colors: {
            primary: '#1a237e',
            onPrimary: '#ffffff',
            primaryContainer: '#e8eaf6',
            secondary: '#0d47a1',
            background: '#f5f5f5',
            surface: '#ffffff',
            headerGradient: ['#1a237e', '#0d47a1'],
            accent: '#FFC107',
            cardBackground: '#ffffff',
            textPrimary: '#333333',
            textSecondary: '#666666',
            gold: '#FFC107',
            greenHighlight: '#4CAF50',
            border: '#e0e0e0',
        }
    },
    midnight: {
        name: 'Midnight',
        nameId: 'Tengah Malam',
        description: 'Gelap dengan aksen merah muda',
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
            cardBackground: '#1a1a2e',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.7)',
            gold: '#e94560',
            greenHighlight: '#4CAF50',
            border: '#16213e',
        }
    },
    ocean: {
        name: 'Ocean Light',
        nameId: 'Samudra Terang',
        description: 'Tema terang dengan nuansa cyan',
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
            cardBackground: '#ffffff',
            textPrimary: '#333333',
            textSecondary: '#666666',
            gold: '#00bcd4',
            greenHighlight: '#00838f',
            border: '#b2ebf2',
        }
    },
    forest: {
        name: 'Forest Light',
        nameId: 'Hutan Terang',
        description: 'Tema terang dengan nuansa hijau hutan',
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
            cardBackground: '#ffffff',
            textPrimary: '#333333',
            textSecondary: '#666666',
            gold: '#4caf50',
            greenHighlight: '#2e7d32',
            border: '#c8e6c9',
        }
    },
    gold: {
        name: 'Gold Light',
        nameId: 'Emas Terang',
        description: 'Tema terang dengan nuansa cokelat emas',
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
            cardBackground: '#ffffff',
            textPrimary: '#333333',
            textSecondary: '#666666',
            gold: '#ffc107',
            greenHighlight: '#795548',
            border: '#d7ccc8',
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
