import {
  keepPreviousData,
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery as useRQInfiniteQuery,
} from '@tanstack/react-query';

import {axiosInstance} from '../api';
import {useExplorerQuery} from './utils';

export type InfiniteResponseType = any & {
  pages?: Array<any>;
};

export const PER_PAGE = 20;

type UseInfiniteQueryParams = {
  queryKey: QueryKey;
  url: string;
  params?: Record<string, unknown>;
  limit?: number;
  options?: UseInfiniteQueryOptions<any, unknown, any, any, QueryKey>;
};

function useInfiniteQuery({
  queryKey,
  url,
  params,
  limit = PER_PAGE,
  options,
}: UseInfiniteQueryParams) {
  const query = useRQInfiniteQuery({
    queryKey,
    queryFn: async ({
      pageParam = 0,
    }: QueryFunctionContext<QueryKey, unknown>) => {
      const response = await axiosInstance.get(url, {
        params: {
          page: pageParam,
          limit,
          ...params,
        },
      });
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    retry: false,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: any) => {
      if (!lastPage) {
        return undefined;
      }
      const {page, total_pages} = lastPage;

      return page < total_pages ? page + 1 : undefined;
    },
    ...(options || {}),
  });

  const explorer = useExplorerQuery(query);
  return explorer;
}

export {useInfiniteQuery};
