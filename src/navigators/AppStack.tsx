import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppTheme} from '../utils/useAppTheme';

import * as Screens from '@/screens';

const Stack = createNativeStackNavigator();

const AppStack = () => {
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

export default AppStack;
