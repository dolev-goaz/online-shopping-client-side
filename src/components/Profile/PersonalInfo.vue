<template>
    <article v-if="user">
        <header>
                {{ user.firstname }} {{ user.lastname }}
        </header>
        <section>
            {{ user.address }} {{ user.email }}
        </section>
    </article>
    <div v-else>
        sadface
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/Authentication';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>
<style scoped lang="scss"></style>