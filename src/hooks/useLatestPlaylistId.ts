import { useGetCurrentUserPlaylists } from './useGetCurrentUserPlaylists';

export const useLatestPlaylistId = () => {
  const userToken = localStorage.getItem('access_token'); 
  const { data } = useGetCurrentUserPlaylists(1, { enabled: !!userToken });

  return data?.pages?.[0]?.items?.[0]?.id as string | undefined;
};
