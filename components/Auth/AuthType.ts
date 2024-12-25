export interface LoginType {
    username: string;
    password: string;
}
export interface LoginResponseType {
    code: number;
    message: string;
    result: {
        token: string;
        authenticated: boolean;
    }
}
export interface IntrospectType {
    code: number;
    result: {
        valid: boolean;
    }
}