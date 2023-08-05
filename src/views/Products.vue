<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <div class="products-page">
            <ul class="products-container">
                <li v-for="product in productStore.products" :key="product.ProductId">
                    <a :href="`#/product/${product.ProductId}`">
                        <Product :product="product" />
                    </a>
                </li>
            </ul>
        </div>
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
.products-page {
    padding-inline: 20rem;
}

.products-container {
    margin-top: 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    padding: 1rem;
}

ul {
    list-style: none;
    padding: 0;
}

a {
    text-decoration: none;
}
</style>