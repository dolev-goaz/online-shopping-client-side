import { RegisterPayload, Roles, TRole, User } from '@/@types/Model';
import { defineStore } from 'pinia';
import * as AuthenticationService from "@/DL/Authentication"

type UserInner = {
    firstname: string;
    lastname: string;
    role: TRole;
}
interface StoreState {
    user: UserInner | null;
}

export const useAuthStore = defineStore("authentication", {
    state: (): StoreState => ({
        user: null
    }),
    actions: {
        async loadAuthorization() {
            if (this.user) return;
            const existingAuth = await AuthenticationService.LoadAuthorization();
            if (!existingAuth) return;

            const res = await AuthenticationService.SignInToken();
            if (typeof res === 'string') {
                alert(res);
                return;
            }

            this.user = res;
            return this.user;
        },
        async login(email: string, password: string) {
            const res = await AuthenticationService.SignIn(email, password);
            if (typeof res === 'string') {
                alert(res);
                return;
            }

            this.user = res;
            return this.user;
        },
        async logout() {
            await AuthenticationService.SignOut();
            this.user = null;
        },
        async register(payload: RegisterPayload) {
            const res = await AuthenticationService.Register(payload);
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
            if (!this.isLoggedIn) return Roles.NotLogged;
            return this.user!.role;
        },
        isAdmin(): boolean {
            return this.getAuthorization === 'ADMIN';
        }
    }
});