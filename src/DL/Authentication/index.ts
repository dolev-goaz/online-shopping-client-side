import { AxiosError } from "axios";
import { axiosInstance } from ".."
import { RegisterPayload, TRole } from "@/@types/Model";
import TokenService from "./Token";
export const authenticationModule = 'auth';

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthenticationResponse {
    accessToken: string;
    refreshToken: string;

    firstname: string;
    lastname: string;
    role: TRole;
}

const tokenManager = new TokenService.TokenManager();

export async function SignIn(email: string, password: string): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/authenticate`;

    return axiosInstance
        .post<AuthenticationResponse>(path, {
            email,
            password
        })
        .then((res) => res.data)
        .then((res) => {
            tokenManager.setAuthorization(res);
            return res;
        })
        .catch((err: AxiosError) => err.message);
}

export async function Register(formData: RegisterPayload): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/register`;

    return axiosInstance
        .post<AuthenticationResponse>(path, formData)
        .then((res) => res.data)
        .then((res) => {
            tokenManager.setAuthorization(res);
            return res;
        })
        .catch((err: AxiosError) => err.message);
}

export async function SignInToken(): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/authenticate`;
    return axiosInstance
        .get<AuthenticationResponse>(path)
        .then((res) => res.data)
        .catch((err: AxiosError) => err.message);

}

export async function LoadAuthorization() {
    if (tokenManager.loadAuthorization()) {
        return true;
    }
    const path = `${authenticationModule}/refresh-token`;
    return tokenManager.authorizeRefreshToken(
        (refreshToken) => axiosInstance
            .post<TokenResponse>(path, { refreshToken })
            .then((res) => res.data));
}

export async function SignOut() {
    tokenManager.deleteAuthorization()
}