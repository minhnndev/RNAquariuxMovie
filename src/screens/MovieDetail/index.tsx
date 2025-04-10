import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from '../../components/foundation';
import {useHeader} from '@/utils/useHeader';
import {useMovieDetails} from '@/hooks/movie';
import {useNavigation, useRoute} from '@react-navigation/native';

export const MovieDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {id} = route.params as {id: number};
  useHeader({
    title: 'Movie Detail',
    leftIcon: 'chevron-back',
    onLeftPress: () => {
      navigation.goBack();
    },
  });

  const {data, isLoading, error} = useMovieDetails(id);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>MovieDetail</Text>
      <Text>{id}</Text>
      <Text>{data?.title}</Text>
      <Text>{data?.overview}</Text>
      <Text>{data?.release_date}</Text>
      <Text>{data?.vote_average}</Text>
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
