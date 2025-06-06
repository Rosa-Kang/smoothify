import axios from "axios"
import { SPOTIFY_BASEURL } from "../configs/commonConfig"
import { User } from "../models/user";

export const getCurrentUserProfile = async():Promise<User> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASEURL}/me`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItems("access_token")}`
            },
        })
        return response.data;
    } catch (error) {
        throw new Error(`Fail to fetch user profile`)
    }
}