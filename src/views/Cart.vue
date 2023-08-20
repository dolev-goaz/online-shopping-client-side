<template>
    <div class="cart-page">
        <strong class="is-empty" v-if="isEmpty">
            {{ t('message.emptyCart') }}
        </strong>
        <template v-else>
            <TransitionGroup tag="ul" class="cart-list" name="cart-list">
                <li v-for="{ product, count } in cart.products" :key="product.id">
                    <CartItem :product="product" :count="count" @delete="() => onDeleteProduct(product.id)" />
                </li>
            </TransitionGroup>
            <footer>
                <div class="checkout">
                    <div class="total">
                        <span class="text">
                            {{ t('product.price') }}
                        </span>
                        <span class="value">
                            {{ t('currency', { value: cart.totalCost }) }}
                        </span>
                    </div>
                    <MyButton @click="onCheckout" :disabled="loading" :loading="loading">
                        {{ t('actions.checkout') }}
                    </MyButton>
                </div>
            </footer>
        </template>
    </div>
</template>
<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue';
import MyButton from '@/components/MyButton.vue';
import { MessageSchema } from '@/i18n';
import { useAuthStore } from '@/store/Authentication';
import { useCartStore } from '@/store/Cart';
import { ref } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { t } = useI18n<MessageSchema>();
const router = useRouter();

const cart = useCartStore();
const authStore = useAuthStore();

function onDeleteProduct(productId: number) {
    cart.removeItem(productId);
}
const isEmpty = computed(() => cart.products.length == 0);
const loading = ref(false);

const canPurchase = computed(() => authStore.user?.role === "USER");

async function onCheckout() {
    if (!authStore.isLoggedIn) {
        router.push({ name: 'login' });
        return;
    }
    if (!canPurchase.value) return;
    loading.value = true;
    try {
        await cart.checkout();
    } finally {
        loading.value = false;
    }
}

</script>
<style lang="scss" scoped>
.cart-page:has(strong.is-empty) {
    height: 100%;
    display: grid;
    place-items: center;
}

strong.is-empty {
    font-size: 5rem;
    text-align: center;
    margin-bottom: 2em;
}

footer {
    display: flex;
    justify-content: center;

    .checkout {
        width: 20rem;

        .total {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        button {
            width: 100%;
        }
    }
}

.cart-page {
    display: flex;
    flex-direction: column;

    gap: 2rem;

    width: min(90%, 100rem);
    max-height: 100%;
    margin-inline: auto;
    padding-block: 2rem;
}

.cart-list {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
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