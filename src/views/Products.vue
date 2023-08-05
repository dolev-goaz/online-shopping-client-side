<template>
    <div class="products-page">
        <ul class="products-container">
            <li v-for="product in productStore.products" :key="product.ProductId" >
                <Product :product="product" />
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
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
</style>