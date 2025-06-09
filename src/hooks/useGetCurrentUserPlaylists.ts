import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi"
import { GetCurrentUserPlaylistsRequest } from "../models/playlist"

export const useGetCurrentUserPlaylists = ({limit, offset}:GetCurrentUserPlaylistsRequest) => {
    return useQuery({
        queryKey: ['current-user-playlist'],
        queryFn: () => getCurrentUserPlaylists({limit, offset})
    })
} 