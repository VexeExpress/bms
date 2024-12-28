export interface LoginType {
    username: string;
    password: string;
}
export interface LoginResponseType {
    token: string;
    authenticated: boolean;
    fullName: string;
    companyName: string;
    employeeId: number;
    companyId: number;
}
export interface AuthState {
    authenticated: boolean;
    loading: boolean;
    fullName: string;
    companyName: string;
    employeeId: number;
    companyId: number;
}
export interface IntrospectType {
    code: number;
    result: {
        valid: boolean;
    }
}
export interface UserData {
    fullName: string;
    companyName: string;
    employeeId: number;
    companyId: number;

}