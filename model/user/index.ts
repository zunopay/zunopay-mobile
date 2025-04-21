import { Role } from "@/types";

// TODO: Fix region types
export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string,
    role: Role, 
    region: 'EU' | 'IN' | 'BR' | 'SG',
    isKycVerified: boolean;
    isEmailVerified: boolean;
}
