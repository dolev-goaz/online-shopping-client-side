<template>
    <div style="position: relative;">
        <template v-if="!editMode">
            <component :is="tag">{{ model }}</component>
            <button class="edit-button" v-if="canEdit" @click="openEditMode">
                <VIcon>mdi-pencil-outline</VIcon>
            </button>
        </template>
        <template v-else>
            <TextInput ref="inputField" v-model="innerValue" @submit="onSubmitInput" @blur="closeEditMode"
                @keypress.escape="closeEditMode" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/Authentication';
import { ref, computed, nextTick, watch } from 'vue';
import TextInput from './TextInput.vue';

const props = defineProps<{
    tag: string;
    modelValue: string;
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
const canEdit = computed(() => authStore.isAdmin);
const editMode = ref(false);

const inputField = ref<InstanceType<typeof TextInput>>();

function openEditMode() {
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
</style>