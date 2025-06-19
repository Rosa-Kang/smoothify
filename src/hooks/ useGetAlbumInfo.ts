import { useQuery } from "@tanstack/react-query";
import { fetchAlbumInfo } from "../apis/albumApi";

export const useGetAlbumInfo = ({ id, accessToken }: { id?: string; accessToken?: string }) =>
  useQuery({
    queryKey: ['album-info', id],
    enabled: !!id && !!accessToken,
    queryFn: () => fetchAlbumInfo({ id: id!, accessToken: accessToken! }), 
    staleTime: 1000 * 60 * 5,
  });