import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@/components/foundation';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
