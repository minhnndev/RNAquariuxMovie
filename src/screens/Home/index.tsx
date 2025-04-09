import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, ListView, Screen, Text} from '../../components/foundation';
import {useAppTheme} from '../../utils/useAppTheme';
import {useInfiniteNowPlayingMovies} from '../../hooks/movie';

export const HomeScreen = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteNowPlayingMovies();
  console.log('🚀 ~ HomeScreen ~ data:', data);
  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text size="xxl" weight="bold">
          Home
        </Text>
      </View>
      <Input placeholder="Search" />

      <ListView
        data={data?.pages.flatMap(page => page.results)}
        renderItem={({item}) => <Text>{item.title}</Text>}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
