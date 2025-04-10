import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {
  MovieListResponse,
  MovieDetails,
  CreditsResponse,
  AccountDetails,
  TMDBParams,
} from '../../services/api/movie/type';

import tmdbClient from '../../services/api/movie';
import {useInfiniteQuery} from '@/services/queries/useInfiniteQuery';

export const useNowPlayingMovies = (params: TMDBParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['nowPlayingMovies', params],
    url: '/movie/now_playing',
    params,
  });
};

export const usePopularMovies = (params: TMDBParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['popularMovies', params],
    url: '/movie/popular',
    params,
  });
};

export const useUpcomingMovies = (params: TMDBParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['upcomingMovies', params],
    url: '/movie/upcoming',
    params,
  });
};

// Regular query hooks
export const useMovieDetails = (
  movieId: number | undefined,
  params: TMDBParams = {},
  options?: Omit<UseQueryOptions<MovieDetails>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MovieDetails>({
    queryKey: ['movieDetails', movieId, params],
    queryFn: async () => {
      if (!movieId) throw new Error('Movie ID is required');
      const data = await tmdbClient.getMovieDetails(movieId, params);
      return data;
    },
    enabled: !!movieId,
    ...options,
  });
};

export const useMovieCredits = (
  movieId: number | undefined,
  params: TMDBParams = {},
  options?: Omit<UseQueryOptions<CreditsResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<CreditsResponse>({
    queryKey: ['movieCredits', movieId, params],
    queryFn: async () => {
      if (!movieId) throw new Error('Movie ID is required');
      const data = await tmdbClient.getMovieCredits(movieId, params);
      return data;
    },
    enabled: !!movieId,
    ...options,
  });
};

export const useAccountDetails = (
  accountId: number | undefined,
  sessionId: string | undefined,
  params: TMDBParams = {},
  options?: Omit<UseQueryOptions<AccountDetails>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<AccountDetails>({
    queryKey: ['accountDetails', accountId, params],
    queryFn: async () => {
      if (!accountId || !sessionId) {
        throw new Error('Account ID and session ID are required');
      }
      const data = await tmdbClient.getAccountDetails(
        accountId,
        sessionId,
        params,
      );
      return data;
    },
    enabled: !!accountId && !!sessionId,
    ...options,
  });
};

export const useMovieRecommendations = (
  movieId: number | undefined,
  params: TMDBParams = {},
  options?: Omit<UseQueryOptions<MovieListResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<MovieListResponse>({
    queryKey: ['movieRecommendations', movieId, params],
    queryFn: async () => {
      if (!movieId) throw new Error('Movie ID is required');
      const data = await tmdbClient.getMovieRecommendations(movieId, params);
      return data;
    },
    enabled: !!movieId,
    ...options,
  });
};

export const useMovieRecommendationsInfinite = (
  movieId: number | undefined,
  params: TMDBParams = {},
) => {
  const query = useInfiniteQuery({
    queryKey: ['movieRecommendationsInfinite', movieId, params],
    url: `/movie/${movieId ?? 0}/recommendations`,
    params,
  });

  if (!movieId) {
    return {
      ...query,
      data: [],
      hasNextPage: false,
    };
  }

  return query;
};
