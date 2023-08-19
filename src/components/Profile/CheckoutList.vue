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
                <article class="checkout">
                    <header>{{ t('order.idFormat', { id: deal.dealId }) }}</header>
                    <ul class="purchase-container" v-for="purchase in deal.purchases" :key="purchase.product.Id">
                        <li>
                            <section class="purchase">
                                <header>
                                    {{ purchase.product.Title }}
                                </header>
                                <div>
                                    {{ purchase.amount }}
                                    {{ purchase.price }}
                                </div>
                            </section>
                        </li>
                    </ul>
                </article>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { Deal } from '@/@types/Model';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
import { computed } from 'vue';
const { t } = useI18n<MessageSchema>();

const props = defineProps<{
    deals: Deal[];
}>();

const productCount = computed(() =>
    props.deals
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

.purchase-container {
    list-style: none;
}

.checkout {
    border: 2px solid var(--clr-bg-dark);
}

article.checkout {
    display: flex;
}
</style>