<template>
    <div class="cart-page">
        <TransitionGroup tag="ul" class="cart-list" name="cart-list">
            <li v-for="{product, count} in cart.products" :key="product.ProductId">
                <CartItem :product="product" :count="count" @delete="() => onDeleteProduct(product.ProductId)" />
            </li>
        </TransitionGroup>
        <footer>
            <div class="checkout">
                <div class="total">
                    <span class="text">
                        {{ t('product.price') }}
                    </span>
                    <span class="value">
                        {{ t('currency', {value: cart.totalCost}) }}
                    </span>
                </div>
                <MyButton> {{ t('actions.checkout') }} </MyButton>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue';
import MyButton from '@/components/MyButton.vue';
import { MessageSchema } from '@/i18n';
import { useCartStore } from '@/store/Cart';
import { useI18n } from 'vue-i18n';
const { t } = useI18n<MessageSchema>();

const cart = useCartStore();

function onDeleteProduct(productId: string) {
    cart.removeItem(productId);
}
</script>
<style lang="scss" scoped>
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