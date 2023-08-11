<template>
    <div class="login-page">
        <BaseForm @submit="onSubmit">
            <TextInput v-model="username" name="username" required label="שם משתמש" />
            <TextInput v-model="password" name="password" required label="סיסמא" password />
            <template #submit-button>התחבר</template>
        </BaseForm>
    </div>
</template>
<script lang="ts" setup>
import BaseForm from '@/components/BaseForm.vue';
import TextInput from '@/components/TextInput.vue';
import { useAuthStore } from '@/store/Authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

async function onSubmit(payload: Record<string, any>) {
    const { username, password } = payload;
    const user = await authStore.login(username, password);
    router.push({
        name: 'products'
    });
}
</script>
<style scoped lang="scss">
.login-page {
    height: 80%;
    display: grid;
    place-items: center;
}
</style>