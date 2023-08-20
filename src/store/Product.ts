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
        async getProductById(id: number) {
            this.currentProduct = this.findProductById(id);
            if (this.currentProduct) {
                return this.currentProduct;
            }
            await this.getProducts();
            this.currentProduct = this.findProductById(id);
            return this.currentProduct;
        },
        async updateProduct(updatedProduct: Product) {
            if (!updatedProduct.id) return false;

            const success = await ProductsService
                .updateProduct(updatedProduct)
                .then(() => true)
                .catch(() => false)

            if (success) {
                const existing = this.findProductById(updatedProduct.id);
                if (existing) {
                    Object.assign(existing, updatedProduct);
                }
            }

            return success;
        },
        async createProduct(product: Product) {
            // if (product.Id) return false;
            return ProductsService
                .createProduct(product)
                .then((product) => {
                    product.image = `https://picsum.photos/id/${product.id}/500/700`
                    this.products.push(product)
                    this.currentProduct = product;
                    return true;
                })
                .catch(() => false)
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