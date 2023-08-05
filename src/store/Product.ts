import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as DLService from "@/DL"

interface StoreState {
    products: Product[];
    currentProduct: Product | null;
    loadingProducts: boolean;
}

export const useProductStore = defineStore("products", {
    state: (): StoreState => ({
        products: [],
        currentProduct: null,
        loadingProducts: false
    }),
    actions: {
        async getProducts() {
            this.loadingProducts = true;
            const products = await DLService.getProducts();
            this.products.length = 0;
            this.products.push(...products);
            this.loadingProducts = false;
        },
        async getProductById(id: string) {
            this.currentProduct = this.products.find((product) => product.ProductId == id) ?? null;
            if (this.currentProduct) {
                return this.currentProduct;
            }
            await this.getProducts();
            this.currentProduct = this.products.find((product) => product.ProductId == id) ?? null;
            return this.currentProduct;
        }
    },
    getters: {
    }
})