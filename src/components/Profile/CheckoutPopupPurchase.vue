<template>
    <article class="cart-item">
        <button class="image-btn" @click="() => onOpenProduct(purchase.product.id)">
            <VIcon>mdi-arrow-u-right-top</VIcon>
            <img :src="purchase.product.imagePath" :alt="purchase.product.title">
        </button>
        <section>
            <header>
                {{ purchase.product.title }}
            </header>
            <div class="item-details">
                <p>
                    {{ purchase.product.description }}
                </p>
                <div class="quantity">
                    <span>
                        {{ t('product.quantity') }}
                    </span>
                    <span>{{ purchase.amount }}</span>
                </div>
                <div>
                    מחיר למוצר:
                    {{ t('currency', { value: purchase.price }) }}
                </div>
                <div>
                    מחיר כולל:
                    {{ t('currency', { value: purchase.price * purchase.amount }) }}
                </div>
            </div>
        </section>
    </article>
</template>
<script setup lang="ts">
import { Purchase } from '@/@types/Model';
import { MessageSchema } from '@/i18n';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { d, t } = useI18n<MessageSchema>();
const router = useRouter();

const props = defineProps<{
    purchase: Purchase
}>();
function onOpenProduct(productId: number) {
    router.push(`/product/${productId}`)
}
</script>
<style lang="scss" scoped>
article.cart-item {
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
    background-color: var(--clr-bg-light);

    padding: 1rem;
    border: 1px solid var(--clr-fg);
}

article header {
    font-weight: bold;
    font-size: 1.375rem;
    color: var(--clr-fg);
}

.cart-item>button.image-btn {
    position: relative;
    cursor: pointer;
}

.cart-item>button.image-btn>i.mdi {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.557);
    border-bottom-left-radius: 50%;
}

.cart-item>button.image-btn>img {
    width: 7rem;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.25rem;
    display: block;
}

section {
    width: 100%;
}

.item-details {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
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

.purchase-details {}

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
}
</style>