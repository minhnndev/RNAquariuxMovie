import './utils/gestureHandler';
import './utils/ignoreWarnings';
import {initI18n} from './i18n';
import React, {useEffect} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ErrorBoundary} from './screens/ErrorScreen/ErrorBoundary';

import {KeyboardProvider} from 'react-native-keyboard-controller';
import {Outlet} from './navigators';
import {loadDateFnsLocale} from './utils/formatDate';

import {queryClient} from './services/queries/queryClient';
import {PersistQueryClientProvider} from './services/queries/PersistQueryClientProvider';

export function App() {
  useEffect(() => {
    initI18n().then(() => loadDateFnsLocale());
  }, []);

  return (
    <PersistQueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary>
          <KeyboardProvider>
            <Outlet />
          </KeyboardProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}
