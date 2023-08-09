<template>
    <article class="cart-item">
        <img :src="product.Image" :alt="product.ProductName">
        <header>
            {{ product.ProductName }}
        </header>
        <p>
            {{ product.ProductDesc }}
        </p>
    </article>
</template>
<script lang="ts" setup>
import { type Product } from "@/@types/Model"
const props = defineProps<{
    product: Product;
    count: number;
}>();
</script>
<style lang="scss" scoped>
.cart-item {
    gap: 1rem;
    background-color: white;
    color: black;

    display: grid;
    grid-template-areas:
        'p h b'
        'p d b'
        '_ _ b';

    grid-template-columns: 8rem 1fr 15rem;

    padding: 1.625rem;
    box-shadow: 0 20px 24px -20px rgba(0,0,0,.1);
}

.cart-item>img {
    grid-area: p;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
}

.cart-item>header {
    grid-area: h;
    font-weight: bold;
    font-size: 1.375rem;
    color: var(--clr-fg);
}
.cart-item>p {
    grid-area: d;
    line-height: 1.5rem;
    max-height: 4.5rem;
    overflow: hidden;
    color: var(--clr-fg-light);
}
</style>