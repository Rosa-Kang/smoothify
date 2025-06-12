import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi"
import { useGetCurrentUserProfile } from "./useGetCurrentUserProfile"
import { CreatePlaylistRequest } from "../models/playlist"

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const {data:user} = useGetCurrentUserProfile()
    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if(user) {
                return createPlaylist(user?.id, params)
            }
            return Promise.reject(new Error(`user is undefined`))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [`currentUserPlaylists`]})
            console.log(`Success!`)
        }
    })

}