import { Artist } from "./artist";
import { ExternalUrls, Image, Restrictions } from "./commonType"

export interface getNewReleasesResponse {
    albums: {
        limit: number,
        next: string,
        offset: number,
        previous: string,
        total: number,
        items: SimplifiedAlbum[]
    }
}

export interface SimplifiedAlbum {
        album_type: string,
        total_tracks : number,
        available_markets : string[],
        external_urls: ExternalUrls,
        href: string,
        id: string,
        images: Image[],
        name: string,
        release_date: string,
        release_date_precision: string,
        restrictions?: Restrictions,
        type: string,
        uri: string,
        artists: Artist[],
}