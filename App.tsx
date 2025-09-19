import { DevSettings, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStackNavigator from './src/navigation/AppStackNavigator.tsx';
import useIsDarkMode from './src/hooks/useIsDarkMode.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store.ts';
import { StreamIOProvider } from './src/stream/context.tsx';
import { OverlayProvider, SqliteClient } from 'stream-chat-react-native';
import React from 'react';
import ChatAuth from './src/stream/ChatAuth.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (__DEV__) {
  DevSettings.addMenuItem('Reset local DB (offline storage)', () => {
    SqliteClient.resetDB();
    console.info('Local DB reset');
  });
}

function App() {
  const isDarkMode = useIsDarkMode();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StreamIOProvider>
          <OverlayProvider>
            <ChatAuth>
              <AppStackNavigator />
            </ChatAuth>
          </OverlayProvider>
        </StreamIOProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
