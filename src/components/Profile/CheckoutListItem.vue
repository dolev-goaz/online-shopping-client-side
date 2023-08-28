<template>
    <article class="checkout">
        <header class="checkout-header">
            <div class="deal-id">
                {{ t('order.idFormat', { id: deal.id }) }}
            </div>
            <button class="view-order" @click="onViewOrder">
                <span>
                    לצפייה בהזמנה
                </span>
                <VIcon>mdi-arrow-left</VIcon>
            </button>
        </header>
        <div class="deal-date">
            {{ d(deal.commitDate, 'long') }}
        </div>
        <section class="purchase">
            <ul class="product-images">
                <li class="extra-images" v-if="products.length > shownProducts.length">
                    {{ products.length - shownProducts.length }}+
                </li>
                <li v-for="product in shownProducts" :key="product.id">
                    <button class="image-btn" @click="() => onOpenProduct(product.id)">
                        <VIcon>mdi-arrow-u-right-top</VIcon>
                        <img :src="product.imagePath" :alt="product.title">
                    </button>
                </li>
            </ul>
        </section>
    </article>
    <CheckoutPopup v-model="showOrder" :deal="deal" />
</template>
<script setup lang="ts">
import { Deal } from '@/@types/Model';
import { MessageSchema } from '@/i18n';
import { ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import CheckoutPopup from "./CheckoutPopup.vue"

const { d, t } = useI18n<MessageSchema>();
const router = useRouter();

const props = defineProps<{
    deal: Deal;
}>();

const products = computed(() => props.deal.purchases.map((purchase) => purchase.product));
const showProductCount = 3;
const shownProducts = computed(() =>
    products.value.length <= showProductCount
        ? products.value
        : products.value.slice(0, showProductCount - 1)
);

function onOpenProduct(productId: number) {
    router.push(`/product/${productId}`)
}

const showOrder = ref(false);
function onViewOrder() {
    showOrder.value = true;
}
</script>
<style scoped lang="scss">
ul.product-images {
    list-style: none;
    height: 100%;
    display: flex;
    gap: var(--item-gap);
    justify-content: end;

    img {

        height: calc(var(--checkout-height) - 2 * var(--padding));
        aspect-ratio: 1 / 1;
        object-fit: cover;
        display: block;
        border-radius: 0.25rem;
    }
}

.extra-images {
    height: calc(var(--checkout-height) - 2 * var(--padding));
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border: 1px solid gray;
    border-radius: 0.25rem;
    box-sizing: border-box;
    direction: rtl;

    user-select: none;
}

.purchase {
    --item-width: calc(var(--checkout-height) - 2 * var(--padding));
    --item-gap: 0.5rem;
    --show-product-count: 3;
    width: calc(var(--show-product-count) * var(--item-width) + (var(--show-product-count) - 1) * var(--item-gap));
    flex-grow: 0;
    flex-shrink: 0;
}

header.checkout-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

header.checkout-header>.deal-id {
    font-size: 2rem;
    line-height: 1;
}

header.checkout-header>.view-order {
    color: var(--clr-accent);

    font-size: 1rem;

    &>i.mdi {
        font-size: 0.9375rem;
    }
}

.deal-date {
    margin-block: auto;
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