import { ApiResponse } from "./apiresponse"
import { ExternalUrls, Followers, Image, Owner, Restrictions } from "./commonType"

export interface GetCurrentUserPlaylistsRequest {
    limit ?: number,
    offset?: number
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>

export interface BasePlaylist {
      collaborative?: boolean,
      description?: string | null,
      external_urls?: ExternalUrls,
      href?: string,
      id?: string,
      images?: Image[],
      name?: string,
      owner?: Owner,
      public?: boolean,
      snapshot_id?: string,
      type?: "playlist",
      uri?: string
}

export interface SimplifiedPlaylist extends BasePlaylist{
      tracks?: {  
        href?: string,
        total?: number
      },
}

export interface GetPlaylistRequest {
  playlist_id : string;
  market?: string;
  fields? : string;
  additional_type? : string
}

export interface GetPlaylistResponse extends BasePlaylist {
  tracks : ApiResponse<PlaylistTrack>
  followers : Followers
}

export interface PlaylistTrack {
  added_at?: string | null,
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null,
  is_local: boolean; 
  track: {}; 
}
