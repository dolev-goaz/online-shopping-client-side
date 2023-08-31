<template>
    <div class="login-popup">
        <div class="greeting" v-if="authStore.isLoggedIn">
            {{ t('hello', { name: fullName }) }}
        </div>
        <div class="actions">
            <template v-if="!authStore.isLoggedIn">
                <RouterLink @click="closePopup" class="app-btn" to="/login">
                    {{ t('authentication.login') }}
                </RouterLink>
                <RouterLink @click="closePopup" class="app-btn" to="/register">
                    {{ t('authentication.registration') }}
                </RouterLink>
            </template>
            <template v-else>
                <MyButton @click="onLogout">{{ t('authentication.logout') }}</MyButton>
            </template>
        </div>
        <ul class="redirects">
            <li>
                <RouterLink v-if="authStore.isLoggedIn" @click="closePopup" to="/profile">
                    {{ t('pageName.profile') }}
                </RouterLink>
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
import { useRouter } from 'vue-router';
const authStore = useAuthStore();

const { t } = useI18n<MessageSchema, Locale>();
const router = useRouter();

function onLogout() {
    return authStore.logout().then(closePopup).then(() => router.push('/'));
}

const emit = defineEmits<{
    (e: 'close'): void
}>();
function closePopup() {
    emit('close');
}

const fullName = computed(() => `${authStore.user?.firstName} ${authStore.user?.lastName}`);

</script>
<style scoped lang="scss">
.login-popup {
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