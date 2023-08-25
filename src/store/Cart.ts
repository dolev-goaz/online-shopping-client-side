import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import { useProductStore } from './Product';
import * as CheckoutService from "@/DL/Checkout";
import { useMessageStore } from './Message';

export type CartProduct = {
    productId: number;
    count: number;
}

type CartProductExpanded = {
    product: Product;
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
        async checkout() {
            const res = await CheckoutService.createDeal(this.cartItems);
            if (typeof res === 'string' && res !== '') {
                useMessageStore().errorMessage(res);
                return;
            }
            this.cartItems.length = 0;
        },
        addItemCount(productId: number, count: number) {
            const productsStore = useProductStore();
            if (!productsStore.reduceStock(productId, count)) {
                useMessageStore().errorMessage('אירעה שגיאה. אנא נסה שוב..');
                return false
            }; // stock reduction failed

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
        },
        removeItem(productId: number) {
            const productsStore = useProductStore();

            const index = this.cartItems.findIndex((cartItem) => cartItem.productId == productId);
            if (index == -1) return false;

            const product = this.cartItems.splice(index, 1)[0];
            return productsStore.increaseStock(product.productId, product.count)
        },
        removeItemCount(productId: number, count: number) {
            const productsStore = useProductStore();
            if (!productsStore.increaseStock(productId, count)) return false; // stock increase failed

            const existing = this.cartItems.find((cartItem) => cartItem.productId == productId);
            if (!existing) return false;

            if (existing.count < count) {
                this.removeItem(productId)
            }
            existing.count -= count;

            return true;
        }
    },
    getters: {
        products(state) {
            const productStore = useProductStore();
            return state.cartItems
                .map(({ productId, count }) => ({
                    product: productStore.findProductById(productId),
                    count
                }))
                .filter((cartProduct) => cartProduct.product && cartProduct.count > 0) as CartProductExpanded[];
        },
        totalCost(): number {
            return this.products.reduce((sum, current) => {
                return sum + current.count * current.product.price
            }, 0);
        },
    }
})