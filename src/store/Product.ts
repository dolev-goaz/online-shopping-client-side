import { Product } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as ProductsService from "@/DL/Products"
import { useMessageStore } from './Message';

interface StoreState {
    products: Product[];
    currentProduct: Product | null;
    loadingProducts: boolean;
}

export const fallbackImage = "http://localhost:8080/image/product/placeholder.png";

export const useProductStore = defineStore("products", {
    state: (): StoreState => ({
        products: [],
        currentProduct: null,
        loadingProducts: false,
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
        async getProductById(id: number) {
            this.currentProduct = this.findProductById(id);
            if (this.currentProduct) {
                return this.currentProduct;
            }
            await this.getProducts();
            this.currentProduct = this.findProductById(id);
            return this.currentProduct;
        },
        async updateProduct(updatedProduct: Product, image?: File) {
            if (!updatedProduct.id) return false;

            const res = await ProductsService.updateProduct(updatedProduct, image);
            if (typeof res === 'string') {
                useMessageStore().errorMessage({ text: res });
                return false;
            }

            const existing = this.findProductById(updatedProduct.id);
            if (existing) {
                Object.assign(existing, updatedProduct);
            }

            return true;
        },
        async createProduct(product: Product, image?: File) {
            const res = await ProductsService.createProduct(product, image);
            if (typeof res === 'string') {
                useMessageStore().errorMessage({ text: res });
                return false;
            }
            this.products.push(res)
            this.currentProduct = res;
            return true;
        },
        findProductById(productId: number) {
            return this.products.find((product) => product.id == productId) ?? null;
        },
        reduceStock(productId: number, reduceCount: number) {
            const product = this.findProductById(productId);
            if (!product) return false;
            if (product.stock < reduceCount) return false;
            product.stock -= reduceCount;
            return true;
        },
        increaseStock(productId: number, count: number) {
            const product = this.findProductById(productId);
            if (!product) return false;
            product.stock += count;
            return true;
        }
    },
    getters: {
    }
})