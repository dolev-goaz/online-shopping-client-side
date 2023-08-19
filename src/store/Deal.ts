import { defineStore } from 'pinia';
import * as CheckoutService from "@/DL/Checkout";
import { Deal } from '@/@types/Model';

interface StoreState {
    deals: Deal[];
}

export const useDealStore = defineStore("checkout-store", {
    state: (): StoreState => ({
        deals: []
    }),
    actions: {
        async getAllDeals() {
            this.deals = await CheckoutService.getCheckouts();
            return this.deals
        },
        clear() {
            this.deals.length = 0;
        }
    },
    getters: {
    }
})