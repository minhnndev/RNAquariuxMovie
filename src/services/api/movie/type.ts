export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  budget: number;
  revenue: number;
  logo_path: string | null;
  runtime: number | null;
  tagline: string | null;
  genres: {
    id: number;
    name: string;
  }[];
  vote_count: number;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  genre_ids: number[];
}

export interface Pagination {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieListResponse extends Pagination {
  results: Movie[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Credit {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: Credit[];
  crew: Credit[];
}

export interface AccountDetails {
  id: number;
  name: string;
  username: string;
}

export interface TMDBParams {
  language?: string;
  page?: number;
  region?: string;
  [key: string]: any;
}
