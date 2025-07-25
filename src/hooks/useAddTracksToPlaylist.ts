import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddTracksToPlaylistRequest } from "../models/playlist"
import { addPlaylist } from "../apis/playlistApi";

export const useAddTracksToPlaylist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (params: AddTracksToPlaylistRequest) => {
            return addPlaylist(params);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlist-items'] });
            queryClient.invalidateQueries({ queryKey: ['playlist-detail'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserPlaylists'] });
        },
        onError: (error) => {
            console.error('Failed to add track to playlist:', error);
        }
    });
};