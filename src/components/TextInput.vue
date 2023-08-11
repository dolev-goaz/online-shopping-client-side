<template>
    <div class="input-block" :class="{required}">
        <p @click="() => inputField?.focus()" v-if="label">{{ label }}</p>
        <div class="input-container">
            <input :required="required" v-model="model" ref="inputField" v-bind="attrs" :type="inputType" />
            <VIcon :class="{hidden: !isPassword}" class="ml-2" @click="toggleShowPassword" size="20">{{ passwordVisibilityIcon }}</VIcon>
            <VIcon :class="{hidden: model == ''}" @click="onClear" size="20"> mdi-close </VIcon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue';
const attrs = useAttrs();
const props = withDefaults(defineProps<{
    label?: string;
    modelValue?: string;
    required?: boolean;
    type?: 'email' | 'text' | 'password';
}>(), {
    type: 'text'
});

const emit = defineEmits<{
    (e: 'update:modelValue', payload: string): void
}>();
const model = computed({
    get: () => props.modelValue || '',
    set(value: string) {
        emit('update:modelValue', value);
    }
});

const inputField = ref<HTMLInputElement>();

const showPassword = ref(false);

const isPassword  = computed(() => props.type === 'password');
const inputType = computed(() => {
    if (!isPassword.value) return props.type;
    return showPassword.value? 'text': 'password';
});

const passwordVisibilityIcon = computed(() => {
    if (!isPassword.value) return ''
    return showPassword.value? 'mdi-eye': 'mdi-eye-off'
});
function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
function onClear() {
    model.value = "";
    inputField.value?.focus();
}
</script>
<style scoped lang="scss">
.input-container {
    background-color: var(--clr-bg-light);
    color: var(--clr-fg-light);
    font-size: 1.5rem;
    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
    border: 1px solid darkgray;
    width: max-content
}
input {
    border-bottom: 1px solid transparent;
    color: var(--clr-fg);
    &:focus-visible {
        outline: none;
        border-bottom-color: var(--clr-fg-light);
    }
}
p {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
    margin-inline-start: 0.25rem;
}

i.v-icon {
    opacity: 1;
    transition: opacity 100ms ease-in-out;
    &.hidden {
        opacity: 0;
        pointer-events: none;
    }
}
.input-block.required {
    p {
        &::before {
            content: '*';
            margin-inline-end: 0.25rem;
            color: tomato;
        }
    }
}
</style>