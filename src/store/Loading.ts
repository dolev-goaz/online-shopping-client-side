import { defineStore } from 'pinia';

interface StoreState {
    loading: {
        authentication: boolean;
    }
}

type LoadingKey = keyof StoreState['loading'];

export const useLoadingStore = defineStore("loading-store", {
    state: (): StoreState => ({
        loading: {
            authentication: false
        }
    }),
    actions: {
        startLoading(type: LoadingKey) {
            this.$state.loading[type] = true;
        },
        finishLoading(type: LoadingKey) {
            this.$state.loading[type] = false;
        },
    },
    getters: {
    }
})