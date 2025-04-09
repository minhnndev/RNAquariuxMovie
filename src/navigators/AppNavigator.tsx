import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppTheme, useThemeProvider} from '@/utils/useAppTheme';

import * as Screens from '@/screens';

const Stack = createNativeStackNavigator();

const AppOutlet = () => {
  const {
    theme: {colors},
  } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen name="Home" component={Screens.HomeScreen} />
      <Stack.Screen name="MovieDetail" component={Screens.MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export function AppNavigator() {
  const {themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider} =
    useThemeProvider();

  return (
    <ThemeProvider value={{themeScheme, setThemeContextOverride}}>
      <NavigationContainer theme={navigationTheme}>
        <AppOutlet />
      </NavigationContainer>
    </ThemeProvider>
  );
}
