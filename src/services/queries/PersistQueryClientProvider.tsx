import * as React from 'react';

import {PersistQueryClientOptions} from '@tanstack/react-query-persist-client';
import {
  QueryClientProvider,
  QueryClientProviderProps,
  IsRestoringProvider,
  useIsRestoring,
} from '@tanstack/react-query';

export type PersistQueryClientProviderProps = QueryClientProviderProps & {
  persistOptions?: Omit<PersistQueryClientOptions, 'queryClient'>;
  onSuccess?: () => void;
};

export const PersistQueryClientProvider = ({
  client,
  children,
  ...props
}: PersistQueryClientProviderProps): JSX.Element => {
  const isRestoring = useIsRestoring();
  return (
    <QueryClientProvider client={client} {...props}>
      <IsRestoringProvider value={isRestoring}>{children}</IsRestoringProvider>
    </QueryClientProvider>
  );
};
