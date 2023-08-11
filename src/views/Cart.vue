<template>
    <div class="cart-page">
        <TransitionGroup tag="ul" class="cart-list" name="cart-list">
            <li v-for="{product, count} in cart.products" :key="product.ProductId">
                <CartItem :product="product" :count="count" @delete="() => onDeleteProduct(product.ProductId)" />
            </li>
        </TransitionGroup>
    </div>
</template>
<script setup lang="ts">
import { Product } from '@/@types/Model';
import CartItem from '@/components/Cart/CartItem.vue';
import { useCartStore } from '@/store/Cart';

const cart = useCartStore();

function onDeleteProduct(productId: string) {
    cart.removeItem(productId);
}
</script>
<style lang="scss" scoped>
.cart-page {
    padding-inline: 10rem;
}
.cart-list {
    list-style: none;
    padding: 0;
    background-color: var(--clr-bg);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block: 1rem;
}

.cart-list-enter-active,
.cart-list-leave-active {
  transition: all 0.5s ease;
}

.cart-list-enter-from,
.cart-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>