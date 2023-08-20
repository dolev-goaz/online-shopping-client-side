import { defineStore } from 'pinia';
import * as UserService from "@/DL/User"
import { useAuthStore } from './Authentication';

interface StoreState {
    users: UserService.UserResult[]
}

export const useUserStore = defineStore("user-store", {
    state: (): StoreState => ({
        users: []
    }),
    actions: {
        async fetchUsers() {
            const authStore = useAuthStore();
            if (!authStore.isAdmin) return [];

            this.users = await UserService.getUsers();
            return this.users;
        }
    },
    getters: {
    }
})