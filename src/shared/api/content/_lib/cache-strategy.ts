import { QueryClient } from "@tanstack/react-query";

export interface CacheStrategy {
  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T>;
}

export class DummyCacheStrategy implements CacheStrategy {
  fetch<T>(_: unknown[], getData: () => Promise<T>): Promise<T> {
    return getData();
  }
}

export class ReactQueryCacheStrategy implements CacheStrategy {
  private timer: any;
  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    }),
  ) {
    this.timer = setInterval(
      () => {
        queryClient.refetchQueries();
      },
      60 * 60 * 1000, //1hour
    );
  }

  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    return this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: getData,
    });
  }

  stopRefetching() {
    clearInterval(this.timer);
  }
}
