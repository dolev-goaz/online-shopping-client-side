<template>
    <form @submit.prevent="onSubmit">
        <div class="inputs">
            <slot />
        </div>
        <MyButton type="submit">
            <slot name="submit-button" />
        </MyButton>
    </form>
</template>
<script lang="ts" setup>
import MyButton from './MyButton.vue';

const emit = defineEmits<{
    (event: 'submit', payload: any): void;
}>();
async function onSubmit(event: Event) {
    const formData = new FormData(event.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    emit('submit', payload);
}

</script>
<style lang="scss" scoped>
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