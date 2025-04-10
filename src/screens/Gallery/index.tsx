import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Screen, Text} from '../../components/foundation';
import {useInfiniteQuery} from '../../services/queries/useInfiniteQuery';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {dataMock} from './mock';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const POSTER_WIDTH = width * 0.6;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;
const SPACING = 10;
const BACKDROP_HEIGHT = height * 0.2;

const movies = dataMock;

export const GalleryScreen = ({navigation}: {navigation: any}) => {
  const scrollX = useState(new Animated.Value(0))[0];

  // const {
  //   data,
  //   isLoading,
  //   isFetchingNextPage,
  //   loadMore,
  //   refetch,
  //   isError,
  //   error,
  // } = useInfiniteQuery({
  //   queryKey: ['nowPlayingMovies'],
  //   url: '/movie/now_playing',
  // });
  // console.log('🚀 ~ HomeScreen ~ data:', data);

  // const handleEndReached = useCallback(() => {
  //   if (!isFetchingNextPage) {
  //     loadMore();
  //   }
  // }, [isFetchingNextPage, loadMore]);

  // const renderFooter = useCallback(() => {
  //   if (!isFetchingNextPage) return null;
  //   return (
  //     <View style={styles.footerLoader}>
  //       {isFetchingNextPage && !isLoading ? (
  //         <ActivityIndicator size="small" />
  //       ) : null}
  //     </View>
  //   );
  // }, [isFetchingNextPage, isLoading]);

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

  const renderBackdrop = () => {
    return (
      <View style={styles.backdropContainer}>
        <FlatList
          data={movies}
          keyExtractor={item => item.id + '-backdrop'}
          removeClippedSubviews={false}
          contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
          renderItem={({item, index}) => {
            if (!item.backdrop_path) {
              return null;
            }

            const translateX = scrollX.interpolate({
              inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE],
              outputRange: [0, width],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={[
                  styles.backdropItem,
                  {
                    transform: [{translateX}],
                  },
                ]}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                  }}
                  style={styles.backdropImage}
                  blurRadius={2}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
                  style={styles.backdropGradient}
                />
              </Animated.View>
            );
          }}
        />
      </View>
    );
  };

  const renderMovieItem = ({item, index}: {item: any; index: number}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [50, 0, 50],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
        style={styles.movieItemContainer}>
        <Animated.View
          style={[
            styles.movieItem,
            {
              opacity,
              transform: [{translateY}],
            },
          ]}>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.poster}
          />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.movieMeta}>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {item.vote_average.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.releaseDate}>
                {new Date(item.release_date).getFullYear()}
              </Text>
            </View>
            <Text style={styles.overview} numberOfLines={3}>
              {item.overview}
            </Text>
            <View style={styles.genreContainer}>
              {item.genre_ids.slice(0, 2).map((genreId: number) => (
                <View key={genreId} style={styles.genrePill}>
                  <Text style={styles.genreText}>{getGenreName(genreId)}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const getGenreName = (genreId: number) => {
    const genres = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Sci-Fi',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    return genres[genreId as keyof typeof genres] || 'Genre';
  };

  return (
    <Screen contentContainerStyle={styles.container}>
      {renderBackdrop()}
      <Animated.FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.9}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={renderMovieItem}
      />
    </Screen>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 40,
    backgroundColor: '#121212',
  },
  backdropContainer: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
    overflow: 'hidden',
  },
  backdropItem: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
    overflow: 'hidden',
  },
  backdropImage: {
    width,
    height: BACKDROP_HEIGHT,
  },
  backdropGradient: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  flatListContent: {
    paddingHorizontal: (width - ITEM_SIZE) / 2,
    paddingTop: BACKDROP_HEIGHT - 50,
    paddingBottom: 80,
  },
  movieItemContainer: {
    width: ITEM_SIZE,
    paddingHorizontal: SPACING,
  },
  movieItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  poster: {
    width: '100%',
    height: POSTER_HEIGHT,
    resizeMode: 'cover',
  },
  movieInfo: {
    padding: SPACING * 2,
  },
  movieTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: '#AAA',
    fontSize: 14,
  },
  overview: {
    color: '#DDD',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genrePill: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  genreText: {
    color: '#FFD700',
    fontSize: 12,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
