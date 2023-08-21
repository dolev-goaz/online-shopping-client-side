import { ServerError, axiosInstance } from "."
import { type User } from "@/@types/Model"

const productModule = 'user';

export type UserResult = Omit<User, 'password'>;

export async function getUsers() {
    const path = `${productModule}/`;

    return axiosInstance.get<UserResult[]>(path)
        .then((res) => res.data)
        .catch((err: ServerError) => err.errors[0]);
}

export async function updateUser(user: Partial<UserResult>) {
    const path = `${productModule}/`;
    return axiosInstance.put<UserResult>(path, user)
        .then((res) => res.data)
        .catch((err: ServerError) => {
            console.log(err);
            return err.errors[0];
        })
}