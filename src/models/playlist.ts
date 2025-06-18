
import { ApiResponse } from "./apiresponse"
import { Artist, ExternalUrls, Followers, Image, Owner, Restrictions, SpotifyImage } from "./commonType"

export interface GetCurrentUserPlaylistsRequest {
    limit ?: number,
    offset?: number
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>
export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface BasePlaylist {
      collaborative?: boolean,
      description?: string | null,
      external_urls?: ExternalUrls,
      href?: string,
      id?: string,
      images?: Image[],
      name?: string | undefined,
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

export interface GetPlaylistItemsRequest extends GetPlaylistRequest{
  limit?: number,
  offset?: number,
  additional_types?: string
}

export interface GetPlaylistResponse extends BasePlaylist {
  tracks : ApiResponse<PlaylistTrack>
  followers : Followers
}

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local: boolean; 
  track: Track | Episode ;
}


export interface Track {
  album: Album;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: { reason?: string };
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls?: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason?: string;
  };
  type: string;
  uri: string;
  artists: Artist[];
}


export interface Episode {
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: string;
  uri: string;
  restrictions?: {
    reason?: string;
  };
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, "show">;

export interface Show {
  available_markets: string[];
  copyright: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface Copyright {
  text?: string;
  type?: string;
}

export interface CreatePlaylistRequest {
  name: string,
  playlistPublic? : boolean,
  collaborative? : boolean,
  description?: string
}

export interface SimplifiedAudiobook {
  authors: { name : string }[],
  available_market : string[],
  copyrights : Copyright,
  description: string,
  html_description: string,
  edition?: string,
  external_urls: ExternalUrls,
  href: string,
  id: string,
  images : Image[],
  languages: string[],
  media_type: string,
  name: string,
  narrators: {
    name: string
  }[],
  publisher : string,
  type: "audiobook",
  uri: string,
  total_chapters : number,
}

export interface AddTracksToPlaylistRequest {
    playlist_id: string;
    uris: string[];
    position?: number; 
}

export interface AddTracksToPlaylistResponse {
    snapshot_id: string;
}

export interface RemoveTracksFromPlaylistRequest {
    playlist_id: string;
    tracks: Array<{
        uri: string;
        positions?: number[];
    }>;
    snapshot_id?: string;
}

export interface RemoveTracksFromPlaylistResponse {
    snapshot_id: string;
}

export interface GetAlbumTracksRequest {
  id: string,
  market?: string,
  limit?: number,
  offset?: number
}

export type GetAlbumTracksResponse  = ApiResponse<Track>