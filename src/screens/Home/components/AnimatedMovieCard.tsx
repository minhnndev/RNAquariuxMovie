import {Movie} from '@/services/api/movie/type';
import {getGenreName} from '@/utils/moviesUtils';
import React from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Icon} from '@/components/foundation/Icon';

const AnimatedMovieCard = ({
  item,
  index,
  onPress,
}: {
  item: Movie;
  index: number;
  onPress: () => void;
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <Animated.View
      style={[
        styles.movieCard,
        {transform: [{translateY}], opacity: animatedValue},
      ]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{flex: 1, flexDirection: 'row'}}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.ratingContainer}>
              <Icon type="Ionicons" name="star" size={14} color="#FFD700" />
              <Text style={styles.metaText}>
                {item.vote_average.toFixed(1)}
              </Text>
            </View>

            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>
              {item.release_date.substring(0, 4)}
            </Text>
          </View>

          <Text style={styles.movieOverview} numberOfLines={2}>
            {item.overview}
          </Text>

          <View style={styles.genreContainer}>
            {item.genre_ids
              .slice(0, 3)
              .map((genreId: number, idx: React.Key) => (
                <View key={`${genreId}-${idx}`} style={styles.genrePill}>
                  <Text style={styles.genreText}>{getGenreName(genreId)}</Text>
                </View>
              ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedMovieCard;

const styles = StyleSheet.create({
  movieCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  movieInfo: {
    flex: 1,
    padding: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  movieOverview: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    lineHeight: 18,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genrePill: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  genreText: {
    fontSize: 10,
    color: '#555',
    fontWeight: '500',
  },
});
