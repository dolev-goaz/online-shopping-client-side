import { defineStore } from 'pinia';
import { useProductStore } from './Product';


type CartProduct = {
    productId: string;
    count: number;
}
interface StoreState {
    cartItems: CartProduct[]
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

            console.log(this.cartItems);
            

            return true;
        }
    },
    getters: {

    }
})