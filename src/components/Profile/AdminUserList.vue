<template>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.firstName }} {{ user.lastName }}
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/User";
import { computed } from "vue";
const userStore = useUserStore();
userStore.fetchUsers();

const users = computed(() => userStore.users);
</script>
<style lang="scss" scoped>
ul {
    list-style: none;
    padding: 0;
}
</style>