import { axiosInstance } from "."
import { Product } from "@/@types/Model";

const productModule = 'product';

export async function getProducts(): Promise<Product[]> {
    // const path = `${productModule}/products`;

    // return axiosInstance
    //     .get<Product[]>(path)
    //     .then((res) => res.data)
    //     .catch(() => []);
    return Array.from({ length: 50 }).map((_, ind) => ({
        Image: `https://picsum.photos/id/${ind}/500/700`,
        Price: parseFloat((Math.random() * 100).toFixed(2)),
        Stock: Math.floor(Math.random() * 15),
        ProductId: ind.toString(),
        ProductName: "מוצר רנדומלי",
        ProductDesc: "תיאור מוצר מגניב רצח".repeat(1 + Math.floor(Math.random() * 5))
    }));
}