import {UseInfiniteQueryOptions} from '@tanstack/react-query';
import {MovieListResponse, TMDBParams} from '../../services/api/movie/type';

const createInfiniteQuery = <T>(
  queryKey: unknown[],
  fetchFn: (params: TMDBParams) => Promise<T>,
  params: TMDBParams = {},
  options?: Omit<UseInfiniteQueryOptions<T>, 'queryKey' | 'queryFn'>,
) => ({
  queryKey,
  queryFn: async ({pageParam = 1}: {pageParam?: number}): Promise<T> => {
    const data = await fetchFn({...params, page: pageParam});
    return data;
  },
  getNextPageParam: (lastPage: any) =>
    (lastPage as MovieListResponse).page <
    (lastPage as MovieListResponse).total_pages
      ? (lastPage as MovieListResponse).page + 1
      : undefined,
  initialPageParam: 1,
  ...options,
});

export {createInfiniteQuery};
