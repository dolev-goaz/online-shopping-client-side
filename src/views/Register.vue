<template>
    <div class="register-page">
        <BaseForm @submit="onSubmit">
            <TextInput type="text" v-model="formData.username" name="username" required label="שם משתמש" />
            <TextInput type="password" v-model="formData.password" name="password" required label="סיסמא" />
            <TextInput type="password" v-model="formData.repeatPassword" name="repeatPassword" required label="שוב סיסמא" />
            <TextInput type="email" v-model="formData.mail" name="mail" required label="כתובת מייל" />
            <TextInput type="text" v-model="formData.address" name="address" required label="כתובת" />
            <template #submit-button>הרשמה</template>
        </BaseForm>
    </div>
</template>
<script setup lang="ts">
import BaseForm from '@/components/BaseForm.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';

type RegisterForm = {
    username: string;
    password: string;
    repeatPassword: string;
    mail: string;
    address: string;
}

const formData = ref<RegisterForm>({
    username: '',
    password: '',
    repeatPassword: '',
    mail: '',
    address: ''
});

function onSubmit(data: RegisterForm) {
    if (data.password != data.repeatPassword) return;
}

</script>

<style lang="scss" scoped>
.register-page {
    height: 80%;
    display: grid;
    place-items: center;
}
</style>