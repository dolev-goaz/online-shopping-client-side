<template>
    <ul class="checkouts-container">
        <li v-for="deal in deals" :key="deal.dealId">
            <article class="checkout">
                <header>{{ deal.dealId }}</header>
                <ul v-for="purchase in deal.purchases" :key="purchase.product.Id">
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
</template>
<script setup lang="ts">
import { Deal } from '@/@types/Model';

const props = defineProps<{
    deals: Deal[];
}>();
</script>
<style scoped lang="scss">
.checkouts-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
}

.checkout {
    border: 2px solid var(--clr-bg-dark);
}
</style>