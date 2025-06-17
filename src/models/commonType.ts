export interface ExternalUrls {
    spotify: string
}

export interface Image {
        url: string,
        height: number | null,
        width: number | null
}

export interface Restrictions {
        reason?: string
}

export interface Followers {
        href : string | null; 
        total : number
}

export interface ExplicitContent {
        filter_enabled: boolean;
        filter_locked: boolean
}

export interface Owner {
        external_urls?: ExternalUrls,
        href?: string,
        id?: string,
        type?: string,
        uri?: string,
        display_name?: string | null
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
}

export interface ExtendedArtists extends Artist {
        popularity?: number,
        images : Image[],
        genres?: string[] | null,
        followers? : {
                href: string | null,
                total: number | null
        }
}