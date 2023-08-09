<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <ul class="products-container">
            <li v-for="product in productStore.products" :key="product.ProductId">
                <a :href="`#/product/${product.ProductId}`">
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

const productStore = useProductStore();
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
</style>