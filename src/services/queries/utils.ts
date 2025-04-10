import {UseInfiniteQueryResult} from '@tanstack/react-query';
import {useCallback, useMemo} from 'react';

export type InfiniteResponseType = any & {
  pages?: Array<any>;
};

export function useExplorerQuery(
  query: UseInfiniteQueryResult<InfiniteResponseType, unknown>,
) {
  const data = useMemo(
    () => query.data?.pages?.flatMap((d: any) => d.results ?? []) ?? [],
    [query.data],
  );
  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage.call(undefined);
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

  return {...query, data, loadMore};
}
