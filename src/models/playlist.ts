import { ApiResponse } from "./apiresponse"
import { ExternalUrls, Image, Owner } from "./commonType"

export interface GetCurrentUserPlaylistsRequest {
    limit ?: number,
    offset?: number
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>

export interface SimplifiedPlaylist {
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
      tracks?: {  
        href?: string,
        total?: number
      },
      type?: string,
      uri?: string
}

// export interface IGetCurrentUserPlaylistRequest {

// }

// export type  TGetCurrentUserPlaylistResponse = {

// }