<template>
    <article class="checkout">
        <header class="checkout-header">
            <div class="deal-id">
                {{ t('order.idFormat', { id: deal.dealId }) }}
            </div>
            <div class="view-order">
                <span>
                    לצפייה בהזמנה
                </span>
                <VIcon>mdi-arrow-left</VIcon>
            </div>
        </header>
        <ul class="purchase-container" v-for="purchase in deal.purchases" :key="purchase.product.Id">
            <li>
                <section class="purchase">
                    <ul class="product-images">
                        <li v-for="product in products" :key="product.Id">
                            <button class="image-btn" @click="() => onOpenProduct(product.Id)">
                                <VIcon>mdi-arrow-u-right-top</VIcon>
                                <img :src="product.Image" :alt="product.Title">
                            </button>
                        </li>
                    </ul>
                </section>
            </li>
        </ul>
    </article>
</template>
<script setup lang="ts">
import { Deal } from '@/@types/Model';
import { MessageSchema } from '@/i18n';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n<MessageSchema>();
const router = useRouter();

const props = defineProps<{
    deal: Deal;
}>();

const products = computed(() => props.deal.purchases.map((purchase) => purchase.product));

function onOpenProduct(productId: number) {
    router.push(`/product/${productId}`)
}
</script>
<style scoped lang="scss">
ul.product-images {
    list-style: none;
    height: 100%;

    img {

        height: calc(var(--checkout-height) - 2 * var(--padding));
        aspect-ratio: 1 / 1;
        object-fit: cover;
        display: block;
        border-radius: 0.25rem;
    }
}

header.checkout-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
header.checkout-header > .deal-id {
    font-size: 2rem;
    line-height: 1;
}

header.checkout-header > .view-order {
    color: var(--clr-accent);

    font-size: 1rem;

    & > i.mdi {
        font-size: 0.9375rem;
    }
}

.purchase-container {
    list-style: none;
}

article.checkout {
    display: flex;
    justify-content: space-between;
    border: 2px solid var(--clr-bg-dark);
    border-radius: 0.25rem;

    --checkout-height: 6.5rem;
    --padding: 1rem;

    padding: var(--padding);
    height: var(--checkout-height);
    overflow: hidden;
}

button.image-btn {
    position: relative;
    cursor: pointer;
}

button.image-btn>i.mdi {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.557);
    border-bottom-left-radius: 50%;
}
</style>