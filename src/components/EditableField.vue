<template>
    <div style="position: relative;">
        <template v-if="!editMode">
            <component :is="tag">{{ model }}</component>
            <button class="edit-button" v-if="canEdit" @click="toggleEditMode">
                <VIcon>mdi-pencil-outline</VIcon>
            </button>
        </template>
        <template v-else>
            <TextInput v-model="model" @submit="toggleEditMode" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/Authentication';
import { ref, computed } from 'vue';
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
const canEdit = computed(() => authStore.isAdmin || true);
const editMode = ref(false);

function toggleEditMode() {
    editMode.value = !editMode.value;
}
</script>
<style lang="scss" scoped>
.edit-button {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    inset-inline-end: 0;
    font-size: 0.875rem;
    border-radius: 50%;
    padding: 0.25rem;
    background-color: lightgray;
}
</style>