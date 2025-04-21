
export interface Authorization {
    accessToken: string
    // refreshToken: string
  }
  
  export type JwtPayload<T> = T & {
    iat: number
    exp: number
  }
  
  export type AuthFormState = {
    error?: string
    success: boolean
  }
  