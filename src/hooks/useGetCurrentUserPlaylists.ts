import { useInfiniteQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi"

export const useGetCurrentUserPlaylists = (limit: number, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ['currentUserPlaylists', limit],
    queryFn: ({ pageParam = 0 }) => getCurrentUserPlaylists({
      limit,
      offset: pageParam
    }),
    initialPageParam: 0, 
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('offset')) || undefined;
    },
    enabled: options?.enabled !== false && !!localStorage.getItem("access_token"),
    retry: false
  });
};