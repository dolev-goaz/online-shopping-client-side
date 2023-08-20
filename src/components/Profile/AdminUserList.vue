<template>
    <header> רשימת משתמשים </header>
    <ul>
        <li v-for="user in users" :key="user.id">
            <AdminUserListItem :user="user" :disabled="user.email == authStore.user!.email" />
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/User";
import { computed } from "vue";
import AdminUserListItem from "./AdminUserListItem.vue";
import { useAuthStore } from "@/store/Authentication";
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
</script>
<style lang="scss" scoped>
header {
    font-size: 2.5rem;
    color: var(--clr-fg-light);
}

ul {
    list-style: none;
    padding: 0;

    &>li:not(:last-child) {
        margin-bottom: 1rem;
    }
}
</style>