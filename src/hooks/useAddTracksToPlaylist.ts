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
            // Invalidate playlist queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: ['playlist-items'] });
            queryClient.invalidateQueries({ queryKey: ['playlist-detail'] });
        },
        onError: (error) => {
            console.error('Failed to add track to playlist:', error);
        }
    });
};