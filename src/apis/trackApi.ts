import axios from "axios"
import { GetAlbumTracksRequest, GetAlbumTracksResponse, GetArtistsTracksRequest, GetArtistsTracksResponse } from "../models/playlist"
import { SPOTIFY_BASEURL } from "../configs/commonConfig"

export const getAlbumTracks = async ({
  id,
  market,
  limit,
  offset,
  accessToken,
}: GetAlbumTracksRequest & { accessToken?: string }): Promise<GetAlbumTracksResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASEURL}/albums/${id}/tracks`,
      {
        params: { market, limit, offset }, 
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch {
    throw new Error('Failed to fetch album tracks');
  }
};


export const getArtistsTracks = async ({
  id,
  market,
  accessToken,
}: GetArtistsTracksRequest & { accessToken?: string }): Promise<GetArtistsTracksResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASEURL}/artists/${id}/top-tracks`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { market: market ?? 'CA' },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch artist's top tracks.`);
  }
};
