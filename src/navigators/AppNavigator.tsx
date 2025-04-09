import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useThemeProvider} from '@/utils/useAppTheme';
import AppStack from './AppStack';

export function Outlet() {
  const {themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider} =
    useThemeProvider();
  return (
    <ThemeProvider value={{themeScheme, setThemeContextOverride}}>
      <NavigationContainer theme={navigationTheme}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
