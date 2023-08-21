<template>
    <header> {{ t('user.list') }} </header>
    <ul>
        <li v-for="user in users" :key="user.id">
            <AdminUserListItem :user="user" :disabled="user.email == authStore.user!.email"
            @save="(updated) => saveUser(user.id, updated)" />
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/User";
import { computed } from "vue";
import AdminUserListItem from "./AdminUserListItem.vue";
import { useAuthStore } from "@/store/Authentication";
import { UserResult } from "@/DL/User";
import { useI18n } from "vue-i18n";
import { MessageSchema } from "@/i18n";
import { UserReduced } from "@/@types/Model";
const { t } = useI18n<MessageSchema>();

const userStore = useUserStore();
const authStore = useAuthStore();
userStore.fetchUsers();

const users = computed(() =>
    userStore
        .users
        .sort((userA, userB) => {
            // current user first
            if (userA.email === authStore.user?.email) return -1;
            if (userB.email === authStore.user?.email) return 1;
            return 0;
        })
);

async function saveUser(userId: number, updated: Partial<UserReduced>) {
    const payload: Partial<UserResult> = {
        id: userId,
        ...updated
    }
    await userStore.updateUser(payload);
}
</script>
<style lang="scss" scoped>
header {
    font-size: 2.5rem;
    color: var(--clr-fg-light);
    margin-bottom: 0.5rem;
}

ul {
    list-style: none;
    padding: 0;

    &>li:not(:last-child) {
        margin-bottom: 1rem;
    }
}
</style>