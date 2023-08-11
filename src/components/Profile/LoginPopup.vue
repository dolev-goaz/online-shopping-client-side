<template>
    <div class="login-popup">
        <div class="greeting" v-if="authStore.isLoggedIn">
            {{ t('hello', {name: currentUser!.UserId}) }}
        </div>
        <div class="actions">
            <template v-if="!authStore.isLoggedIn">
                <RouterLink @click="closePopup" class="login" to="/login">
                    {{ t('authentication.login') }}
                </RouterLink>
                <RouterLink @click="closePopup" to="/register" class="register">
                    {{ t('authentication.registration') }}
                </RouterLink>
            </template>
            <template v-else>
                <MyButton @click="onLogout">{{ t('authentication.logout') }}</MyButton>
            </template>
        </div>
        <ul class="redirects">
            <li>
                <RouterLink @click="closePopup" to="/profile">{{ t('pageName.profile') }}</RouterLink>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { Locale, MessageSchema } from '@/i18n';
import { useAuthStore } from '@/store/Authentication';
import { useI18n } from 'vue-i18n';
import MyButton from '../MyButton.vue';
import { computed } from 'vue';
const authStore = useAuthStore();

const { t } = useI18n<MessageSchema, Locale>();

const currentUser = computed(() => authStore.user);

function onLogout() {
    return authStore.logout().then(closePopup);
}

const emit = defineEmits<{
    (e: 'close'): void
}>();
function closePopup() {
    emit('close');
}
</script>
<style scoped lang="scss">
.login-popup {
    direction: rtl;
    background-color: var(--clr-bg-light);
    border-radius: 0.5rem;
    width: 18.5rem;
    overflow: hidden;
    box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.421);
}

.greeting {
    padding-block-start: 1rem;
    text-align: center;
    font-size: 1.25rem;
    color: var(--clr-fg);
}

.actions {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
}

.actions>a {
    padding-block: 0.375em;
    box-shadow: 0 2px 1px 0 var(--clr-shadow-light);
    border-radius: 0.25rem;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid var(--clr-accent);
    cursor: pointer;
    text-decoration: none;

    &.login {
        background-color: var(--clr-accent);
        color: white;
    }

    &.register {
        color: white;
        background-color: var(--clr-accent);
    }

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.8);
        box-shadow: none;

        translate: 0 2px;
    }
}

ul.redirects {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;

    li {
        &:hover {
            filter: brightness(0.9);
        }

        &:active {
            filter: brightness(0.8);
        }

        background-color: var(--clr-bg-light);
    }

    li>a {
        text-decoration: none;
        display: block;
        padding: 1rem;
        width: 100%;
        color: var(--clr-fg-light);
    }
}
</style>