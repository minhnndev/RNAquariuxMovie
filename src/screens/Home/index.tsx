import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  ListView,
  Screen,
  Text,
  Button,
} from '../../components/foundation';
import {useInfiniteQuery} from '../../services/queries/useInfiniteQuery';
import {get} from 'lodash';
import {IMAGE_TMDB_URL} from '@/utils/constants/APIConstants';
import {axiosInstance} from '@/services/api';
import {dataMock} from './mock';

export const HomeScreen = ({navigation}) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    loadMore,
    refetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['nowPlayingMovies'],
    url: '/movie/now_playing',
  });
  console.log('🚀 ~ HomeScreen ~ data:', data);

  // const handleEndReached = useCallback(() => {
  //   if (!isFetchingNextPage) {
  //     loadMore();
  //   }
  // }, [isFetchingNextPage, loadMore]);

  // const renderFooter = useCallback(() => {
  //   if (!isFetchingNextPage) return null;
  //   return (
  //     <View style={styles.footerLoader}>
  //       <ActivityIndicator size="small" />
  //     </View>
  //   );
  // }, [isFetchingNextPage]);

  // if (isLoading && data.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Image
  //         source={{
  //           uri: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
  //         }}
  //         resizeMode="contain"
  //         style={{width: 100, height: 100, borderRadius: 16}}
  //       />
  //       <ActivityIndicator size="large" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (isError) {
  //   const errorMessage = get(error, 'message', '');
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={{color: 'red'}}>{errorMessage || 'Error Unknown'}</Text>
  //       <Button text="Retry" onPress={() => refetch()} />
  //     </View>
  //   );
  // }

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
        style={styles.item}>
        <Image
          source={{uri: `${IMAGE_TMDB_URL}/${item.poster_path}`}}
          style={{width: 60, height: 60, borderRadius: 16}}
        />
        <View style={{flex: 1}}>
          <Text size="md" style={{fontWeight: 'bold'}}>
            {item.title}
          </Text>
          <Text size="sm" numberOfLines={2}>
            {item.overview}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        data={dataMock}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        // onEndReached={handleEndReached}
        estimatedItemSize={200}
        // ListFooterComponent={renderFooter}
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
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
