import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text, View } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import tamaguiConfig from './tamagui.config';
import { initDatabase } from './src/services/database/dbInit';
import { registerBackgroundNotificationHandler } from './src/services/prayer/backgroundNotificationHandler';

// Custom theme for react-native-paper
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1a237e',
    primaryContainer: '#E8EAF6',
    secondary: '#3949ab',
    secondaryContainer: '#C5CAE9',
    surface: '#ffffff',
    background: '#f5f5f5',
    error: '#B00020',
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
