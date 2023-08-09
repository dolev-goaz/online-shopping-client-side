<template>
    <div class="cart-page">
        <ul class="cart-items">
            <li v-for="{product, count} in cart.products" :key="product.ProductId">
                <CartItem :product="product" :count="count" />
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue';
import { useCartStore } from '@/store/Cart';

const cart = useCartStore();

</script>
<style lang="scss" scoped>
.cart-page {
    padding-inline: 10rem;
}
.cart-items {
    list-style: none;
    padding: 0;
    background-color: var(--clr-bg);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>