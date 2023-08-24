import { ServerError, axiosInstance } from "."
import { Product } from "@/@types/Model";

const productModule = 'product';

export async function getProducts(): Promise<Product[]> {
    const path = `${productModule}/products`;

    return axiosInstance
        .get<Product[]>(path)
        .then((res) => res.data)
        .catch(() => []);
}

export async function updateProduct(newProduct: Product, image?: File) {
    const path = `${productModule}/product`;

    const formData = new FormData();

    if (image) {
        formData.set('image', image);
    }
    formData.set('product', toFormData(newProduct));

    return axiosInstance
        .put<Product>(path, formData)
        .then((res) => res.data)
        .catch((err: ServerError) => err.errors[0]);
}

export async function createProduct(newProduct: Product, image?: File) {
    const path = `${productModule}/product`;
    const formData = new FormData();

    if (image) {
        formData.set('image', image);
    }
    formData.set('product', toFormData(newProduct));

    return axiosInstance
        .post<Product>(path, formData)
        .then((res) => res.data)
        .catch((err: ServerError) => err.errors[0]);
}

function toFormData(product: Product) {
    return new Blob([
        JSON.stringify(product)
    ], {
        type: "application/json"
    });
}