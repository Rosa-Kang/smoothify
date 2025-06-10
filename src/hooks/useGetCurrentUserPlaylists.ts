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
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.length * limit;
      return currentOffset < lastPage.total ? currentOffset : undefined;
    },
    enabled: options?.enabled !== false && !!localStorage.getItem("access_token"),
    retry: false
  });
};