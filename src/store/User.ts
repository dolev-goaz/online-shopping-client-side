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
        },
        async updateUser(updatedUser: Partial<UserService.UserResult>) {
            const current = this.getUserById(updatedUser.id!);
            if (!current) return;
            const res = await UserService.updateUser(updatedUser);
            Object.assign(current, res);
        },
        getUserById(id: number) {
            return this.users.find((user) => user.id == id);
        }
    },
    getters: {
    }
})