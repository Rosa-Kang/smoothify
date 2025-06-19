import { useQuery } from '@tanstack/react-query';
import { fetchArtistInfo } from '../apis/albumApi';

export const useGetArtistInfo = ({ id, accessToken }: { id?: string; accessToken?: string }) =>
  useQuery({
    queryKey: ['artist-info', id],
    enabled: !!id && !!accessToken,
    queryFn: () => fetchArtistInfo({ id: id!, accessToken: accessToken! }),
    staleTime: 1000 * 60 * 5,
  });