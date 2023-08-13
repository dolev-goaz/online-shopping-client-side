import { AxiosError } from "axios";
import { axiosInstance } from ".."
import { RegisterPayload, TRole } from "@/@types/Model";
import TokenService from "./Token";
export const authenticationModule = 'auth';

export interface AuthenticationResponse {
    access_token: string;
    refresh_token: string;

    firstname: string;
    lastname: string;
    role: TRole;
}

export async function SignIn(email: string, password: string): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/authenticate`;

    return axiosInstance
        .post<AuthenticationResponse>(path, {
            email,
            password
        })
        .then((res) => res.data)
        .then((res) => {
            TokenService.setAuthorization(res);
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
            TokenService.setAuthorization(res);
            return res;
        })
        .catch((err: AxiosError) => err.message);
}
