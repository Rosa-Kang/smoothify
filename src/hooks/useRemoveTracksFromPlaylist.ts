import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RemoveTracksFromPlaylistRequest } from "../models/playlist"
import { removeTracksFromPlaylist } from "../apis/playlistApi";

export const useRemoveTracksFromPlaylist = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (params: RemoveTracksFromPlaylistRequest) => {
            return removeTracksFromPlaylist(params);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlist-items'] });
            queryClient.invalidateQueries({ queryKey: ['playlist-detail'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserPlaylists'] });
        },
        onError: (error) => {
            console.error('Failed to remove track from playlist:', error);
        }
    });
};