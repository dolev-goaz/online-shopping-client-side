import axios from "axios";
import { Product, RegisterPayload, User } from "../@types/Model";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
});

export async function getProducts(): Promise<Product[]> {
    // test items
    return Array.from({length: 50}).map((_, ind) => ({
        Image: `https://picsum.photos/id/${ind}/500/700`,
        Price: parseFloat((Math.random() * 100).toFixed(2)),
        Stock: Math.floor(Math.random() * 15),
        ProductId: ind.toString(),
        ProductName: "מוצר רנדומלי",
        ProductDesc: "תיאור מוצר מגניב רצח".repeat(1 + Math.floor(Math.random() * 5))
    }));
}