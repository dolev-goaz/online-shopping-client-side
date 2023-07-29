import axios from "axios";
import { Product, User } from "../@types/Model";

const axiosInstance = axios.create({
    baseURL: ''
});

export async function SignIn(username: string, password: string): Promise<User | string> {
    return {
        Address: 'Hakoona Matata',
        Auth: 'ADMIN',
        Mail: 'woobadoobadubdub@gmail.com',
        UserId: username
    } as User
    // axiosInstance.post('User', {
    //     username,
    //     password
    // });
}

export async function getProducts(): Promise<Product[]> {
    // test items
    const items: any[] = await axiosInstance.get('https://fakestoreapi.com/products').then((res) => res.data);
    return items.map((item) => ({
        Price: item.price,
        ProductName: item.title,
        ProductId: item.id,
        ProductDesc: item.description,
        Stock: Math.floor(Math.random() * 100),
        Image: item.image
    } as unknown as Product));
}