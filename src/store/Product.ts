import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as DLService from "@/DL"

interface StoreState {
    products: Product[];
}

export const useProductStore = defineStore("products", {
    state: (): StoreState => ({
        products: []
    }),
    actions: {
        async getProducts() {
            const products = await DLService.getProducts();
            this.products.length = 0;
            this.products.push(...products);
        }
    },
    getters: {
    }
})