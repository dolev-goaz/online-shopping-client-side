import { axiosInstance } from "."
import { type User } from "@/@types/Model"

const productModule = 'user';

export type UserResult = Omit<User, 'password'>;

export async function getUsers() {
    const path = `${productModule}/`;

    return axiosInstance.get<UserResult[]>(path)
        .then((res) => res.data);
}