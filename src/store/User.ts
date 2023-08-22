import { defineStore } from 'pinia';
import * as UserService from "@/DL/User"
import { useAuthStore } from './Authentication';
import { useMessageStore } from './Message';

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

            const res = await UserService.getUsers();
            if (typeof res === 'string') {
                useMessageStore().errorMessage({ text: res });
                return [];
            }
            this.users = res;
            return this.users;
        },
        async updateUser(updatedUser: Partial<UserService.UserResult>) {
            const current = this.getUserById(updatedUser.id!);
            if (!current) return;
            const res = await UserService.updateUser(updatedUser);
            if (typeof res === 'string') {
                useMessageStore().errorMessage({ text: res });
                return;
            }
            Object.assign(current, res);
        },
        getUserById(id: number) {
            return this.users.find((user) => user.id == id);
        }
    },
    getters: {
    }
})