<template>
    <template v-if="!editMode">
        <component :class="{editable: canEdit}" @click="openEditMode" :is="tag">{{ model }}</component>
    </template>
    <template v-else>
        <TextInput ref="inputField" v-model="innerValue" @submit="onSubmitInput" @blur="closeEditMode"
            @keypress.escape="closeEditMode" />
    </template>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/Authentication';
import { ref, computed, nextTick, watch } from 'vue';
import TextInput from './TextInput.vue';

const props = defineProps<{
    tag: string;
    modelValue: string;
    disabled?: boolean;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', payload: string): void
}>();
const model = computed({
    get: () => props.modelValue || '',
    set(value: string) {
        emit('update:modelValue', value);
    }
});

const authStore = useAuthStore();
const canEdit = computed(() => authStore.isAdmin && !props.disabled);
const editMode = ref(false);

const inputField = ref<InstanceType<typeof TextInput>>();

function openEditMode() {
    if (!canEdit.value) return;
    editMode.value = true;
    nextTick(() => {
        inputField.value?.focus();
    });
}

function closeEditMode() {
    innerValue.value = model.value;
    editMode.value = false;
}

const innerValue = ref("");
watch(model, () => {
    innerValue.value = model.value;
}, {
    immediate: true
})

function onSubmitInput() {
    model.value = innerValue.value;
    closeEditMode();
}
</script>
<style lang="scss" scoped>
.edit-button {
    position: absolute;
    top: 0;
    inset-inline-end: -1.125rem;
    font-size: 0.875rem;
    border-radius: 50%;
    padding: 0.25rem;
    background-color: lightgray;
}

.editable {
    position: relative;

    &::after {
        position: absolute;
        inset-inline-end: 1.125rem;
        top: -0.5rem;
        content: '\270E';

        scale: -1 1;
    }
}
</style>