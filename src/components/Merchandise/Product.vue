<template>
    <div class="product">
        <img draggable="false" :src="product.Image" :alt="product.ProductName">
        <div class="details-container">
            <div class="name overflow-dots" :title="product.ProductName">{{ product.ProductName }}</div>
            <p class="description overflow-dots" :title="product.ProductDesc">{{ product.ProductDesc }}</p>
            <div class="price">{{ product.Price }}₪</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Product } from "@/@types/Model"
const props = defineProps<{
    product: Product;
}>();
</script>
<style lang="scss" scoped>
.product {
    user-select: none;
    background-color: lightgray;
    aspect-ratio: 3 / 4;

    cursor: pointer;
    transition: scale 250ms ease-in-out,
        box-shadow 350ms ease-in-out;

    &:hover {
        scale: 1.125;
        box-shadow: 0px 0px 20px 1px black;
    }


    border-radius: 0.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
}

.details-container {
    padding: 0.5rem;
    direction: rtl;
    text-align: right;

    flex-grow: 1;
    display: grid;
    grid-template-areas:
        "n n n"
        "d d d"
        "_ _ p";
    color: black;
}

.name {
    grid-area: n;
    font-weight: bold;
    font-size: 1.25rem;
}

.description {
    grid-area: d;
}

.price {
    grid-area: p;
}

img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    grid-area: i;
}
</style>