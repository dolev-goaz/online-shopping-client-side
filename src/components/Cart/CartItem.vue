<template>
    <article class="cart-item">
        <img :src="product.Image" :alt="product.ProductName">
        <section>
            <header>
                <span>
                    {{ product.ProductName }}
                </span>
                <button class="delete">
                    <VIcon color="lightgrey">mdi-trash-can-outline</VIcon>
                </button>
            </header>
            <div class="item-details">
                <p>
                    {{ product.ProductDesc }}
                </p>
                <div class="purchase-details">
                    <div class="quantity">
                        <span>
                            {{ t('product.quantity') }}
                        </span>
                        <span>
                            {{ count }}
                        </span>
                    </div>
                    <div class="price">
                        {{ totalPrice }}
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>
<script lang="ts" setup>
import { type Product } from "@/@types/Model"
import { MessageSchema } from "@/i18n";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps<{
    product: Product;
    count: number;
}>();
const { t } = useI18n<MessageSchema>();
const totalPrice = computed(() => (props.product.Price * props.count).toFixed(2))
</script>
<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;

    &>span {
        font-weight: bold;
        font-size: 1.375rem;
        color: var(--clr-fg);
    }
}

article.cart-item {
    direction: rtl;
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
    background-color: var(--clr-bg-light);

    padding: 1.625rem;
    box-shadow: 0 20px 24px -20px rgba(0, 0, 0, .1);
}

.cart-item>img {
    width: 7rem;
    aspect-ratio: 1;
    object-fit: cover;
}

section {
    width: 100%;
}

.item-details {
    display: flex;
    flex-direction: column;
}

.item-details>p {
    display: flex;
    text-align: start;
    line-height: 1.5rem;
    max-height: 4.5rem;
    overflow: hidden;
    color: var(--clr-fg-light);
}

.quantity {
    font-size: 0.875rem;
    span:first-child {
        color: var(--clr-fg);
        &::after {
            content: ': ';
        }
    }
    span:last-child {
        color: var(--clr-fg-light)
    }
}
.price {
    &::after {
        content: '₪';
    }
}

.purchase-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

button.delete {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background-color: #ffb5b5;
    color: darkred;

    &:hover {
        filter: brightness(1.1);
    }

    &:active {
        filter: brightness(1.2);
    }
}</style>