import { useInfiniteQuery } from '@tanstack/react-query';
import { getAlbumTracks } from '../apis/trackApi';
import { GetAlbumTracksRequest } from '../models/playlist';

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

export const useGetAlbumTracks = ({
  id,
  market,
  accessToken,
  limit = 20,
}: GetAlbumTracksRequest & {accessToken : string | undefined}) =>
  useInfiniteQuery({
    queryKey: ['album-tracks', id, market, limit],
    enabled: !!accessToken && !!id,
    retry: false,
    staleTime: 1000 * 60 * 5,

    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      getAlbumTracks({
        id,
        market,
        limit,
        offset: pageParam,
        accessToken,
      }),

    getNextPageParam: (lastPage) => offsetFromNextUrl(lastPage.next),
  });