import { useInfiniteQuery } from '@tanstack/react-query';
import { browseCategories } from '../apis/searchApi';

const offsetFromNextUrl = (next?: string | null): number | undefined => {
  if (!next) return undefined;
  try {
    const url = new URL(next);
    const offset = url.searchParams.get('offset');
    return offset ? parseInt(offset, 10) : undefined;
  } catch {
    return undefined;
  }
};

export const useBrowseCategories = (
  accessToken: string | undefined,
  limit = 20,                
) =>
  useInfiniteQuery({
    queryKey: ['categories', limit, accessToken],
    enabled: !!accessToken,
    retry: false,
    staleTime: 1_000 * 60 * 5,

    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      browseCategories({ limit, offset: pageParam, accessToken }),

    getNextPageParam: (lastPage) =>
      offsetFromNextUrl(lastPage.categories.next),
  });
