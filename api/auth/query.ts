import { Authorization } from "@/model/auth";
import apiClient from "../client";
import { AUTH_QUERY_KEYS } from "./keys";

const { REGISTER, AUTH, LOGIN } = AUTH_QUERY_KEYS;


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
        const response = await apiClient.post<Authorization>(`/${AUTH}/${REGISTER}`, data);
        return { data: response.data };
    }catch(e){
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
        console.log(e)
        return { data:null, errorMessage: "Something went wrong" }
    }
}