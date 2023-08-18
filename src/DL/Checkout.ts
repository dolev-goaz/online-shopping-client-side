import { CartProduct } from "@/store/Cart";
import { axiosInstance } from "."
import { AxiosResponse } from "axios";

const productModule = 'deal';

interface CheckoutItem {
    productId: number;
    count: number;
}

export async function createDeal(products: CartProduct[]) {
    const path = `${productModule}/`;

    return axiosInstance.post<
        CheckoutItem[],
        AxiosResponse<CheckoutItem[], CheckoutItem[]>,
        CheckoutItem[]
    >(path, products)
        .then(res => res.data);
}