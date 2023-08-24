<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <div class="product-page" v-if="editedProduct">
            <div class="product-content">
                <div class="image-wrapper">
                    <input v-if="authStore.isAdmin" type="file" id="product-image" @change="onSetImage" />
                    <label for="product-image">
                        <ImagePreview class="image" :src="editedProduct.imagePath ?? fallbackImage" :alt="editedProduct.title" />
                    </label>
                </div>
                <div class="data">
                    <EditableField tag="h1" v-model="editedProduct.title" />
                    <div class="product-details">
                        <header>{{ t('product.details') }}</header>
                        <EditableField tag="p" v-model="editedProduct.description" />
                        <header>{{ t('product.price') }}</header>
                        <EditableField tag="div" class="price" v-model="priceProxy" />
                    </div>

                    <div class="quantity">
                        <header>{{ authStore.isAdmin ? t('product.stock') : t('product.quantity') }}:</header>
                        <NumberInput :hide-controls="authStore.isAdmin" :min="0" :max="editedProduct.stock"
                            v-model="amount">
                            <span>
                                <template v-if="!authStore.isAdmin">
                                    <span>
                                        {{ amount }}
                                    </span>
                                    <span>/</span>
                                </template>
                                <EditableField tag="span" class="price" v-model="stockProxy" />
                            </span>
                        </NumberInput>
                    </div>
                    <div class="total-price" v-if="!authStore.isAdmin">
                        <header>{{ t('product.finalPrice') }}</header>
                        <span>{{ t('currency', { value: price }) }}</span>
                    </div>
                    <div class="actions">
                        <MyButton :loading="loadingSave" v-if="authStore.isAdmin" :disabled="!wasProductChanged || loadingSave"
                            @click="onSaveChanges">
                            {{ t('actions.saveChanges') }}
                        </MyButton>
                        <MyButton v-else :disabled="!currentProduct || !currentProduct.stock" @click="onPurchase">
                            {{ t('actions.addToCart') }}
                        </MyButton>
                    </div>
                </div>
            </div>
        </div>
    </LoadWrapper>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useProductStore, fallbackImage } from '@/store/Product';
import LoadWrapper from '@/components/LoadWrapper.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Locale, MessageSchema } from '@/i18n';
import ImagePreview from '@/components/ImagePreview.vue';
import MyButton from '@/components/MyButton.vue';
import { useCartStore } from '@/store/Cart';
import EditableField from '@/components/EditableField.vue';
import { Product } from '@/@types/Model';
import { useAuthStore } from '@/store/Authentication';
import NumberInput from '@/components/NumberInput.vue';
const { t } = useI18n<MessageSchema, Locale>();

const router = useRouter();
const route = useRoute();

const isCreateNew = computed(() => route.query['new-product'] == 'true');
const productId = computed(() => parseInt(route.params.id as string));

const productStore = useProductStore();
const currentProduct = computed(() => productStore.currentProduct);
const editedProduct = ref<Product | null>(null);


onMounted(() => {
    if (isCreateNew.value) {
        if (!authStore.isAdmin) {
            router.push('/')
            return;
        }
        editedProduct.value = {
            id: -1,
            title: t('placeholder.product.title'),
            description: t('placeholder.product.description'),
            imagePath: undefined,
            price: 0,
            stock: 0,
        }
        return;
    }
    editedProduct.value = { ...currentProduct.value! };
});
watch(productId, async () => {
    if (isCreateNew.value || isNaN(productId.value)) return; // when redirecting
    await productStore.getProductById(productId.value);
    if (!currentProduct.value) {
        router.push('/');
        return;
    }
    editedProduct.value = { ...currentProduct.value! };
    uploadImage.value = undefined;
}, {
    immediate: true
});

const amount = ref(1);
function clampCount(desired: number) {
    const maxStock = editedProduct.value?.stock ?? Infinity;
    return Math.min(Math.max(desired, 0), maxStock);
}
watch(amount, () => {
    amount.value = clampCount(amount.value);
}, {
    immediate: true
});

const cartStore = useCartStore();
function onPurchase() {
    if (!cartStore.addItemCount(productId.value, amount.value)) {
        return;
    }
    editedProduct.value!.stock = currentProduct.value!.stock;
    amount.value = clampCount(1);
}

const price = computed(() => (amount.value * editedProduct.value!.price).toFixed(2));
const priceProxy = computed({
    get: () => t('currency', { value: price.value }),
    set(value: string) {
        const innerValue = value.endsWith(t('currencySymbol')) ? value.substring(0, value.length - 1) : value;
        const parsed = parseFloat(innerValue);
        if (isNaN(parsed)) {
            return;
        }
        editedProduct.value!.price = parseFloat(innerValue);
    }
});

const stockProxy = computed({
    get: () => (editedProduct.value?.stock ?? 0).toString(),
    set(newValue: string) {
        editedProduct.value!.stock = parseInt(newValue);
    }
})

const authStore = useAuthStore();
const loadingSave = ref(false);
const wasProductChanged = computed(() => {
    if (!editedProduct.value) return false;
    if (uploadImage.value) return true;

    if (isCreateNew.value) {
        return editedProduct.value.price != 0 &&
            editedProduct.value.title != t('placeholder.product.title') &&
            editedProduct.value.description != t('placeholder.product.description') &&
            editedProduct.value.stock != 0;
    }
    if (!currentProduct.value) return;
    const keys = Object.keys(currentProduct.value) as Array<keyof Product>;
    return !keys.every((key) => currentProduct.value![key] === editedProduct.value![key]);
});

const uploadImage = ref<File>();

function onSetImage(event: Event) {
    const target =<HTMLInputElement>event.target;
    const files = [...target.files!]
    if (files.length == 0) return;
    uploadImage.value = files[0];

    editedProduct.value!.imagePath = URL.createObjectURL(uploadImage.value);
}

async function onSaveChanges() {
    if (!editedProduct.value) return;
    const saveMethod = isCreateNew.value ? productStore.createProduct : productStore.updateProduct;
    loadingSave.value = true;
    const success = await saveMethod(editedProduct.value, uploadImage.value);
    loadingSave.value = false;
    if (!success) {
        // TODO: error message
        return;
    }
    uploadImage.value = undefined;
    router.push({
        params: {
            id: currentProduct.value!.id
        }
    });
}

</script>
<style lang="scss">
.product-content img.image {
    max-height: 80vh;
    max-width: 100%;
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
    margin-top: 1rem;
    display: flex;
    justify-content: center;
}

.product-content {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 4rem;
    height: 80vh;
}

@media (max-width: 750px) {
    .product-content {
        display: flex;
        flex-direction: column;
    }

    .product-content .image {
        align-self: center;
    }
}


.image-wrapper {
    justify-self: center;
    display: flex;
    flex-direction: column-reverse;
    justify-content: start;
    input[type=file] + label {
        cursor: pointer;
    }
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