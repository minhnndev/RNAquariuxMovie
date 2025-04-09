import {QueryClient} from '@tanstack/react-query';

const CACHE_TIME = 5 * 60 * 1000;
const STALE_TIME = 5 * 60 * 1000;
const RETRY = false;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: RETRY,
      staleTime: STALE_TIME,
      gcTime: CACHE_TIME,
    },
    mutations: {
      retry: RETRY,
    },
  },
});
