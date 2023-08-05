<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <div class="product-page" v-if="currentProduct">
            <div class="product-content">

                <img :src="currentProduct.Image" :alt="currentProduct.ProductName">
                <div class="data">
                    <h1>
                        {{ currentProduct.ProductName }}
                    </h1>
                    <div class="product-details">
                        <header>{{ t('product.details') }}</header>
                        <p>
                            {{ currentProduct.ProductDesc }}
                        </p>
                        <header>{{ t('product.price') }}</header>
                        <div class="price">
                            {{ currentProduct.Price }}₪
                        </div>
                    </div>

                    <div class="quantity">
                        <header>{{ t('product.quantity') }}:</header>
                        <button @click="increaseAmount">
                            <VIcon>mdi-plus</VIcon>
                        </button>
                        <span>{{ amount }}/{{ currentProduct.Stock }}</span>
                        <button @click="decreaseAmount">
                            <VIcon>mdi-minus</VIcon>
                        </button>
                    </div>
                    <div class="total-price">
                        <header>{{ t('product.finalPrice') }}</header>
                        <span>{{ price }}₪</span>
                    </div>
                </div>
                <!-- <div class="shipping">
                    Ship to
                </div> -->
            </div>
        </div>
    </LoadWrapper>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/Product';
import LoadWrapper from '@/components/LoadWrapper.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Locale, MessageSchema } from '@/i18n';
const { t } = useI18n<MessageSchema, Locale>();


const router = useRoute();
const productStore = useProductStore();
productStore.getProductById(router.params.id as string);
const currentProduct = computed(() => productStore.currentProduct);

const amount = ref(1);
function increaseAmount() {
    amount.value = Math.min(currentProduct.value!.Stock, amount.value + 1);
}
function decreaseAmount() {
    amount.value = Math.max(1, amount.value - 1);
}

const price = computed(() => (amount.value * currentProduct.value!.Price).toFixed(2));
</script>
<style scoped lang="scss">
.product-page {
    direction: rtl;
    display: flex;
    justify-content: center;
    padding-block: 1rem;

    &>* {
        width: max(95vw, 650px);
    }

    height: 80vh;
}

.product-content {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 1rem;
    height: 80vh;
}

img {
    max-height: 80vh;
    object-fit: cover;
    border-radius: 0.375rem;
    justify-self: center;
}

.data {

    h1 {
        font-weight: bold;
        font-size: 2.5rem;
        line-height: 1.25;
        margin-bottom: 1.5rem;
    }

    .product-details {
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        padding-block: 0.5rem;
        margin-bottom: 0.5rem;

        display: grid;
        grid-template-columns: auto 1fr;

        &>header {
            padding-inline-end: 1rem;
            text-decoration: underline;
            text-underline-offset: 0.25rem;
            text-align: end;

            &::after {
                content: ':';
            }
        }
    }

    p {
        font-size: 1.125rem;
        margin-bottom: 1em;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        line-height: 1;

        i.mdi {
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            padding: 0.75rem;
            background-color: gray;

            &:hover {
                background-color: rgb(79, 79, 79);
            }

            &:active {
                background-color: rgb(47, 47, 47);
            }
        }
    }
}
.total-price {
    display: flex;
    gap: 1rem;
    header {
        &::after {
            content: ':';
        }
    }
}
</style>