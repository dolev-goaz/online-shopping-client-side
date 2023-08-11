<template>
    <article class="cart-item">
        <button class="image-btn" @click="onOpenProduct">
            <VIcon>mdi-arrow-u-right-top</VIcon>
            <img :src="product.Image" :alt="product.ProductName">
        </button>
        <section>
            <header>
                <span>
                    {{ product.ProductName }}
                </span>
                <button class="delete" type="button" @click="onDelete">
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
                        {{ t('currency', { value: totalPrice }) }}
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
import { useRouter } from "vue-router";
const router = useRouter()

const props = defineProps<{
    product: Product;
    count: number;
}>();
const emit = defineEmits<{
    (event: 'delete'): void;
}>();
const { t } = useI18n<MessageSchema>();
const totalPrice = computed(() => (props.product.Price * props.count).toFixed(2))
function onOpenProduct() {
    router.push(`/product/${props.product.ProductId}`)
}
function onDelete() {
    emit('delete');
}
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