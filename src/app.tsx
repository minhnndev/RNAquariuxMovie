import './utils/gestureHandler';
import {initI18n} from './i18n';
import './utils/ignoreWarnings';
import React, {useEffect} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ErrorBoundary} from './screens/ErrorScreen/ErrorBoundary';

import {KeyboardProvider} from 'react-native-keyboard-controller';
import {AppNavigator} from './navigators';
import {loadDateFnsLocale} from './utils/formatDate';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

export function App() {
  useEffect(() => {
    initI18n().then(() => loadDateFnsLocale());
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary>
        <KeyboardProvider>
          <AppNavigator />
        </KeyboardProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
