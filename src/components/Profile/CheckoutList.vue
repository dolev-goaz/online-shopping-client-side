<template>
    <div class="checkout-list">
        <header class="list-header">
            <strong>
                {{ t('order.orders') }}
            </strong>
            <div class="orders-info">
                <div>
                    {{ t('order.countFormat', { count: deals.length }) }}
                </div>
                <div>
                    {{ t('product.countFormat', { count: productCount }) }}
                </div>
            </div>
        </header>
        <ul class="checkouts-container">
            <li v-for="deal in deals" :key="deal.dealId">
                <CheckoutListItem :deal="deal" />
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
import { computed } from 'vue';
import CheckoutListItem from './CheckoutListItem.vue';
import { useDealStore } from '@/store/Deal';
const { t } = useI18n<MessageSchema>();

const dealStore = useDealStore();
dealStore.getAllDeals();

const deals = computed(() => dealStore.deals);

const productCount = computed(() =>
    deals.value
        .map((deal) => deal.purchases)
        .flat()
        .map((purchase) => purchase.amount)
        .reduce((sum, current) => sum + current, 0)
);
</script>
<style scoped lang="scss">
header.list-header {
    strong {
        font-size: 2rem;
        color: var(--clr-fg-light);
    }

    .orders-info {
        display: flex;
        gap: 0.75rem;
    }

    margin-bottom: 1rem;
}

.checkouts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
}
</style>