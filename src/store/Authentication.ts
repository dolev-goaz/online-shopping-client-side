import { RegisterPayload, TRole, User } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as DLService from "@/DL"


type UserInner = Omit<User, 'password'>;
interface StoreState {
    user: UserInner | null;
}

export const useAuthStore = defineStore("authentication", {
    state: (): StoreState => ({
        user: null
    }),
    actions: {
        async login(username: string, password: string) {
            const res = await DLService.SignIn(username, password);
            if (typeof res === 'string') {
                alert(res);
                return;
            }

            this.user = res;
            return this.user;
        },
        async logout() {
            this.user = null;
        },
        async register(payload: RegisterPayload) {
            const res = await DLService.Register(payload);
            if (typeof res === 'string') {
                alert(res);
                return;
            }

            this.user = res;
            return this.user;

        }
    },
    getters: {
        isLoggedIn(): boolean {
            return Boolean(this.user);
        },
        getAuthorization(): TRole {
            if (!this.isLoggedIn) return 'NONE';
            return this.user!.Auth;
        }
    }
})