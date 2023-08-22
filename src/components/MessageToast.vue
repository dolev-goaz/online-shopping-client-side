<template>
    <Transition name="message-appear">
        <div class="message" :class="message.type" v-if="message">
            <VIcon>{{ icon }}</VIcon>
            <span>
                {{ message.text }}
            </span>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
import { Message, useMessageStore } from '@/store/Message';
import { computed } from 'vue';

const messageStore = useMessageStore();
const message = computed(() => messageStore.message);


const iconPath: Record<Message['type'], string> = {
    error: 'mdi-close-circle',
    success: 'mdi-check-circle',
    warning: 'mdi-alert-circle'
}
const icon = computed(() => message.value ? iconPath[message.value.type] : '');
</script>
<style lang="scss" scoped>
.message {
    direction: rtl;
    
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border-radius: 0.375rem;
    padding: 0.5rem 1rem;

    &.error {
        background-color: rgb(209, 65, 40);
        color: white;
    }
    &.success {
        background-color: rgb(56, 231, 29);
        color: white;
    }
    &.warning {
        background-color: rgb(255, 180, 42);
        color: white;
    }
}

.message-appear-enter-active,
.message-appear-leave-active {
    transition: opacity 0.5s ease;
}

.message-appear-enter-from,
.message-appear-leave-to {
    opacity: 0;
}
</style>