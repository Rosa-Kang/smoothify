import { GetPlaylistResponse, GetCurrentUserPlaylistsRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistRequest, GetPlaylistItemsResponse, CreatePlaylistRequest, AddTracksToPlaylistRequest, AddTracksToPlaylistResponse, RemoveTracksFromPlaylistRequest, RemoveTracksFromPlaylistResponse } from "../models/playlist"
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

export const createPlaylist = async(user_id:string, params:CreatePlaylistRequest):Promise<GetPlaylistResponse> => {
    const { name, playlistPublic, collaborative, description } = params
    try {
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlistPublic,
            collaborative,
            description
        })  
        return response.data
    } catch (error) {
        throw new Error(`Failed to create Playlist`)
    }
}

export const addPlaylist = async(params: AddTracksToPlaylistRequest): Promise<AddTracksToPlaylistResponse> => {
    const { playlist_id, uris, position } = params;
    
    try {
        const response = await api.post(`/playlists/${playlist_id}/tracks`, {
            uris,
            ...(position !== undefined && { position })
        });
        
        return response.data;
    } catch (error) {
        throw new Error(`Failed to add tracks to playlist: ${error}`);
    }
}

export const removeTracksFromPlaylist = async(params: RemoveTracksFromPlaylistRequest): Promise<RemoveTracksFromPlaylistResponse> => {
    const { playlist_id, tracks, snapshot_id } = params;
    
    try {
        const response = await api.delete(`/playlists/${playlist_id}/tracks`, {
            data: {
                tracks,
                ...(snapshot_id && { snapshot_id })
            }
        });
        
        return response.data;
    } catch (error) {
        throw new Error(`Failed to remove tracks from playlist: ${error}`);
    }
};