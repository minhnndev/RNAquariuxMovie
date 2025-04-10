import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatedMovieCard from './components/AnimatedMovieCard';
import {Movie} from '@/services/api/movie/type';
import {useInfiniteQuery} from '@/services/queries/useInfiniteQuery';
import {MenuView, MenuComponentRef} from '@react-native-menu/menu';

import {storage} from '@/utils/storage';
import {Button, Icon, Input, Text} from '@/components/foundation';
import {get} from 'lodash';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const menuSortRef = useRef<MenuComponentRef>(null);
  const menuCategoryRef = useRef<MenuComponentRef>(null);

  const [selectedCategory, setSelectedCategory] = useState('nowPlaying');
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const nowPlayingQuery = useInfiniteQuery({
    queryKey: ['nowPlayingMovies'],
    url: '/movie/now_playing',
    params: {
      sort_by: selectedSort,
      query: isSearching ? searchKeyword : undefined,
    },
    enabled: selectedCategory === 'nowPlaying',
  });

  const upcomingQuery = useInfiniteQuery({
    queryKey: ['upcomingMovies'],
    url: '/movie/upcoming',
    params: {
      sort_by: selectedSort,
      query: isSearching ? searchKeyword : undefined,
    },
    enabled: selectedCategory === 'upcoming',
  });

  const popularQuery = useInfiniteQuery({
    queryKey: ['popularMovies'],
    url: '/movie/popular',
    params: {
      sort_by: selectedSort,
      query: isSearching ? searchKeyword : undefined,
    },
    enabled: selectedCategory === 'popular',
  });

  const activeQuery =
    selectedCategory === 'nowPlaying'
      ? nowPlayingQuery
      : selectedCategory === 'upcoming'
      ? upcomingQuery
      : popularQuery;

  const handleSearch = () => {
    setIsSearching(true);
    activeQuery.refetch();
  };

  const categories = [
    {label: 'Now Playing', value: 'nowPlaying'},
    {label: 'Upcoming', value: 'upcoming'},
    {label: 'Popular', value: 'popular'},
  ];

  const sortOptions = [
    {label: 'Popularity', value: 'popularity.desc'},
    {label: 'Alphabetical (A-Z)', value: 'original_title.asc'},
    {label: 'Alphabetical (Z-A)', value: 'original_title.desc'},
    {label: 'Rating (High to Low)', value: 'vote_average.desc'},
    {label: 'Rating (Low to High)', value: 'vote_average.asc'},
    {label: 'Release Date (Newest)', value: 'release_date.desc'},
    {label: 'Release Date (Oldest)', value: 'release_date.asc'},
  ];

  useEffect(() => {
    const loadPreferences = () => {
      try {
        const savedCategory = storage.getString('movieCategory');
        const savedSortBy = storage.getString('movieSortBy');

        if (savedCategory) setSelectedCategory(savedCategory);
        if (savedSortBy) setSelectedSort(savedSortBy);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIsSearching(false);
    try {
      storage.set('movieCategory', value);
    } catch (error) {
      console.error('Error saving category preference:', error);
    }
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    try {
      storage.set('movieSortBy', value);
    } catch (error) {
      console.error('Error saving sort preference:', error);
    }
  };

  const {data, isLoading, isError, error, refetch} = activeQuery;

  const handleEndReached = useCallback(() => {
    if (!activeQuery.isFetchingNextPage) {
      activeQuery.loadMore();
    }
  }, [activeQuery]);

  const renderFooter = useCallback(() => {
    if (!activeQuery.isFetchingNextPage) return null;
    return (
      <View>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [activeQuery.isFetchingNextPage]);

  if (isLoading && data.length === 0) {
    return (
      <View style={styles.centered}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
          }}
          resizeMode="contain"
          style={{width: 100, height: 100, borderRadius: 16}}
        />
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    const errorMessage = get(error, 'message', '');
    return (
      <View style={styles.centered}>
        <Text style={{color: 'red'}}>{errorMessage || 'Error Unknown'}</Text>
        <Button text="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  const renderItem = ({item, index}: {item: Movie; index: number}) => (
    <AnimatedMovieCard
      item={item}
      index={index}
      onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginHorizontal: 16,
          paddingTop: 12,
          gap: 12,
        }}>
        <Input
          placeholder="Search movies..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            backgroundColor: '#f0f0f0',
          }}>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <MenuView
          ref={menuCategoryRef}
          onPressAction={({nativeEvent}) => {
            handleCategoryChange(nativeEvent.event);
          }}
          actions={categories.map(i => ({
            id: i.value,
            title: i.label,
          }))}
          shouldOpenOnLongPress={false}>
          <View>
            <Text>
              Category:{' '}
              <Text style={{fontWeight: 'bold'}}>
                {categories.find(i => i.value === selectedCategory)?.label}
              </Text>
            </Text>
          </View>
        </MenuView>
        <MenuView
          ref={menuSortRef}
          title="Menu Title"
          onPressAction={({nativeEvent}) => {
            handleSortChange(nativeEvent.event);
          }}
          actions={sortOptions.map(i => ({
            id: i.value,
            title: i.label,
          }))}
          shouldOpenOnLongPress={false}>
          <View>
            <Text>
              Sort by:{' '}
              <Text style={{fontWeight: 'bold'}}>
                {sortOptions.find(i => i.value === selectedSort)?.label}
              </Text>
            </Text>
          </View>
        </MenuView>
      </View>

      <FlatList
        data={activeQuery.data || []}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
