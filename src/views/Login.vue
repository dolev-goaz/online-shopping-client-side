<template>
    <div style="display: flex; justify-content: center;">
        <form @submit.prevent="onSubmit">
            <div class="inputs">
                <TextInput v-model="username" name="username" required label="שם משתמש" />
                <TextInput v-model="password" name="password" required label="סיסמא" password />
            </div>
            <MyButton type="submit">התחבר</MyButton>
        </form>
    </div>
</template>
<script lang="ts" setup>
import MyButton from '@/components/MyButton.vue';
import TextInput from '@/components/TextInput.vue';
import { useAuthStore } from '@/store/Authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

async function onSubmit(payload: Event) {
    const formData = new FormData(payload.target as HTMLFormElement);
    const { username, password } = Object.fromEntries(formData) as Record<string, string>;
    const user = await authStore.login(username, password);
    router.push({
        name: 'products'
    })
}
</script>
<style scoped lang="scss">
.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

form>button[type=submit] {
    margin-block-start: 1.5rem;
}

form {
    display: flex;
    flex-direction: column;
    width: max-content;
}
</style>