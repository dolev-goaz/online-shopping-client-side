import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import { useProductStore } from './Product';


type _cartProduct = {
    productId: string;
    count: number;
}

type CartProduct = {
    product: Product;
    count: number;
}
interface StoreState {
    cartItems: _cartProduct[]
}

export const useCartStore = defineStore("products-cart", {
    state: (): StoreState => ({
        cartItems: [],
    }),
    actions: {
        addItem(productId: string, count: number) {
            const productsStore = useProductStore();
            if (!productsStore.reduceStock(productId, count)) return false; // stock reduction failed

            const existing = this.cartItems.find((cartItem) => cartItem.productId == productId);
            if (existing) {
                existing.count += count;
            } else {
                this.cartItems.push({
                    productId,
                    count
                });
            }

            return true;
        }
    },
    getters: {
        totalCost(state) {
            const productStore = useProductStore();
            let totalPrice = 0;
            state.cartItems.forEach((cartProduct) => {
                const product = productStore.findProductById(cartProduct.productId);
                if (!product) return;

                totalPrice += product.Price * cartProduct.count;
            });
            return totalPrice;
        },
        products(state) {
            const productStore = useProductStore();
            return state.cartItems
                .map(({ productId, count }) => ({
                    product: productStore.findProductById(productId),
                    count
                }))
                .filter((cartProduct) => cartProduct.product && cartProduct.count > 0) as CartProduct[];
        }
    }
})