import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import tamaguiConfig from './tamagui.config';
import { initDatabase } from './src/services/database/dbInit';
import { registerBackgroundNotificationHandler } from './src/services/prayer/backgroundNotificationHandler';

// Custom theme for react-native-paper - Islamic Dark Theme
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#c9a227',
    primaryContainer: '#1a3a52',
    secondary: '#1b6d51',
    secondaryContainer: '#0d2137',
    surface: '#0d2137',
    background: '#0a1628',
    surfaceVariant: '#1a3a52',
    onSurface: '#ffffff',
    onSurfaceVariant: 'rgba(255,255,255,0.7)',
    outline: '#1a3a52',
    outlineVariant: 'rgba(201, 162, 39, 0.3)',
    error: '#cf6679',
  },
};

export default function App() {
  useEffect(() => {
    initDatabase().catch(err => console.error('DB Init Failed:', err));

    // Register background notification handler for adzan sound
    registerBackgroundNotificationHandler().catch(err =>
      console.warn('Background handler registration failed:', err)
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<View><Text>Loading...</Text></View>} persistor={persistor}>
        <PaperProvider theme={theme}>
          <TamaguiProvider config={tamaguiConfig as any}>
            <RootNavigator />
          </TamaguiProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
