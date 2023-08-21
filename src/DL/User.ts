import { axiosInstance } from "."
import { type User } from "@/@types/Model"

const productModule = 'user';

export type UserResult = Omit<User, 'password'>;

export async function getUsers() {
    const path = `${productModule}/`;

    return axiosInstance.get<UserResult[]>(path)
        .then((res) => res.data);
}

export async function updateUser(user: Partial<UserResult>) {
    const path = `${productModule}/`;
    return axiosInstance.put<UserResult>(path, user)
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            return err;
        });
}