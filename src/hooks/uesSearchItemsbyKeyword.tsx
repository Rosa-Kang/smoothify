import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "../models/search"
import { useClientCredentialToken } from "./useClientCredentialToken";

export const useSearchItemsByKeyword = (params:SearchRequestParams) => {
    const clientCredentialToken = useClientCredentialToken();
    console.log(clientCredentialToken)
    return useInfiniteQuery({
        queryKey: ['search', params],
        queryFn: ({pageParam = 0}) => {
            if(!clientCredentialToken) throw new Error(`No token available..`)
            return searchItemsByKeyword(clientCredentialToken, {...params, offset: pageParam})
        },
        initialPageParam:0,
        getNextPageParam: (lastPage) => {
            const nextPageUrl =
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.playlists?.next ||
                lastPage.show?.next ||
                lastPage.episode?.next ||
                lastPage.audiobook?.next;

                if(nextPageUrl) {
                    const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
                    return nextOffset? parseInt(nextOffset) : undefined
                }

                return undefined;
        }
    })
}