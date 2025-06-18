import { useQuery } from '@tanstack/react-query';
import { getArtistsTracks } from '../apis/trackApi';
import { GetArtistsTracksRequest } from '../models/playlist';

  export const useGetArtistsTrack = (
  { id, market = 'CA', accessToken }: GetArtistsTracksRequest & { accessToken?: string },
) =>
  useQuery({
    queryKey: ['artist-tracks', id, market],
    enabled: !!accessToken && !!id,  
    retry: false,
    staleTime: 1000 * 60 * 5,
    queryFn: () => getArtistsTracks({ id, market, accessToken }),
    select: (data) => data.tracks,    
  });
