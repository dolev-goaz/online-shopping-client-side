import axios, { AxiosError } from "axios";

export type ServerError = {
    status: string;
    errors: string[];
}

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
});

axiosInstance.interceptors.response.use((resp) => resp,
    (error: AxiosError<ServerError>) => {
        const res = error.response?.data ||
            {
                status: error.code || '400',
                errors: [error.message]
            } satisfies ServerError
        return Promise.reject(res);
    }
);