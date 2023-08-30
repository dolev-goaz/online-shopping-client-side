<template>
    <div class="register-page">
        <BaseForm :loading="loading" :disabled="loading" @submit="onSubmit">
            <TextInput v-for="field in fields" :key="field.name" v-model="formData[field.name]" required :type="field.type"
                :name="field.name" :label="t(`form.register.${field.name}`)" />
            <template #submit-button>{{ t('authentication.registration') }}</template>
        </BaseForm>
    </div>
</template>
<script setup lang="ts">
import BaseForm from '@/components/BaseForm.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store/Authentication';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
import { useMessageStore } from '@/store/Message';

const { t } = useI18n<MessageSchema>();
const authStore = useAuthStore();
const router = useRouter();

type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    address: string;
}

type RegisterFormField = {
    [TKey in keyof RegisterForm]: {
        name: TKey,
        type: "text" | "password" | "email"
    }
}[keyof RegisterForm]

const fields: readonly RegisterFormField[] = [
    {
        name: "firstName",
        type: "text"
    },
    {
        name: "lastName",
        type: "text"
    },
    {
        name: "email",
        type: "email"
    },
    {
        name: "password",
        type: "password"
    },
    {
        name: "repeatPassword",
        type: "password"
    },
    {
        name: "address",
        type: "text"
    },
] as const;

const formData = ref<RegisterForm>({
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    email: '',
    address: ''
});
const loading = ref(false);

async function onSubmit(data: RegisterForm) {
    if (data.password != data.repeatPassword) {
        useMessageStore().errorMessage(t('message.error.passwordUnmatch'));
        return;
    }
    loading.value = true;
    const success = await authStore.register(data);
    loading.value = false;
    if (!success) return;

    const previous = router.options.history.state.back as string;
    const hasRedirectFrom = previous !== null && !['/login', '/register'].includes(previous);
    if (hasRedirectFrom) {
        router.go(-1);
    } else {
        router.push({
            name: 'products'
        });
    }
}

</script>

<style lang="scss" scoped>
.register-page {
    height: 80%;
    display: grid;
    place-items: center;
}
</style>