<template>
    <div style="display: flex; justify-content: center;">
        <form dir="rtl" @submit.prevent="onSubmit">
            <div class="inputs">
                <TextInput name="username" mandatory v-model="username" label="שם משתמש" />
                <TextInput name="password" mandatory v-model="password" label="סיסמא" password />
            </div>
            <MyButton type="submit">התחבר</MyButton>
        </form>
    </div>
</template>
<script lang="ts" setup>
import MyButton from '@/components/MyButton.vue';
import TextInput from '@/components/TextInput.vue';
import { ref } from 'vue';


const username = ref("");
const password = ref("");
function onSubmit(payload: Event) {
    debugger
    const formData = new FormData(payload.target as HTMLFormElement);
    console.log(formData);
    
}
</script>
<style scoped lang="scss">
.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
form > button[type=submit] {
    margin-block-start: 1.5rem;
}
form {
    display: flex;
    flex-direction: column;
    width: max-content;
}
</style>