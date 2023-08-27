<template>
    <div class="login-page">
        <div>
            <BaseForm :loading="loading" :disabled="loading" @submit="onSubmit">
                <TextInput type="text" v-model="mail" name="mail" required :label="t('form.login.mail')" />
                <TextInput type="password" v-model="password" name="password" required :label="t('form.login.password')" />
                <template #submit-button>{{ t('authentication.login') }}</template>
            </BaseForm>
            <RouterLink to="/register">
                {{ t('message.noUser') }}
            </RouterLink>
        </div>
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

const mail = ref("");
const password = ref("");

const loading = ref(false);

async function onSubmit(payload: Record<string, any>) {
    const { mail, password } = payload;
    loading.value = true;
    const user = await authStore.login(mail, password);
    loading.value = false;
    if (!user) {
        return;
    }
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

a {
    display: block;
    margin-top: 0.5rem;
    text-decoration: none;
    color: var(--clr-fg-light);

    &:hover {
        color: var(--clr-fg);
    }
}
</style>