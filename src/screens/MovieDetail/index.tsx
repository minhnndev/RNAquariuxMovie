import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@/components/foundation';

export const MovieDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MovieDetail</Text>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
