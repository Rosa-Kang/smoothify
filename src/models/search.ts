import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiresponse";
import { Artist, Image } from "./commonType";
import { GetCurrentUserPlaylistsRequest, Show, SimplifiedAudiobook, SimplifiedEpisode, SimplifiedPlaylist, Track } from "./playlist";

export enum SEARCH_TYPE {
    Track = "track",
    Album = "album",
    Playlist= "playlist",
    Show = "show",
    Episode = "episode",
    AudioBook = "audiobook",
    Artist = "artist"
}

export interface SearchRequestParams {
    q : string,
    type: SEARCH_TYPE[],
    market?: string,
    limit?: number,
    offset?: number,
    include_external?: string
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>,
    albums?: ApiResponse<SimplifiedAlbum>,
    tracks?: ApiResponse<Track>,
    playlists?: ApiResponse<SimplifiedPlaylist>,
    show?: ApiResponse<Show>,
    episode?: ApiResponse<SimplifiedEpisode>,
    audiobook?: ApiResponse<SimplifiedAudiobook>
}

export interface BrowseCategoriesRequest extends GetCurrentUserPlaylistsRequest {
  locale? : string
}

export interface BrowseCategoriesResponse {
  categories: ApiResponse<BrowseCategories>;
}

export interface BrowseCategories {
    href: string,
    icons: Image[],
    id: string,
    name: string
}