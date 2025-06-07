import axios from "axios";
import { SPOTIFY_BASEURL } from "../configs/commonConfig";

export const api = axios.create({
    baseURL: SPOTIFY_BASEURL,
    headers : {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
});

api.interceptors.request.use((request) => {
    request.headers.Authorization= `Bearer ${localStorage.getItem('access_token')}`;
    return request;
});