<template>
    <VDialog width="60%" v-model="model">
        <div class="checkout-dialog">
            <header>
                <div class="order-name">
                    {{ t('order.idFormat', { id: deal.id }) }}
                </div>
                <div class="order-date">
                    {{ d(deal.commitDate, 'long') }}
                </div>
            </header>
            <ul class="checkout-items">
                <li v-for="purchase in deal.purchases" :key="purchase.product.id">
                    <CheckoutPopupPurchase :purchase="purchase" />
                </li>
            </ul>
        </div>
    </VDialog>
</template>
<script setup lang="ts">
import { Deal } from '@/@types/Model';
import { MessageSchema } from '@/i18n';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CheckoutPopupPurchase from './CheckoutPopupPurchase.vue';
const { d, t } = useI18n<MessageSchema>();

const props = defineProps<{
    modelValue: boolean;
    deal: Deal;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', payload: boolean): void
}>();
const model = computed({
    get: () => props.modelValue || false,
    set(value: boolean) {
        emit('update:modelValue', value);
    }
});
</script>
<style lang="scss" scoped>
.checkout-dialog {
    background-color: var(--clr-bg-light);
    border-radius: 0.25rem;
    color: var(--clr-fg);
    padding: 1rem 2rem;
}

header {
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;

    &>.order-name {
        font-size: 1.75rem;
    }

    &>.order-date {
        font-size: 1.5rem;
        color: var(--clr-fg-light);
    }
    margin-bottom: 1rem;
}

ul.checkout-items {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-height: 70vh;
    overflow-y: auto;
    padding-inline-end: 1rem;
}
</style>