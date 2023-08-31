<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <header class="products-header">
            חנות מוצרים
        </header>
        <ul class="products-container" v-if="showProductList">
            <li class="add-product" v-if="authStore.isAdmin">
                <RouterLink :to="{
                    path: 'product',
                    query: {
                        'new-product': 'true'
                    }
                }">
                    <VIcon>mdi-plus</VIcon>
                </RouterLink>
            </li>
            <li v-for="product in productStore.products" :key="product.id">
                <a :href="`#/product/${product.id}`">
                    <Product :product="product" />
                </a>
            </li>
        </ul>
        <header v-else class="empty-store">
            {{ t('message.emptyStore') }}
        </header>
    </LoadWrapper>
</template>
<script lang="ts" setup>
import LoadWrapper from '@/components/LoadWrapper.vue';
import Product from '@/components/Merchandise/Product.vue';
import { useProductStore } from '@/store/Product';
import { useAuthStore } from '@/store/Authentication';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';

const { t } = useI18n<MessageSchema>();

const productStore = useProductStore();
const authStore = useAuthStore();
productStore.getProducts();

const showProductList = computed(() => productStore.products.length > 0 || authStore.isAdmin);

</script>
<style lang="scss" scoped>

header.products-header {
    text-align: center;
    font-size: 3rem;
    color: var(--clr-fg-light);
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-shadow: 4px 4px 4px rgba(black, 0.4);
}
.empty-store {
    text-align: center;
    font-size: 4rem;
}

.products-container {
    --items-per-row: 4;
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(var(--items-per-row), 1fr);
    padding-block: 1rem 2.5rem;
    width: min(90%, 100rem);
    margin-inline: auto;
}

@for $i from 1 through 3 {
    @media (max-width: calc((4 - $i) * 30rem)) {
        .products-container {
            --items-per-row: calc(4 - #{$i});
        }
    }

}

ul {
    list-style: none;
    padding: 0;
}

a {
    text-decoration: none;
}

ul>li {
    // aspect-ratio: 3 / 4;

    &>a,
    &>a>.product {
        display: block;
        height: 100%;
    }
}

.add-product {
    border-radius: 0.5rem;
    overflow: hidden;
    --_clr: var(--clr-fg-light);
    --_clr-bg: var(--clr-bg);
    --_transition-duration: 250ms;
    border: 1px solid var(--_clr);
    transition: border var(--_transition-duration) ease;

    &>a {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;

        &>i.mdi {
            color: var(--_clr);
            font-size: 7rem;
            border-radius: 50%;
            width: 10rem;
            height: 10rem;
            border: 1px solid var(--_clr);
            display: grid;
            background-color: var(--_clr-bg);
            transition: background-color var(--_transition-duration) ease,
                border-color var(--_transition-duration) ease,
                color var(--_transition-duration) ease;
        }
    }

    &:hover {
        --_clr-bg: var(--clr-bg-light);
        --_clr: var(--clr-fg);
    }
}</style>