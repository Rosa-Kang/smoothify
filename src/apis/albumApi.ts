import axios from "axios"
import { SPOTIFY_BASEURL } from "../configs/commonConfig"
import { getNewReleasesResponse } from "../models/album";

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

