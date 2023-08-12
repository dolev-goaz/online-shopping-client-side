<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <div class="product-page" v-if="currentProduct">
            <div class="product-content">

                <ImagePreview class="image" :src="currentProduct.Image" :alt="currentProduct.Title" />
                <div class="data">
                    <EditableField tag="h1" v-model="currentProduct.Title" />
                    <div class="product-details">
                        <header>{{ t('product.details') }}</header>
                        <EditableField tag="p" v-model="currentProduct.Description" />
                        <header>{{ t('product.price') }}</header>
                        <EditableField tag="div" class="price" v-model="priceProxy" />
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
                        <span>{{ t('currency', { value: price }) }}</span>
                    </div>
                    <div class="actions">
                        <MyButton :disabled="!currentProduct || !currentProduct.Stock" @click="onPurchase">
                            {{ t('actions.addToCart') }}
                        </MyButton>
                    </div>
                </div>
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
import ImagePreview from '@/components/ImagePreview.vue';
import MyButton from '@/components/MyButton.vue';
import { useCartStore } from '@/store/Cart';
import EditableField from '@/components/EditableField.vue';
const { t } = useI18n<MessageSchema, Locale>();

const router = useRoute();
const productStore = useProductStore();
const productId = computed(() => router.params.id as string);
productStore.getProductById(productId.value);
const currentProduct = computed(() => productStore.currentProduct);

const amount = ref(1);
function increaseAmount() {
    amount.value = Math.min(currentProduct.value!.Stock, amount.value + 1);
}
function decreaseAmount() {
    amount.value = Math.max(1, amount.value - 1);
}

const price = computed(() => (amount.value * currentProduct.value!.Price).toFixed(2));

const cartStore = useCartStore();
function onPurchase() {
    if (!cartStore.addItem(productId.value, amount.value)) {
        alert("אירעה שגיאה. אנא נסה שוב..");
        return;
    }
    amount.value = Math.min(1, currentProduct.value!.Stock);
}

const priceProxy = computed({
    get: () => t('currency', { value: price.value }),
    set(value: string) {
        const innerValue = value.endsWith(t('currencySymbol')) ? value.substring(0, value.length - 1) : value;
        currentProduct.value!.Price = parseFloat(innerValue);
    }
});

</script>
<style lang="scss">
.product-content img.image {
    max-height: 80vh;
    object-fit: cover;
    border-radius: 0.375rem;
}

.product-page .data {

    h1 {
        font-weight: bold;
        font-size: 2.5rem;
        line-height: 1.25;
        margin-bottom: 1.5rem;
    }

    p {
        font-size: 1.125rem;
        margin-bottom: 1em;
    }
}
</style>
<style scoped lang="scss">
.product-page {
    display: flex;
    justify-content: center;
    padding-block: 1rem;

    &>* {
        width: max(95vw, 650px);
    }

    height: 80vh;
}

.actions {
    display: flex;
    justify-content: center;
}

.product-content {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 1rem;
    height: 80vh;
}

.image {
    justify-self: center;
}

.data {
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
            background-color: var(--clr-bg-dark);
            color: var(--clr-fg-light);

            &:hover {
                filter: brightness(0.9);
            }

            &:active {
                filter: brightness(0.8);
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