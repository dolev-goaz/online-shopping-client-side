<template>
    <div class="register-page">
        <BaseForm @submit="onSubmit">
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

const { t } = useI18n<MessageSchema>();
const authStore = useAuthStore();
const router = useRouter();

type RegisterForm = {
    firstname: string;
    lastname: string;
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
        name: "firstname",
        type: "text"
    },
    {
        name: "lastname",
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
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: '',
    email: '',
    address: ''
});

async function onSubmit(data: RegisterForm) {
    if (data.password != data.repeatPassword) return;
    const success = await authStore.register(data);
    if (!success) return;

    router.push('/');
}

</script>

<style lang="scss" scoped>
.register-page {
    height: 80%;
    display: grid;
    place-items: center;
}
</style>