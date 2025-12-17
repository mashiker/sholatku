import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import tamaguiConfig from './tamagui.config';
import { initDatabase } from './src/services/database/dbInit';
import { registerBackgroundNotificationHandler } from './src/services/prayer/backgroundNotificationHandler';
import { selectTheme } from './src/redux/slices/premiumSlice';
import { THEME_CONFIG, AppTheme } from './src/theme/themes';

// Function to create Paper theme from our theme config
const createPaperTheme = (themeKey: AppTheme) => {
  const themeColors = THEME_CONFIG[themeKey]?.colors || THEME_CONFIG.default.colors;

  // Determine if this is a light theme based on background color
  const isLightTheme = themeColors.background.startsWith('#e') ||
    themeColors.background.startsWith('#f') ||
    themeColors.textPrimary === '#333333';

  const baseTheme = isLightTheme ? MD3LightTheme : MD3DarkTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: themeColors.accent,
      primaryContainer: themeColors.primaryContainer,
      secondary: themeColors.secondary,
      secondaryContainer: themeColors.surface,
      surface: themeColors.surface,
      background: themeColors.background,
      surfaceVariant: themeColors.primaryContainer,
      onSurface: themeColors.textPrimary,
      onSurfaceVariant: themeColors.textSecondary,
      outline: themeColors.border,
      outlineVariant: `${themeColors.accent}4D`, // 30% opacity
      error: '#cf6679',
    },
    custom: themeColors,
  };
};

// Theme-aware inner component
const ThemedApp = () => {
  const selectedTheme = useSelector(selectTheme);
  const theme = createPaperTheme(selectedTheme);

  useEffect(() => {
    initDatabase().catch(err => console.error('DB Init Failed:', err));

    // Register background notification handler for adzan sound
    registerBackgroundNotificationHandler().catch(err =>
      console.warn('Background handler registration failed:', err)
    );
  }, []);

  return (
    <PaperProvider theme={theme}>
      <TamaguiProvider config={tamaguiConfig as any}>
        <RootNavigator />
      </TamaguiProvider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View><Text>Loading...</Text></View>} persistor={persistor}>
        <ThemedApp />
      </PersistGate>
    </Provider>
  );
}
