import { Authorization } from "@/model/auth";
import apiClient from "../client";
import { AUTH_QUERY_KEYS } from "./keys";
import { debugApiClient } from "@/lib/utils";

const { REGISTER, AUTH, LOGIN, USER } = AUTH_QUERY_KEYS;

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    region: string;
    role: string;
    referralCode: string;
  };
  

export async function register(data: RegisterFormData) : Promise<{ data: Authorization | null, errorMessage?: string }> {
    try{
        const response = await apiClient.post<Authorization>(`/${AUTH}/${USER}/${REGISTER}`, data);
        return { data: response.data };
    }catch(error){
        debugApiClient(error)
        return { data:null, errorMessage: "Something went wrong" }
    }
}

export type LoginFormData = {
    usernameOrEmail: string;
    password: string;
  };
  

export async function login(data: LoginFormData) : Promise<{ data: Authorization | null, errorMessage?: string }> {
    try{
        const response = await apiClient.patch<Authorization>(`/${AUTH}/${LOGIN}`, data);
        return { data: response.data };
    }catch(e){
        debugApiClient(e)
        return { data:null, errorMessage: "Something went wrong" }
    }
}