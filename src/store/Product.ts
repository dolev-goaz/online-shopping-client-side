import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as ProductsService from "@/DL/Products"

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
            if (this.products.length > 0) return; // already fetched
            this.loadingProducts = true;
            const products = await ProductsService.getProducts();
            this.products.length = 0;
            this.products.push(...products);
            this.loadingProducts = false;
        },
        async getProductById(id: string) {
            this.currentProduct = this.findProductById(id);
            if (this.currentProduct) {
                return this.currentProduct;
            }
            await this.getProducts();
            this.currentProduct = this.findProductById(id);
            return this.currentProduct;
        },
        findProductById(productId: string) {
            return this.products.find((product) => product.ProductId == productId) ?? null;
        },
        reduceStock(productId: string, reduceCount: number) {
            const product = this.findProductById(productId);
            if (!product) return false;
            if (product.Stock < reduceCount) return false;
            product.Stock -= reduceCount;
            return true;
        },
        increaseStock(productId: string, count: number) {
            const product = this.findProductById(productId);
            if (!product) return false;
            product.Stock += count;
            return true;
        }
    },
    getters: {
    }
})