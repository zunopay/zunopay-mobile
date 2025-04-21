import { USER_QUERY_KEYS } from "./keys";
import apiClient, { getAccessToken } from "../client";
import { User } from "@/model/user";

const { USER, ME, GET, VERIFY_EMAIL } = USER_QUERY_KEYS;

export async function fetchMe() : Promise<{ data: User | null, errorMessage?: string }> {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const response = await apiClient.get<User>(`/${USER}/${GET}/${ME}`);
        return {data: response.data}
    }catch(e){
        return { data: null, errorMessage: "Something went wrong" }
        
    }
}

export async function verifyEmail() {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const response = await apiClient.patch<void>(`/${USER}/${VERIFY_EMAIL}`);
        return {data: response.data}
    }catch(e){
        console.log(e)
        return { data: null, errorMessage: "Something went wrong" }
    }
}