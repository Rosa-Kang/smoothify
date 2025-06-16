import axios from "axios"
import { SPOTIFY_BASEURL } from "../configs/commonConfig"
import { BrowseCategoriesRequest, BrowseCategoriesResponse, SearchRequestParams, SearchResponse } from "../models/search"
import { useQuery } from "@tanstack/react-query";

export const searchItemsByKeyword = async(token:string, params:SearchRequestParams):Promise<SearchResponse> => {
    try {   
        const searchParams = new URLSearchParams();
        searchParams.append('q', params.q);
        searchParams.append('type', params.type.join(','));

        if (params.market) searchParams.append('market', params.market);
        if (params.limit) searchParams.append('limit', params.limit.toString());
        if (params.offset) searchParams.append('offset', params.offset.toString());
        if (params.include_external) searchParams.append('include_external', params.include_external);

        const response = await axios.get(`${SPOTIFY_BASEURL}/search?${searchParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to search by keyword');
    }
}

export const browseCategories = async({limit, offset, locale}:BrowseCategoriesRequest):Promise<BrowseCategoriesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASEURL}/browse/categories`, {
            params: {limit, offset, locale}
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch categories..`)
    }
}