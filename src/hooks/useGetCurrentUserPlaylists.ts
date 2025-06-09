import { useInfiniteQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi"
import { GetCurrentUserPlaylistsRequest } from "../models/playlist"

export const useGetCurrentUserPlaylists = ({limit, offset}:GetCurrentUserPlaylistsRequest) => {
    const token = localStorage.getItem('access_token');
    
    return useInfiniteQuery({
        queryKey: ['current-user-playlist', limit],
        queryFn: ({ pageParam = 0 }) =>  getCurrentUserPlaylists({limit, offset : pageParam}),
        enabled: !!token,
        initialPageParam: 0,
        getNextPageParam : ( lastPage ) => {
            if(lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset): undefined
            }
            return undefined
        }
    })
} 