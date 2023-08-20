<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <ul class="products-container">
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
    </LoadWrapper>
</template>
<script lang="ts" setup>
import LoadWrapper from '@/components/LoadWrapper.vue';
import Product from '@/components/Merchandise/Product.vue';
import { useProductStore } from '@/store/Product';
import { useAuthStore } from '@/store/Authentication';

const productStore = useProductStore();
const authStore = useAuthStore();
productStore.getProducts();


</script>
<style lang="scss" scoped>
.products-container {
    --items-per-row: 4;
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(var(--items-per-row), 1fr);
    padding: 1rem;
    width: min(90%, 100rem);
    margin-inline: auto;
}

@for $i from 1 through 3 {
    @media (max-width: calc((4 - $i) * 35rem)) {
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

ul > li {
    aspect-ratio: 3 / 4;
    &>a, &>a>.product {
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
}
</style>