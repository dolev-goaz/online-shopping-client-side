<template>
    <div class="product">
        <img draggable="false" :src="product.imagePath ?? fallbackImage" :alt="product.title">
        <div class="details-container">
            <div class="name overflow-dots" :title="product.title">{{ product.title }}</div>
            <p class="description overflow-dots" :title="product.description">{{ product.description }}</p>
            <div class="price">{{ t('currency', {value: product.price}) }}</div>
        </div>
        <div class="out-of-stock-overlay" v-if="product.stock == 0">
            <span>
                {{ t('product.outOfStock') }}
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type Product } from "@/@types/Model";
import { MessageSchema } from "@/i18n";
import { fallbackImage } from "@/store/Product";
import { useI18n } from "vue-i18n";
const { t } = useI18n<MessageSchema>();

const props = defineProps<{
    product: Product;
}>();
</script>
<style lang="scss" scoped>
.out-of-stock-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    --overlay-color: #777777a1;
    background-image: repeating-linear-gradient(-45deg,
            var(--overlay-color),
            var(--overlay-color) 10px,
            transparent 10px,
            transparent 45px);
    display: grid;
    place-items: center;

    &>span {
        color: #f73715;
        font-weight: bold;
        font-size: 2.5rem;
        text-shadow: rgb(45, 0, 0) 1px 0 20px;
        rotate: 22.5deg;
    }
}

.product {
    isolation: isolate;
    position: relative;
    user-select: none;
    background-color:  var(--clr-accent-light);

    cursor: pointer;
    box-shadow: 0px 0px 20px 1px rgba(black, 0.268);

    transition: scale 250ms ease-in-out,
        box-shadow 350ms ease-in-out;

    &:hover {
        scale: 1.125;
        box-shadow: 0px 0px 20px 1px black;
        z-index: 2;
    }


    border-radius: 0.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
}

.details-container {
    padding: 0.5rem;
    text-align: right;

    flex-grow: 1;
    display: grid;
    grid-template-areas:
        "n n n n"
        "d d d d"
        "_ _ _ p";
}

.name {
    grid-area: n;
    font-weight: bold;
    font-size: 1.25rem;
    color: var(--clr-fg);
}

.description {
    grid-area: d;
    color: var(--clr-fg-light);
}

.price {
    text-align: center;
    grid-area: p;
    color: var(--clr-fg);
}

img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    grid-area: i;
}
</style>