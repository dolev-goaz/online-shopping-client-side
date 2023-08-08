<template>
    <div>
        <ul class="cart-items">
            <li v-for="{product, count} in cart.products" :key="product.ProductId">
                <input type="checkbox" :value="product.ProductId" />
                <img :src="product.Image" :alt="product.ProductName">
                <label>
                    {{ product.ProductName }}
                </label>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useCartStore } from '@/store/Cart';

const cart = useCartStore();

</script>
<style lang="scss" scoped>
li {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
        width: 7rem;
        aspect-ratio: 1;
        object-fit: cover;
    }
}
</style>