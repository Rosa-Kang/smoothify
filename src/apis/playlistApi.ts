import { GetPlaylistResponse, GetCurrentUserPlaylistsRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistRequest, GetPlaylistItemsResponse } from "../models/playlist"
import { api } from "../utils/api"

export const getCurrentUserPlaylists = async({
    limit, offset
}: GetCurrentUserPlaylistsRequest):Promise<GetCurrentUserPlaylistsResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: {limit, offset}
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch current user playlist..`)
    }
}

export const getPlaylist = async (params: GetPlaylistRequest):Promise<GetPlaylistResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params
        })
        return response.data;
    } catch (error) {
        throw new Error(`Fetch Playlist has been failed..`)
    }
}

export const getPlaylistItems = async(params: GetPlaylistItemsRequest):Promise<GetPlaylistItemsResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
            params
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch Playlist Items..`)
    }
}