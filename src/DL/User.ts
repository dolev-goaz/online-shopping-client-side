import { CartProduct } from "@/store/Cart";
import { axiosInstance } from "."
import { AxiosResponse } from "axios";
import { type User } from "@/@types/Model"

const productModule = 'user';

export async function getUsers() {
    const path = `${productModule}/`;

    return axiosInstance.get<User[]>(path)
        .then((res) => res.data);
}