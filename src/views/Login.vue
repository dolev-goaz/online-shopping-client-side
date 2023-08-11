<template>
    <div class="login-page">
        <BaseForm @submit="onSubmit">
            <TextInput v-model="username" name="username" required :label="t('form.login.username')" />
            <TextInput v-model="password" name="password" required :label="t('form.login.password')" password />
            <template #submit-button>{{ t('authentication.login') }}</template>
        </BaseForm>
    </div>
</template>
<script lang="ts" setup>
import BaseForm from '@/components/BaseForm.vue';
import TextInput from '@/components/TextInput.vue';
import { MessageSchema } from '@/i18n';
import { useAuthStore } from '@/store/Authentication';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { t } = useI18n<MessageSchema>();

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