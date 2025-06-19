import { ExtendedArtists } from '../models/commonType';
import axios from "axios"
import { SPOTIFY_BASEURL } from "../configs/commonConfig"
import { getNewReleasesResponse } from "../models/album";
import { Album } from "../models/playlist";

export const getNewReleases = async(clientCredentialToken: string):Promise<getNewReleasesResponse> => {
    try {
        const response = await axios.get(
            `${SPOTIFY_BASEURL}/browse/new-releases?limit=6`,
            {
                headers: {
                    Authorization: `Bearer ${clientCredentialToken}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch New Releases`);
    }
}



export interface GetAlbumInfoRequest {
  id: string;
  accessToken: string;
}

export const fetchAlbumInfo = async ( { id, accessToken }: GetAlbumInfoRequest): Promise<Album> => {
    try {
         const response = await axios.get(`${SPOTIFY_BASEURL}/albums/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch AlbumInfo`)
    }
 
};



export const fetchArtistInfo = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}): Promise<ExtendedArtists> => {
  const { data } = await axios.get<ExtendedArtists>(
    `${SPOTIFY_BASEURL}/artists/${id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return data;
};