import {axiosInstance} from '..';

import {
  MovieListResponse,
  MovieDetails,
  CreditsResponse,
  AccountDetails,
  TMDBParams,
} from './type';

export const tmdbClient = {
  getNowPlayingMovies: async (
    params: TMDBParams = {},
  ): Promise<MovieListResponse> => {
    const response = await axiosInstance.get<MovieListResponse>(
      '/movie/now_playing',
      {params},
    );
    return response.data;
  },

  getPopularMovies: async (
    params: TMDBParams = {},
  ): Promise<MovieListResponse> => {
    const response = await axiosInstance.get<MovieListResponse>(
      '/movie/popular',
      {params},
    );
    return response.data;
  },

  getUpcomingMovies: async (
    params: TMDBParams = {},
  ): Promise<MovieListResponse> => {
    const response = await axiosInstance.get<MovieListResponse>(
      '/movie/upcoming',
      {params},
    );
    return response.data;
  },

  getMovieDetails: async (
    movieId: number,
    params: TMDBParams = {},
  ): Promise<MovieDetails> => {
    const response = await axiosInstance.get<MovieDetails>(
      `/movie/${movieId}`,
      {params},
    );
    return response.data;
  },

  getMovieCredits: async (
    movieId: number,
    params: TMDBParams = {},
  ): Promise<CreditsResponse> => {
    const response = await axiosInstance.get<CreditsResponse>(
      `/movie/${movieId}/credits`,
      {params},
    );
    return response.data;
  },

  getAccountDetails: async (
    accountId: number,
    sessionId: string,
    params: TMDBParams = {},
  ): Promise<AccountDetails> => {
    const response = await axiosInstance.get<AccountDetails>(
      `/account/${accountId}`,
      {
        params: {...params, session_id: sessionId},
      },
    );
    return response.data;
  },

  getMovieRecommendations: async (
    movieId: number,
    params: TMDBParams = {},
  ): Promise<MovieListResponse> => {
    const response = await axiosInstance.get<MovieListResponse>(
      `/movie/${movieId}/recommendations`,
      {params},
    );
    return response.data;
  },
};

export default tmdbClient;
