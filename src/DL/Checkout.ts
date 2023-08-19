import { CartProduct } from "@/store/Cart";
import { axiosInstance } from "."
import { AxiosResponse } from "axios";
import { type Deal } from "@/@types/Model"

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
        .then((res) => res.data);
}

export async function getCheckouts() {
    const path = `${productModule}/`;
    return axiosInstance
        .get<Deal[]>(path)
        .then((res) => res.data)
        .then((deals) => {
            deals.forEach((deal) => {
                deal.purchases.forEach((purchase) => {
                    purchase.product.Image = `https://picsum.photos/id/${purchase.product.Id}/500/700`;
                });
            })
            return deals;
        });
}