import axios from "axios"
import { GetAlbumTracksRequest, GetAlbumTracksResponse } from "../models/playlist"
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
