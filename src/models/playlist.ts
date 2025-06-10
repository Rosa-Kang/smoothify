import { ApiResponse } from "./apiresponse"
import { ExternalUrls, Image, Owner, Restrictions } from "./commonType"

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

export interface GetPlaylistRequest {
  playlist_id : string;
  market?: string;
  fields? : string;
  additional_type? : string
}



export interface GetPlaylistResponse extends Required<Omit<SimplifiedPlaylist, 'tracks' | 'type' | 'owner'>> {
  owner: PlaylistOwner;
  tracks: PlaylistTracks;
  type: string;
}

export interface PlaylistOwner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string | null;
}

export interface PlaylistTrackObject {
  added_at: string; 
  added_by: User;
  is_local: boolean; 
  track: TrackObject | EpisodeObject; 
}

export interface User {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: "user";
  uri: string;
}

export interface TrackObject {
  album: SimplifiedAlbumObject;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: TrackObject;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url?: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface SimplifiedAlbumObject {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: SimplifiedArtistObject[];
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface EpisodeObject {
  audio_preview_url: string | null;
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
  language?: string; // deprecated
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: ResumePoint;
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  show: ShowObject;
}

export interface ResumePoint {
  fully_played?: boolean;
  resume_position_ms?: number;
}

export interface ShowObject {
  available_markets: string[];
  copyrights: CopyrightObject[];
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
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface CopyrightObject {
  text?: string;
  type?: string;
}