import {axiosInstance} from '../api';

const makeRequest = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.get(url, {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};

const TmdbClient = {
  // Get now playing movies
  getNowPlayingMovies: (params = {}) =>
    makeRequest('/movie/now_playing', params),

  // Get popular movies
  getPopularMovies: (params = {}) => makeRequest('/movie/popular', params),

  // Get upcoming movies
  getUpcomingMovies: (params = {}) => makeRequest('/movie/upcoming', params),

  // Get movie details
  getMovieDetails: (movieId: string, params = {}) =>
    makeRequest(`/movie/${movieId}`, params),

  // Get movie credits
  getMovieCredits: (movieId: string, params = {}) =>
    makeRequest(`/movie/${movieId}/credits`, params),

  // Get account details (requires session_id or access_token)
  getAccountDetails: (accountId: string, sessionId: string, params = {}) =>
    makeRequest(`/account/${accountId}`, {...params, session_id: sessionId}),

  // [Optional] Get movie recommendations
  getMovieRecommendations: (movieId: string, params = {}) =>
    makeRequest(`/movie/${movieId}/recommendations`, params),
};

export default TmdbClient;
