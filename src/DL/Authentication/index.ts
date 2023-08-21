import { ServerError, axiosInstance } from ".."
import { RegisterPayload, UserReduced } from "@/@types/Model";
import TokenService from "./Token";
export const authenticationModule = 'auth';

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export type AuthenticationResponse = TokenResponse & UserReduced;

const tokenManager = new TokenService.TokenManager();

export async function SignIn(email: string, password: string) {
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
        .catch((err: ServerError) => err.errors[0]);
}

export async function Register(formData: RegisterPayload) {
    const path = `${authenticationModule}/register`;

    return axiosInstance
        .post<AuthenticationResponse>(path, formData)
        .then((res) => res.data)
        .then((res) => {
            tokenManager.setAuthorization(res);
            return res;
        })
        .catch((err: ServerError) => err.errors[0]);
}

export async function SignInToken() {
    const path = `${authenticationModule}/authenticate`;
    return axiosInstance
        .get<AuthenticationResponse>(path)
        .then((res) => res.data)
        .catch((err: ServerError) => err.errors[0]);

}

export async function LoadAuthorization() {
    if (tokenManager.loadAuthorization()) {
        return true;
    }
    const path = `${authenticationModule}/refresh-token`;
    return tokenManager.authorizeRefreshToken(
        (refreshToken) => axiosInstance
            .post<TokenResponse>(path, { refreshToken })
            .then((res) => res.data))
        .catch((err: ServerError) => err.errors[0]);
}

export function DeleteLocalAuthorizations() {
    tokenManager.deleteAuthorization();
}

async function _SignOut() {
    const path = `${authenticationModule}/logout`;
    return axiosInstance
        .get(path)
        .catch((err: ServerError) => err.errors[0]);
}

export async function SignOut() {
    await _SignOut();
    DeleteLocalAuthorizations();
}