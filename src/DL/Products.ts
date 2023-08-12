import { axiosInstance } from "."
import { Product } from "@/@types/Model";

const productModule = 'product';

export async function getProducts(): Promise<Product[]> {
    const path = `${productModule}/products`;

    return axiosInstance
        .get<Product[]>(path)
        .then((res) => res.data)
        .catch(() => [])
        .then((products) => {
            products.forEach((product) => {
                product.Image = `https://picsum.photos/id/${product.Id}/500/700`
            });
            return products;
        });
}