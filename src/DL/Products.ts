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
                product.image = `https://picsum.photos/id/${product.id}/500/700`
            });
            return products;
        });
}

export async function updateProduct(newProduct: Product) {
    const path = `${productModule}/product`;
    return axiosInstance
        .put(path, newProduct)
        .then((res) => res.data);
}

export async function createProduct(newProduct: Product) {
    const path = `${productModule}/product`;
    return axiosInstance
        .post<Product>(path, newProduct)
        .then((res) => res.data);
}