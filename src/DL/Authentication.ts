import { AxiosError } from "axios";
import { axiosInstance } from "."
import { RegisterPayload, TRole } from "@/@types/Model";

interface AuthenticationResponse {
    access_token: string;
    refresh_token: string;

    firstname: string;
    lastname: string;
    role: TRole;
}

const authenticationModule = 'auth';

export async function SignIn(email: string, password: string): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/authenticate`;

    return axiosInstance
        .post<AuthenticationResponse>(path, {
            email,
            password
        })
        .then((res) => res.data)
        .catch((err: AxiosError) => err.message);
}

export async function Register(formData: RegisterPayload): Promise<AuthenticationResponse | string> {
    const path = `${authenticationModule}/register`;

    return axiosInstance
        .post<AuthenticationResponse>(path, formData)
        .then((res) => res.data)
        .catch((err: AxiosError) => err.message);
}
