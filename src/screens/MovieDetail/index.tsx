import {useHeader} from '@/utils/useHeader';
import {useMovieDetails} from '@/hooks/movie';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from '@/components/foundation/Icon';

export const MovieDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params as {id: number};

  useHeader({
    title: 'Movie Detail',
    leftIcon: 'arrow-back',
    onLeftPress: () => navigation.goBack(),
  });

  const {data: movie, isLoading, isError, error} = useMovieDetails(id);

  const [isFavorite, setIsFavorite] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideUpAnim = useState(new Animated.Value(30))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim, slideUpAnim]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatCurrency = (num: number) => {
    return '$' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{color: 'red'}}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backdropContainer}>
        <Animated.Image
          source={{
            uri: `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`,
          }}
          style={[styles.backdrop, {opacity: fadeAnim}]}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,1)']}
          style={styles.gradient}
        />
      </View>

      <Animated.View
        style={[
          styles.posterContainer,
          {
            transform: [{translateY: slideUpAnim}, {scale: scaleAnim}],
          },
        ]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}>
          <Icon
            type="Ionicons"
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={28}
            color={isFavorite ? '#e74c3c' : '#fff'}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.detailsContainer, {opacity: fadeAnim}]}>
        <Text style={styles.title}>{movie?.title}</Text>
        <Text style={styles.tagline}>{movie?.tagline}</Text>

        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Icon type="Ionicons" name="star" size={16} color="#FFD700" />
            <Text style={styles.metaText}>
              {movie?.vote_average.toFixed(1)} ({movie?.vote_count} votes)
            </Text>
          </View>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{movie?.runtime} mins</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{movie?.release_date}</Text>
        </View>

        <View style={styles.genresContainer}>
          {movie?.genres.map(genre => (
            <View key={genre.id} style={styles.genrePill}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie?.overview}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {movie?.budget !== undefined ? formatCurrency(movie.budget) : '-'}
            </Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {movie?.revenue !== undefined
                ? formatCurrency(movie.revenue)
                : '-'}
            </Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Production</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productionScroll}>
          {movie?.production_companies.map(company => (
            <View key={company.id} style={styles.companyContainer}>
              {company.logo_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${company.logo_path}`,
                  }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.companyName}>{company.name}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    height: '100%',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  posterContainer: {
    position: 'absolute',
    top: 180,
    left: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    marginTop: 120,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  genrePill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 16,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  productionScroll: {
    marginBottom: 30,
  },
  companyContainer: {
    width: 100,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  companyLogo: {
    width: '100%',
    height: '100%',
  },
  companyName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});
