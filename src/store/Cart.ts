import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import { useProductStore } from './Product';


type _cartProduct = {
    productId: number;
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
        addItemCount(productId: number, count: number) {
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

            existing.count -= count;
            if (existing.count < 0) {
                this.removeItem(productId)
            }

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
                .filter((cartProduct) => cartProduct.product && cartProduct.count > 0) as CartProduct[];
        },
        totalCost(): number {
            return this.products.reduce((sum, current) => {
                return sum + current.count * current.product.Price
            }, 0);
        },
    }
})